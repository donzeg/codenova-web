import { Octokit } from '@octokit/rest'
import type { Repository } from '../../../types/github'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  
  // Check cache first
  const cached = getCachedData<Repository[]>('github:repos')
  if (cached) {
    return cached
  }

  try {
    const octokit = new Octokit({
      auth: config.githubToken || undefined
    })

    console.log('Fetching repos with token:', config.githubToken ? 'Token present' : 'No token')

    // Use listForAuthenticatedUser to get both public and private repos
    const { data } = await octokit.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100,
      affiliation: 'owner'
    })

    console.log('GitHub API returned', data.length, 'repositories')

    // Filter and transform repositories
    const repos: Repository[] = data
      // Only filter out archived repos, keep everything else including forks
      .filter(repo => !repo.archived)
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage ?? undefined,
        topics: repo.topics || [],
        language: repo.language ?? null,
        stargazers_count: repo.stargazers_count ?? 0,
        forks_count: repo.forks_count ?? 0,
        watchers_count: repo.watchers_count ?? 0,
        open_issues_count: repo.open_issues_count ?? 0,
        created_at: repo.created_at ?? undefined,
        updated_at: repo.updated_at ?? undefined,
        pushed_at: repo.pushed_at ?? undefined,
        size: repo.size ?? undefined,
        fork: repo.fork,
        archived: repo.archived ?? undefined
      }))

    // Cache for 60 minutes
    setCachedData('github:repos', repos, 3600)

    return repos
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch GitHub repositories'
    })
  }
})

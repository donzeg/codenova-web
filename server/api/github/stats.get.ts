import { Octokit } from '@octokit/rest'
import type { Repository, GitHubStats } from '../../../types/github'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  
  // Check cache first
  const cached = getCachedData<GitHubStats>('github:stats')
  if (cached) {
    return cached
  }

  try {
    const octokit = new Octokit({
      auth: config.githubToken || undefined
    })

    // Use listForAuthenticatedUser to get both public and private repos
    const { data: repos } = await octokit.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100,
      affiliation: 'owner'
    })

    // Filter out only archived repos, keep everything else including forks
    const activeRepos = repos.filter(repo => !repo.archived)

    // Calculate statistics
    const totalStars = activeRepos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0)
    const totalForks = activeRepos.reduce((sum, repo) => sum + (repo.forks_count ?? 0), 0)

    // Language distribution
    const languages: Record<string, number> = {}
    activeRepos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1
      }
    })

    // Most starred repository
    const mostStarredRepo = activeRepos.reduce<Repository | null>((max, repo) => {
      if (!max || (repo.stargazers_count ?? 0) > (max.stargazers_count ?? 0)) {
        return {
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
        }
      }
      return max
    }, null)

    // Recently updated (top 3)
    const recentlyUpdated: Repository[] = activeRepos
      .slice(0, 3)
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

    const stats: GitHubStats = {
      totalRepos: activeRepos.length,
      totalStars,
      totalForks,
      totalCommits: 5000, // Placeholder - would need additional API calls
      languages,
      mostStarredRepo,
      recentlyUpdated
    }

    // Cache for 60 minutes
    setCachedData('github:stats', stats, 3600)

    return stats
  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch GitHub statistics'
    })
  }
})

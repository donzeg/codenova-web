import { readonly } from 'vue'
import type { Repository, GitHubStats } from '../types/github'

export const useGitHub = () => {
  const repos = useState<Repository[]>('github-repos', () => [])
  const stats = useState<GitHubStats | null>('github-stats', () => null)
  const loading = useState<boolean>('github-loading', () => false)
  const error = useState<string | null>('github-error', () => null)

  const fetchRepos = async () => {
    if (repos.value.length > 0) {
      return repos.value
    }

    loading.value = true
    error.value = null

    try {
      const data = await $fetch<Repository[]>('/api/github/repos')
      repos.value = data
      return data
    } catch (err) {
      error.value = 'Failed to fetch repositories'
      console.error('Error fetching repos:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  const fetchStats = async () => {
    if (stats.value) {
      return stats.value
    }

    loading.value = true
    error.value = null

    try {
      const data = await $fetch<GitHubStats>('/api/github/stats')
      stats.value = data
      return data
    } catch (err) {
      error.value = 'Failed to fetch statistics'
      console.error('Error fetching stats:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    repos: readonly(repos),
    stats: readonly(stats),
    loading: readonly(loading),
    error: readonly(error),
    fetchRepos,
    fetchStats
  }
}

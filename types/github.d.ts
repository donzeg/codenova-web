export interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage?: string | null
  topics: string[]
  language: string | null
  stargazers_count: number
  forks_count: number
  watchers_count: number
  open_issues_count: number
  created_at?: string | null
  updated_at?: string | null
  pushed_at?: string | null
  size?: number
  fork: boolean
  archived?: boolean
}

export interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalForks: number
  totalCommits: number
  languages: Record<string, number>
  mostStarredRepo: Repository | null
  recentlyUpdated: Repository[]
}

export interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

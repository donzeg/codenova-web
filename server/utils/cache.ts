interface CacheItem<T> {
  data: T
  expires: number
}

const cache = new Map<string, CacheItem<unknown>>()

export function getCachedData<T>(key: string): T | null {
  const item = cache.get(key) as CacheItem<T> | undefined
  if (!item) {
    return null
  }
  
  if (Date.now() > item.expires) {
    cache.delete(key)
    return null
  }
  
  return item.data
}

export function setCachedData<T>(key: string, data: T, ttlSeconds: number): void {
  cache.set(key, {
    data,
    expires: Date.now() + (ttlSeconds * 1000)
  })
}

export function clearCache(key?: string): void {
  if (key) {
    cache.delete(key)
  } else {
    cache.clear()
  }
}

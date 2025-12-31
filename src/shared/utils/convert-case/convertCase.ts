function camelToSnake(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

/**
 * Universal function for recursively converting object keys
 * between snake_case and camelCase.
 *
 * @param obj - source object (or array)
 * @param mode - conversion mode: 'snake' or 'camel'
 */
export function convertKeys<T>(obj: T, mode: 'snake' | 'camel'): T {
  const convertKey = mode === 'snake' ? camelToSnake : snakeToCamel

  if (Array.isArray(obj)) {
    return obj.map(item => convertKeys(item, mode)) as T
  }

  if (obj && typeof obj === 'object' && obj.constructor === Object) {
    const entries = Object.entries(obj as Record<string, unknown>)

    const converted = entries.reduce<Record<string, unknown>>(
      (acc, [key, value]) => {
        acc[convertKey(key)] = convertKeys(value, mode)
        return acc
      },
      {}
    )

    return converted as T
  }

  return obj
}

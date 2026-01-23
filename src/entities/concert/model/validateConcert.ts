export function validateConcert(title: string): string | undefined {
  if (!title.trim()) {
    return 'Title is required'
  }
}

export const validateCollection = (name: string) => {
  if (!name.length) {
    return 'Название должно быть заполнено'
  }
  return undefined
}

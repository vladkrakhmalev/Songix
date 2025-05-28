export const getCookie = (cookieName: string) => {
  console.log(document.cookie)
  const cookie = document.cookie
    .split('; ')
    .map(e => e.split('='))
    .find(c => c[0] === cookieName)
  const value = Array.isArray(cookie) ? cookie[1] : ''
  return value
}

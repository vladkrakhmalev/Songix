export const routerConfig = {
  root: '/',
  login: '/login',
  registration: '/registration',
  resetPassword: '/reset-password',
  profile: '/profile',
  settings: '/settings',
  collections: '/collections',
  collectionSongs: '/collections/:collectionId/songs',
  collectionSong: '/collections/:collectionId/songs/:songId',
  collectionSongNew: '/collections/:collectionId/songs/new',
} as const

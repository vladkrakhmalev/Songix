export const routerConfig = {
  home: '/',
  login: '/login',
  registration: '/registration',
  collections: '/collections',
  collection: '/collections/:collectionId/songs',
  song: '/collections/:collectionId/songs/:songId',
  songNew: '/collections/:collectionId/songs/new',
  settings: '/settings',
} as const

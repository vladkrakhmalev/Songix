type IdParam = string | number

export const routes = {
  home: () => '/',
  login: () => '/login',
  registration: () => '/registration',
  collections: () => '/collections',
  collection: (collectionId: IdParam = ':collectionId') =>
    `/collections/${collectionId}/songs`,

  song: (
    collectionId: IdParam = ':collectionId',
    songId: IdParam = ':songId'
  ) => `/collections/${collectionId}/songs/${songId}`,
  songNew: (collectionId: IdParam = ':collectionId') =>
    `/collections/${collectionId}/songs/new`,

  concerts: () => '/concerts',
  concert: (concertId: IdParam = ':concertId') => `/concerts/${concertId}`,

  settings: () => '/settings',
} as const

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginPage } from '@pages/login'
import { RegistrationPage } from '@pages/registration'
import { NotFoundPage } from '@pages/not-found'
import { SongPage } from '@pages/song'
import { AuthLayout } from '@app/layouts/auth-layout'
import { MainLayout } from '@app/layouts/main-layout'
import { CollectionsPage } from '@pages/collections'
import { CollectionPage } from '@pages/collection'
import { SongNewPage } from '@pages/song-new'
import { SettingsPage } from '@pages/settings'

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/registration',
        element: <RegistrationPage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <CollectionsPage />,
      },
      {
        path: '/collections',
        element: <CollectionsPage />,
      },
      {
        path: '/collections/:collectionId/songs',
        element: <CollectionPage />,
      },
      {
        path: '/collections/:collectionId/songs/:songId',
        element: <SongPage />,
      },
      {
        path: '/collections/:collectionId/songs/new',
        element: <SongNewPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}

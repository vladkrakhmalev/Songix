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
import { routerConfig } from '@shared/config'

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: routerConfig.login,
        element: <LoginPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: routerConfig.registration,
        element: <RegistrationPage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: routerConfig.home,
        element: <CollectionsPage />,
      },
      {
        path: routerConfig.collections,
        element: <CollectionsPage />,
      },
      {
        path: routerConfig.collection,
        element: <CollectionPage />,
      },
      {
        path: routerConfig.song,
        element: <SongPage />,
      },
      {
        path: routerConfig.songNew,
        element: <SongNewPage />,
      },
      {
        path: routerConfig.settings,
        element: <SettingsPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}

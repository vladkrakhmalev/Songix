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
import { routes } from '@infra/router'

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: routes.login(),
        element: <LoginPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: routes.registration(),
        element: <RegistrationPage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: routes.home(),
        element: <CollectionsPage />,
      },
      {
        path: routes.collections(),
        element: <CollectionsPage />,
      },
      {
        path: routes.collection(),
        element: <CollectionPage />,
      },
      {
        path: routes.song(),
        element: <SongPage />,
      },
      {
        path: routes.songNew(),
        element: <SongNewPage />,
      },
      {
        path: routes.settings(),
        element: <SettingsPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}

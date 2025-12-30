import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginPage } from '@pages/login'
import { RegistrationPage } from '@pages/registration'
import { NotFoundPage } from '@pages/not-found'
import { SongPage } from '@pages/song'
import { AuthLayout } from '@shared/layouts/auth-layout'
import { MainLayout } from '@shared/layouts/main-layout'
import { CollectionsPage } from '@pages/collections'
import { Navigation } from '@widgets/navigation'
import { CollectionSidebar } from '@widgets/collection-sidebar'
import { SongNewPage } from '@pages/song-new'
import { routerConfig } from '@shared/config/routerConfig'

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
      // {
      //   path: routerConfig.resetPassword,
      //   element: <ResetPasswordPage/>,
      //   errorElement: <NotFoundPage/>,
      // },
    ],
  },
  {
    element: <MainLayout sidebar={<Navigation />} />,
    children: [
      {
        path: routerConfig.root,
        element: <CollectionsPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: routerConfig.collections,
        element: <CollectionsPage />,
        errorElement: <NotFoundPage />,
      },
      // {
      //   path: routerConfig.profile,
      //   errorElement: <NotFoundPage/>,
      // },
      // {
      //   path: routerConfig.settings,
      //   errorElement: <NotFoundPage/>,
      // },
    ],
  },
  {
    path: routerConfig.collectionSongs,
    element: <MainLayout size='big' sidebar={<CollectionSidebar />} />,
    children: [
      {
        path: routerConfig.collectionSong,
        element: <SongPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: routerConfig.collectionSongNew,
        element: <SongNewPage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}

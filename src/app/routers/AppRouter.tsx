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
      // {
      //   path: "/reset-password",
      //   element: <ResetPasswordPage/>,
      //   errorElement: <NotFoundPage/>,
      // },
    ],
  },
  {
    element: <MainLayout sidebar={<Navigation />} />,
    children: [
      {
        path: '/',
        element: <CollectionsPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/collections',
        element: <CollectionsPage />,
        errorElement: <NotFoundPage />,
      },
      // {
      //   path: "/profile",
      //   errorElement: <NotFoundPage/>,
      // },
      // {
      //   path: "/settings",
      //   errorElement: <NotFoundPage/>,
      // },
    ],
  },
  {
    path: '/collections/:collectionId/songs',
    element: <MainLayout size='big' sidebar={<CollectionSidebar />} />,
    children: [
      {
        path: '/collections/:collectionId/songs/:songId',
        element: <SongPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: '/collections/:collectionId/songs/new',
        element: <SongNewPage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}

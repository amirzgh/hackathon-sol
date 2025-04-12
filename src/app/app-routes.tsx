import { AppLayout } from '@/components/layout/app-layout'
// import { UiLayout } from '@/components/ui/ui-layout'
import { lazy } from 'react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const AccountListFeature = lazy(() => import('../components/account/account-list-feature'))
const AccountDetailFeature = lazy(() => import('../components/account/account-detail-feature'))
const ClusterFeature = lazy(() => import('../components/cluster/cluster-feature'))
const DashboardFeature = lazy(() => import('../components/dashboard/dashboard-feature'))

// const links: { label: string; path: string }[] = [
//   { label: 'Account', path: '/account' },
//   { label: 'Clusters', path: '/clusters' },
// ]

const routes: RouteObject[] = [
  { path: '/account/', element: <AccountListFeature /> },
  { path: '/account/:address', element: <AccountDetailFeature /> },
  { path: '/clusters', element: <ClusterFeature /> },
  { path: '/workspaces', element: <div>hello</div> },
]

const HomeFeature = lazy(() => import('../components/home/home-feature'))
const ReviewFeature = lazy(() => import('../components/review/review-feature'))

export function AppRoutes() {
  return (
    <AppLayout>
      {useRoutes([
        { index: true, element: <HomeFeature /> },
        { path: '/review/:id', element: <ReviewFeature /> },
        { path: '*', element: <Navigate to="/" replace={true} /> },
        { index: true, element: <Navigate to={'/dashboard'} replace={true} /> },
        { path: '/dashboard', element: <DashboardFeature /> },
        ...routes,
      ])}
    </AppLayout>
  )
}

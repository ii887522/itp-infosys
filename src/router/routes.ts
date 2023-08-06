import { RouteRecordRaw } from 'vue-router'
import { useInternshipDetailsStore } from 'stores/itp-post-store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/itp-post/InternshipList.vue') },
      {
        path: 'itp-post/internship-details',
        beforeEnter: () => {
          const store = useInternshipDetailsStore()
          return store.value.title !== '' ? true : '/'
        },
        component: () => import('pages/itp-post/InternshipDetails.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes

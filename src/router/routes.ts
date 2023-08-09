import { RouteRecordRaw } from 'vue-router'
import { useInternshipDetailsStore } from 'stores/itp-post-store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'stud/itp-post/internships', component: () => import('pages/itp-post/InternshipListStud.vue') },
      {
        path: 'stud/itp-post/internship-details',
        beforeEnter: () => {
          const store = useInternshipDetailsStore()
          return store.value.title !== '' ? true : '/stud/itp-post/internships'
        },
        component: () => import('pages/itp-post/InternshipDetails.vue'),
      },
      { path: 'emp/itp-post/internships', component: () => import('pages/itp-post/InternshipListEmp.vue') },
      { path: 'emp/itp-post/internships/add', component: () => import('pages/itp-post/InternshipAdd.vue') },
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

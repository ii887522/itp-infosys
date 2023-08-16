import { RouteRecordRaw } from 'vue-router'
import { useInternshipDetailsStore, useInternshipEditStore } from 'stores/itp-post-store'

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
      {
        path: 'emp/itp-post/internships/edit',
        beforeEnter: () => {
          const store = useInternshipEditStore()
          return store.title !== '' ? true : '/emp/itp-post/internships'
        },
        component: () => import('pages/itp-post/InternshipEdit.vue'),
      },
      { path: 'stud/login', component: () => import('pages/user/StudentLogin.vue'), },
      { path: 'stud/signup', component: () => import('pages/user/StudentSignUp.vue'), },
      { path: 'emp/login', component: () => import('pages/user/EmployeeLogin.vue'), },
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

import { RouteRecordRaw } from 'vue-router'
import {
  useInternshipDetailsStudStore,
  useInternshipEditStore,
  useInternshipDetailsEmpStore,
} from 'stores/itp-post-store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'stud/itp-post/internships',
        component: () => import('pages/itp-post/InternshipListStud.vue'),
        alias: '',
      },
      {
        path: 'stud/itp-post/internship-details',
        beforeEnter: () => {
          const store = useInternshipDetailsStudStore()
          return store.value.title !== '' ? true : '/stud/itp-post/internships'
        },
        component: () => import('pages/itp-post/InternshipDetailsStud.vue'),
      },
      {
        path: 'stud/itp-post/internship-app-queue',
        component: () => import('pages/itp-post/InternshipAppQueueStud.vue'),
      },
      { path: 'emp/itp-post/internships', component: () => import('pages/itp-post/InternshipListEmp.vue') },
      {
        path: 'emp/itp-post/internship-details',
        beforeEnter: () => {
          const store = useInternshipDetailsEmpStore()
          return store.value.title !== '' ? true : '/emp/itp-post/internships'
        },
        component: () => import('pages/itp-post/InternshipDetailsEmp.vue'),
      },
      { path: 'emp/itp-post/internships/add', component: () => import('pages/itp-post/InternshipAdd.vue') },
      {
        path: 'emp/itp-post/internships/edit',
        beforeEnter: () => {
          const store = useInternshipEditStore()
          return store.title !== '' ? true : '/emp/itp-post/internships'
        },
        component: () => import('pages/itp-post/InternshipEdit.vue'),
      },
      {
        path: 'emp/itp-post/internship-app-queue',
        component: () => import('pages/itp-post/InternshipAppQueueEmp.vue'),
      },
      {
        path: 'admin/itp-prog',
        component: () => import('pages/itp-prog/IndexPage.vue'),
      },

      // user module
      { path: 'stud/login', component: () => import('pages/user/StudentLogin.vue'), },
      { path: 'stud/signup', component: () => import('pages/user/StudentSignUp.vue'), },
      { path: 'stud/profile', component: () => import('pages/user/StudentProfile.vue'), },
      { path: 'stud/profile/edit', component: () => import('pages/user/StudEditProfile.vue'), },

      { path: 'emp/login', component: () => import('pages/user/EmployeeLogin.vue'), },
      { path: 'emp/signup', component: () => import('pages/user/EmployeeSignUp.vue'), },
      { path: 'emp/profile', component: () => import('pages/user/EmployeeProfile.vue'), },
      { path: 'emp/profile/edit', component: () => import('pages/user/EmpEditProfile.vue'), },
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

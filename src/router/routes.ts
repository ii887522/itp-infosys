import { RouteRecordRaw } from 'vue-router'
import {
  useInternshipDetailsStudStore,
  useInternshipEditStore,
  useInternshipDetailsEmpStore,
} from 'stores/itp-post-store'
import { requireAuthStud, requireAuthEmp, alreadyAuth, requireAuthAdmin } from 'src/common/user/guards' // Import the route guard
import { useLocalStorageStore } from 'stores/localstorage-store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: () => {
          const lsStore = useLocalStorageStore()

          switch (lsStore.getAuthUserType()) {
            case 'admin':
              return '/admin/itp-prog'
            case 'emp':
              return '/emp/itp-post/internships'
            case 'stud':
              return '/stud/itp-post/internships'
            case 'sup':
              return '/unknown' // FIXME: Waiting for supervisor page :'(
          }

          return '/login'
        },
      },

      // internship posting module
      {
        path: 'stud/itp-post/internships',
        component: () => import('pages/itp-post/InternshipListStud.vue'),
        beforeEnter: requireAuthStud,
      },
      {
        path: 'stud/itp-post/internship-details',
        beforeEnter: [
          requireAuthStud,
          () => {
            const store = useInternshipDetailsStudStore()
            return store.value.title !== '' ? true : '/stud/itp-post/internships'
          },
        ],
        component: () => import('pages/itp-post/InternshipDetailsStud.vue'),
      },
      {
        path: 'stud/itp-post/internship-app-queue',
        component: () => import('pages/itp-post/InternshipAppQueueStud.vue'),
        beforeEnter: requireAuthStud,
      },
      {
        path: 'emp/itp-post/internships',
        beforeEnter: requireAuthEmp,
        component: () => import('pages/itp-post/InternshipListEmp.vue'),
      },
      {
        path: 'emp/itp-post/internship-details',
        beforeEnter: [
          requireAuthEmp,
          () => {
            const store = useInternshipDetailsEmpStore()
            return store.value.title !== '' ? true : '/emp/itp-post/internships'
          },
        ],
        component: () => import('pages/itp-post/InternshipDetailsEmp.vue'),
      },
      {
        path: 'emp/itp-post/internships/add',
        beforeEnter: requireAuthEmp,
        component: () => import('pages/itp-post/InternshipAdd.vue'),
      },
      {
        path: 'emp/itp-post/internships/edit',
        beforeEnter: [
          requireAuthEmp,
          () => {
            const store = useInternshipEditStore()
            return store.newTitle !== '' ? true : '/emp/itp-post/internships'
          },
        ],
        component: () => import('pages/itp-post/InternshipEdit.vue'),
      },
      {
        path: 'emp/itp-post/internship-app-queue',
        beforeEnter: requireAuthEmp,
        component: () => import('pages/itp-post/InternshipAppQueueEmp.vue'),
      },

      // internship program module
      {
        path: 'admin/itp-prog',
        beforeEnter: requireAuthAdmin,
        component: () => import('pages/itp-prog/IndexPage.vue'),
      },
      {
        path: 'admin/itp-prog/students',
        beforeEnter: requireAuthAdmin,
        component: () => import('pages/itp-prog/StudList.vue'),
      },
      
      {
        path: 'stud/UserUpload/submit-report-file',
        component: () => import('pages/UserUpload/uploadResNRepNCom.vue'),
      },

      // user module
      {
        path: 'stud/login',
        beforeEnter: alreadyAuth,
        component: () => import('pages/user/StudentLogin.vue'),
      },
      {
        path: 'stud/signup',
        beforeEnter: alreadyAuth,
        component: () => import('pages/user/StudentSignUp.vue'),
      },
      {
        path: 'stud/profile',
        beforeEnter: requireAuthStud,
        component: () => import('pages/user/StudentProfile.vue'),
      },
      {
        path: 'stud/profile/edit',
        beforeEnter: requireAuthStud,
        component: () => import('pages/user/StudEditProfile.vue'),
      },

      {
        path: 'emp/login',
        beforeEnter: alreadyAuth,
        component: () => import('pages/user/EmployeeLogin.vue'),
      },
      {
        path: 'emp/signup',
        beforeEnter: alreadyAuth,
        component: () => import('pages/user/EmployeeSignUp.vue'),
      },
      {
        path: 'emp/profile',
        beforeEnter: requireAuthEmp,
        component: () => import('pages/user/EmployeeProfile.vue'),
      },
      {
        path: 'emp/profile/edit',
        beforeEnter: requireAuthEmp,
        component: () => import('pages/user/EmpEditProfile.vue'),
      },

      {
        path: 'sup/login',
        beforeEnter: alreadyAuth,
        component: () => import('pages/user/SupervisorLogin.vue'),
      },
      {
        path: 'sup/signup',
        beforeEnter: alreadyAuth,
        component: () => import('pages/user/SupervisorSignUp.vue'),
      },

      {
        path: 'admin/login',
        beforeEnter: alreadyAuth,
        component: () => import('pages/user/AdminLogin.vue'),
      },
      {
        path: 'admin/signup',
        beforeEnter: alreadyAuth,
        component: () => import('pages/user/AdminSignUp.vue'),
      },

      {
        path: 'login',
        beforeEnter: alreadyAuth,
        component: () => import('pages/user/LoginPage.vue'),
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

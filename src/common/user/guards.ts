import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useStore } from 'stores/user-store';
import { LocalStorage } from 'quasar';

export const requireAuthStud = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const store = useStore();
  console.log('Is Authenticated:', store.getIsAuthenticated());
  console.log('Authenticated Type:', store.getAuthUserType());
  
  // Check if the user is authenticated and is student or not
  if (store.getIsAuthenticated() && store.getAuthUserType() === 'stud') {
    next(); // User is authenticated, proceed to the route
  } else {
    next('/login'); // User is not authenticated, redirect to the login page
  }
};

export const requireAuthEmp = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const store = useStore();
  console.log('Is Authenticated:', store.getIsAuthenticated());
  console.log('Authenticated Type:', store.getAuthUserType());

  if (store.getIsAuthenticated() && store.getAuthUserType() === 'emp') {
    next();
  } else {
    next('/login');
  }
}

// Function to check if the user is already logged in or not
export const alreadyAuth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const store = useStore();

  if (!store.getIsAuthenticated()) {
    next(); // User is authenticated, proceed to the route
  } else {
    next('/'); // User is not authenticated, redirect to the login page
  }
}
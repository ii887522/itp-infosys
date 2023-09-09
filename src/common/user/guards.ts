import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useStore } from 'stores/user-store';

const store = useStore();

export const requireAuthStud = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  //const store = useStore(); // when I call this function, it resets all the states inside store

  console.log('Is Authenticated:', store.isAuthenticated); // Add this for debugging
  console.log('Authenticated Type:', store.authUserType);
  
  // Check if the user is authenticated and is student or not
  if (store.isAuthenticated && store.authUserType === 'stud') {
    next(); // User is authenticated, proceed to the route
  } else {
    next('/login'); // User is not authenticated, redirect to the login page
  }
};

export const requireAuthEmp = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  console.log('Is Authenticated:', store.isAuthenticated);
  console.log('Authenticated Type:', store.authUserType);

  if (store.isAuthenticated && store.authUserType === 'emp') {
    next();
  } else {
    next('/login');
  }
}
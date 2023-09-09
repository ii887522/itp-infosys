import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useStore } from 'stores/user-store';

export const requireAuth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const store = useStore();
  
  // Check if the user is authenticated (you can adjust this logic)
  if (store.isAuthenticated) {
    next(); // User is authenticated, proceed to the route
  } else {
    next('/stud/login'); // User is not authenticated, redirect to the login page
  }
};
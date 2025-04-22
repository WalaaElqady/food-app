import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); 

  if (localStorage.getItem('userToken') !== null && localStorage.getItem('role') === 'SuperAdmin') {
    return true; 
  } else {
    router.navigate(['/auth']);
    return false;
  }
};

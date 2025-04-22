import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); 

  if (localStorage.getItem('userToken') !== null) {
    return true; 
  } else {
    router.navigate(['/auth']);
    return false;
  }
};


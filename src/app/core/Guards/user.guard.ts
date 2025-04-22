import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';


export const userGuard: CanActivateFn = (route, state) => {
 const router = inject(Router); 

  if (localStorage.getItem('userToken') !== null && localStorage.getItem('role') === 'SystemUser') {
    return true; 
  } else {
    router.navigate(['/auth']);
    return false;
  }};

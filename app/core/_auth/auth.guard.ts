import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('accessToken')) {
    console.log("hhhh")
    return true;
  }
  return false;
};

import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authSErvice = inject(AuthService);
  const router = inject(Router);

  if (authSErvice.isLoggedIn) {
    return true;
  } else {
    router.navigate(['login']);
    return false
  }
};

import {inject} from '@angular/core'
import { CanActivateFn , Router } from '@angular/router';
import {UserService} from "../services/user.service"

export const isLoggedinGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router)
  const userData:UserService = inject(UserService)

  userData.me2((r:any)=>{ if(r) router.navigateByUrl("/login") })

  return true;
};

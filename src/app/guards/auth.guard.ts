import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // Verifica si el usuario esta autenticado
  async canActivate(): Promise<boolean> {
    const token = await this.authService.isLoggedIn();

    if (token) {
      return true
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }
}


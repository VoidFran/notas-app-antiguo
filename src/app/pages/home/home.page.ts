import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.autenticar()
  }

  // Verifica si el usuario esta autenticado
  autenticar() {
    this.authService.isLoggedIn().then(isLogged => {
      if (isLogged) {
        this.router.navigate(['/home'])
      } else {
        this.router.navigate(['/login'])
      }
    })
  }

  // Cierra sesion
  cerrarSesion() {
    this.authService.logout()
    this.router.navigate(["/login"])
    this.authService.toast("Sesión cerrada!", "success")
  }
}

import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonCard, IonButton, IonIcon, IonItem, IonText, IonButtons, IonLabel } from '@ionic/angular/standalone';
import { RegistroPage } from '../registro/registro.page';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { RestaurarPage } from '../restaurar/restaurar.page';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [IonLabel, IonButtons, IonText, IonItem, IonIcon, IonButton, IonCard, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, ReactiveFormsModule, NgIf],
})

export class LoginPage {
  formulario!: FormGroup
  isPwd = false
  
  constructor(private authService: AuthService, private firebaseService: FirebaseService, private router: Router, private modalController: ModalController, private registro: RegistroPage) {
    this.initForm()
  }
  
  initForm() {
    this.formulario = new FormGroup({
      email: new FormControl("franciscof2menosf1@gmail.com", [Validators.required, Validators.minLength(4)]),
      contraseña: new FormControl("francisco", [Validators.required, Validators.minLength(4)]),
    })
  }
  
  // Crea un modal
  async abrirModalRegistro() {
    const modal = await this.modalController.create({
      component: RegistroPage,
      cssClass: 'registro.page'
    })
    return await modal.present()
  }
  
  // Crea un modal
  async abrirModalRestaurar() {
    const modal = await this.modalController.create({
      component: RestaurarPage,
      cssClass: 'restaurar.page'
    })
    return await modal.present()
  }

  // Elimina un modal
  eliminarModal() {
    this.registro.eliminarModal()
  }

  // Cambia un icono
  togglePwd() {
    this.isPwd = !this.isPwd
  }

  // Inicia sesion
  onLogin() {
    const email = this.formulario.get("email")?.value
    const contraseña = this.formulario.get("contraseña")?.value

    try {
      this.firebaseService.login(email, contraseña)
      this.authService.toast("Inicio de sesión exitoso!", "success")
      this.authService.login(email)
      this.router.navigate(["/home"])
    }
    catch (error) {
      this.authService.toast("Error de inicio de sesion. Por favor verifique sus credenciales.", "danger")
    }
  }
}

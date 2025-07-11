import { Component, Injectable } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonItem, IonInput, IonCard } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'registro-home',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
  standalone: true,
  imports: [IonCard, IonInput, IonItem, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, ReactiveFormsModule],
})

@Injectable({ providedIn: "root"})

export class RegistroPage {
  formulario!: FormGroup

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private modalController: ModalController) {
    this.initForm()
  }

  initForm() {
    this.formulario = new FormGroup({
      email: new FormControl("franciscof2menosf1@gmail.com", [Validators.required, Validators.minLength(4)]),
      contraseña: new FormControl("francisco", [Validators.required, Validators.minLength(4)]),
    })
  }

  // Envia el formulario
  async enviar() {
    const email = this.formulario.get("email")?.value
    const contraseña = this.formulario.get("contraseña")?.value
  
    try {
      await this.firebaseService.register(email, contraseña)
      this.authService.toast("Usuario registrado!", "success")
      this.authService.login(email)
      this.eliminarModal()
    }
    catch (error) {
      this.authService.toast("Error de registro. Por favor verifique sus credenciales.", "danger")
    }
  }

  // Elimina el modal
  async eliminarModal() {
    await this.modalController.dismiss()
  }
}

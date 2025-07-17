import { Component, Injectable, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonItem, IonInput, IonCard } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-restaurar',
  templateUrl: './restaurar.page.html',
  styleUrls: ['./restaurar.page.scss'],
  standalone: true,
  imports: [IonCard, IonInput, IonItem, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, ReactiveFormsModule],
})

@Injectable({ providedIn: "root"})

export class RestaurarPage {
  formulario!: FormGroup

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private modalController: ModalController) {
    this.initForm()
  }

  initForm() {
    this.formulario = new FormGroup({
      email: new FormControl("franciscof2menosf1@gmail.com", [Validators.required, Validators.minLength(4)]),
    })
  }

  // Envia el formulario
  enviar() {
    const email = this.formulario.get("email")?.value
    
    this.firebaseService.restaurarContraseña(email)
    this.authService.toast("Si el email es correcto se enviara un correo de restauración.", "warning")
    this.eliminarModal()
  }

  // Elimina el modal
  async eliminarModal() {
    await this.modalController.dismiss()
  }
}

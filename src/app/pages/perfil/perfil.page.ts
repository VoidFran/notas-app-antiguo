import { Component, Injectable } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonItem, IonInput, IonCard } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { addIcons } from "ionicons";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'perfil-home',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss'],
  standalone: true,
  imports: [IonCard, IonInput, IonItem, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, ReactiveFormsModule],
})

@Injectable({ providedIn: "root"})

export class PerfilPage {
  formulario!: FormGroup

  constructor(private router: Router, private modalController: ModalController) {
    this.initForm()
  }

  initForm() {
    this.formulario = new FormGroup({
      nombre: new FormControl("fran", [Validators.required, Validators.minLength(4)]),
      apellido: new FormControl("fran", [Validators.required, Validators.minLength(4)]),
      email: new FormControl("fran@gmail.com", [Validators.required, Validators.minLength(4)]),
    })
  }

  Enviar() {
    this.eliminarModal()
  }

  async eliminarModal() {
    await this.modalController.dismiss();
  }

  Cerrar() {
    this.router.navigate(["/login"])
    this.eliminarModal()
  }
}

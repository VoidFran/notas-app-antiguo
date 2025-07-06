import { Component, Injectable } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonItem, IonInput, IonCard } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'añadir-home',
  templateUrl: 'añadir.page.html',
  styleUrls: ['añadir.page.scss'],
  standalone: true,
  imports: [IonCard, IonInput, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, ReactiveFormsModule],
})

@Injectable({ providedIn: "root"})

export class AñadirPage {
  formulario!: FormGroup

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private modalController: ModalController) {
    this.initForm()
  }

  initForm() {
    this.formulario = new FormGroup({
      nota: new FormControl("", [Validators.required, Validators.minLength(4)])
    })
  }

  async addDocument() {
    const nota = {
      nota: this.formulario.get("nota")?.value,
      id_usuario: this.getUserId(),
    };

    if (this.formulario.invalid) {
      this.authService.toast("Documento vacio.", "danger")
      return;
    }
    this.authService.toast("Documento añadido!", "success")
    this.eliminarModal()
    this.firebaseService.addItem('notas', nota)
  }

  async eliminarModal() {
    await this.modalController.dismiss();
  }

  getUserId(): string | null {
    // Obtener el usuario autenticado
    return this.authService.currentUser ? this.authService.currentUser.uid : null;
  }
}

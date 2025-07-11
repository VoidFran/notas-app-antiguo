import { Component, Injectable, Input } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonItem, IonInput, IonCard } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'editar-home',
  templateUrl: 'editar.page.html',
  styleUrls: ['editar.page.scss'],
  standalone: true,
  imports: [IonCard, IonInput, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, ReactiveFormsModule],
})

@Injectable({ providedIn: "root"})

export class EditarPage {
  formulario!: FormGroup
  @Input() id!: string // Recibe el valor pasado

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private modalController: ModalController) {
    this.initForm()
  }

  ngOnInit() {
    this.buscarNotasId()
  }
  
  initForm() {
    this.formulario = new FormGroup({
      nota: new FormControl("", [Validators.required, Validators.minLength(1)])
    })
  }

  // Busca el documento para editar
  async buscarNotasId() {
    this.firebaseService.getDocument('notas', this.id)
    .subscribe((data) => {
      this.formulario.setValue({
        nota: data.nota
      })
    })
  }

  // Edita un documento
  async editDocument(id: any) {
    const nota = {
      nota: this.formulario.get("nota")?.value,
      id_usuario: this.getUserId(),
    }
  
    if (this.formulario.invalid) {
      this.authService.toast("Documento vacio.", "danger")
      return
    }
    this.authService.toast("Documento editado!", "success")
    this.eliminarModal()
    await this.firebaseService.updateItem("notas", id, nota)
  }

  // Elimina un modal
  async eliminarModal() {
    await this.modalController.dismiss()
  }

  // Busca el usuario autenticado
  getUserId(): string | null {
    return this.authService.currentUser ? this.authService.currentUser.uid : null;
  }
}

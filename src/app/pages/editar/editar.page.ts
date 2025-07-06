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
  //id: any
  @Input() id!: string; // Recibe el valor pasado
  item: any; // Almacenar la colección

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private modalController: ModalController) {
    this.initForm()
  }

  ngOnInit() {
    this.obtenerNotas()
  }
  
  initForm() {
    this.formulario = new FormGroup({
      nota: new FormControl("a", [Validators.required, Validators.minLength(4)])
    })
  }

  async obtenerNotas() {
    // Obtener todos los documentos de la colección "items"
    await this.firebaseService.getDocument("notas", this.id).subscribe(data => {
      this.item = data;
      this.formulario.get('nota')?.setValue(this.item["nota"]);
    });
  }

  async editDocument(id: any) {
    const nota = {
      nota: this.formulario.get("nota")?.value,
      id_usuario: this.getUserId(),
    };
  
    if (this.formulario.invalid) {
      this.authService.toast("Documento vacio.", "danger")
      return;
    }
    this.authService.toast("Documento editado!", "success")
    this.eliminarModal()
    await this.firebaseService.updateItem("notas", id, nota)
  }

  async eliminarModal() {
    await this.modalController.dismiss();
  }

  getUserId(): string | null {
    // Obtener el usuario autenticado
    return this.authService.currentUser ? this.authService.currentUser.uid : null;
  }
}

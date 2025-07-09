import { Component, Injectable, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AñadirPage } from '../añadir/añadir.page';
import { FirebaseService } from 'src/app/services/firebase.service';
import { EditarPage } from '../editar/editar.page';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({ providedIn: "root"})

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})

export class ListaComponent  implements OnInit {
  items: any[] = [] // Almacenar la colección

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private modalController: ModalController, private añadir: AñadirPage, private editar: EditarPage, private alertController: AlertController) { }

  async ngOnInit() {
    this.buscarNotasId()
  }

  // Busca el usuario autenticado
  getUserId(): string | null {
    return this.authService.currentUser ? this.authService.currentUser.uid : null
  }
  
  // Busca los documentos ligados al usuario
  async buscarNotasId() {
    this.firebaseService.buscarDocumento('notas', 'id_usuario', this.getUserId())
    .subscribe((data) => {
      this.items = data
    })
  }

  // Edita un documento
  async editItem(id: any) {
    const modal = await this.modalController.create({
      component: EditarPage,
      cssClass: 'editar.page',
      componentProps: {
        id: id
      },
    })
    return await modal.present()
  }
  
  // Elimina un documento
  async eliminarElemento(id: any) {
  const alert = await this.alertController.create({
    header: '¿Estás seguro?',
    message: 'Esta acción eliminará el dato permanentemente.',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
      }, {
        text: 'Eliminar',
        handler: () => {
          this.authService.toast("Documento eliminado.", "danger")
          this.firebaseService.deleteItem("notas", id)
        }
      }
    ]
  })
  await alert.present()
}

  // Crea un modal
  async abrirModal() {
    const modal = await this.modalController.create({
      component: AñadirPage,
      cssClass: 'añadir.page'
    })
    return await modal.present()
  }

  // Elimina un modal
  eliminarModal() {
    this.añadir.eliminarModal()
  }
}

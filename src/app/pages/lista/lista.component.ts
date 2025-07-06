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
  items: any[] = []; // Almacenar la colección

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private modalController: ModalController, private añadir: AñadirPage, private editar: EditarPage, private alertController: AlertController) { }

  ngOnInit() {
    //this.obtenerNotas()
    this.buscarNotasId()
  }

  getUserId(): string | null {
    // Obtener el usuario autenticado
    return this.authService.currentUser ? this.authService.currentUser.uid : null;
  }
  
  async obtenerNotas() {
    // Obtener todos los documentos de la colección "items"
    this.firebaseService.getCollection('notas').subscribe(data => {
      this.items = data;
    });
  }

  async buscarNotasId() {
    // Obtener todos los documentos de la colección "items"
    this.firebaseService.buscarDocumento('notas', 'id_usuario', this.getUserId())
    .subscribe((data) => {
      this.items = data;
    });
  }

  async editItem(id: any) {
    const modal = await this.modalController.create({
      component: EditarPage,
      cssClass: 'editar.page',
      componentProps: {
        id: id
      },
    });
    return await modal.present();
  
  }
  
  async eliminarElemento(id: any) {
  
  const alert = await this.alertController.create({
    header: '¿Estás seguro?',
    message: 'Esta acción eliminará el dato permanentemente.',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Cancelado');
        }
      }, {
        text: 'Eliminar',
        handler: () => {
          this.authService.toast("Documento eliminado.", "danger")
          this.firebaseService.deleteItem("notas", id)
        }
      }
    ]
  });

  await alert.present();
}

  async abrirModal() {
    const modal = await this.modalController.create({
      component: AñadirPage,
      cssClass: 'añadir.page'
    });
    return await modal.present();
  }

  eliminarModal() {
    this.añadir.eliminarModal();
  }
}

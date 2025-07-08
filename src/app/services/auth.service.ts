import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { User } from "firebase/auth";
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private _storage: Storage | null = null
  private isAuthenticated = false
  currentUser: User | null = null

  constructor(private storage: Storage, private toastController: ToastController) {
  }

  async init() {
    const storage = await this.storage.create()
    this._storage = storage
  }

  // Guarda el correo en el session storage
  async login(correo: string) {
    await this._storage?.set('token', "token")
    sessionStorage.setItem('usuario', correo)
    this.isAuthenticated = true
  }

  // Verifica si el usuario esta logeado
  async isLoggedIn(): Promise<boolean> {
    const usuario = sessionStorage.getItem('usuario')
    return !!usuario
  }

  // Simula cierre de sesión
  async logout() {
    sessionStorage.removeItem('usuario')
    this.isAuthenticated = false
  }

  // Muestra un mensaje
  async toast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: color
    })
    toast.present()
  }
}

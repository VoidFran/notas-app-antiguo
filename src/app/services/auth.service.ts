import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _storage: Storage | null = null
  private isAuthenticated = false
  private auth = getAuth()
  currentUser: User | null = null

  constructor(private storage: Storage, private toastController: ToastController) {
    this.monitorAuthState()
  }

  async init() {
    const storage = await this.storage.create()
    this._storage = storage
  }

  // Busca el usuario autenticado
  public async monitorAuthState() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currentUser = user
      } else {
        this.currentUser = null
      }
    })
  }

  // Inicia sesion
  async login(correo: string) {
    await this._storage?.set('token', "token")
    sessionStorage.setItem('usuario', correo)
    this.isAuthenticated = true // Simula inicio de sesión
  }

  // Verifica si el usuario inicio sesion
  async isLoggedIn(): Promise<boolean> {
    const usuario = sessionStorage.getItem('usuario')
    return !!usuario
  }

  // Cierra sesion
  async logout() {
    sessionStorage.removeItem('usuario')
    this.isAuthenticated = false // Simula cierre de sesión
  }

  // Muestra un mensaje por pantalla
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

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../main';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  private sign = getAuth()
  
  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {}

  // Busca todos los documentos de una colección
  getCollection(collectionName: string): Observable<any[]> {
    return this.firestore.collection(collectionName).valueChanges({ idField: 'id' })
  }

  // Busca los documentos ligado al usuario
  buscarDocumento(coleccion: string, campo: string, valor: any) {
    return this.firestore
      .collection(coleccion, ref => ref.where(campo, '==', valor))
      .valueChanges({ idField: 'id' })
  }

  // Añade un documento
  addItem(collectionName: string, data: any): Promise<any> {
    return this.firestore.collection(collectionName).add(data)
  }

  // Edita un documento
  updateItem(collectionName: string, docId: string, data: any): Promise<void> {
    return this.firestore.collection(collectionName).doc(docId).update(data)
  }

  // Elimina un documento
  deleteItem(collectionName: string, docId: string): Promise<void> {
    return this.firestore.collection(collectionName).doc(docId).delete()
  }

  // inicia sesion
  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.sign, email, password)
  }

  // Registra un usuario
  async register(email: string, password: string): Promise<any> {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password)
      return userCredential
    } 
    catch (error) {
      throw error
    }
  }

  // Restaura la contraseña del usuario
  async restaurarContraseña(email: string): Promise<any> {
    await sendPasswordResetEmail(auth, email)
  }
}

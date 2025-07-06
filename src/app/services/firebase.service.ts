import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { getFirestore, updateDoc } from 'firebase/firestore';
import { auth } from '../../main';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  //private firebaseUrl = 'https://<tu-proyecto>.firebaseio.com'; // Reemplaza con tu URL de Firebase
  private sign = getAuth();
  //private firebaseUrl = 'https://console.firebase.google.com/u/0/project/notas-app-418d2'; // Reemplaza con tu URL de Firebase

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {}

  // Obtener todos los documentos de una colección
  getCollection(collectionName: string): Observable<any[]> {
    return this.firestore.collection(collectionName).valueChanges({ idField: 'id' });
  }

  // Obtener un documento específico por ID
  getDocument(collectionName: string, usuarioId: string): Observable<any> {
    return this.firestore.collection(collectionName).doc(usuarioId).valueChanges();
  }

  buscarDocumento(coleccion: string, campo: string, valor: any) {
    return this.firestore
      .collection(coleccion, ref => ref.where(campo, '==', valor))
      .valueChanges({ idField: 'id' });
  }

  addItem(collectionName: string, data: any): Promise<any> {
    return this.firestore.collection(collectionName).add(data);
  }

  getItems(collectionName: string): Observable<any[]> {
    return this.firestore.collection(collectionName).valueChanges();
  }

  updateItem(collectionName: string, docId: string, data: any): Promise<void> {
    return this.firestore.collection(collectionName).doc(docId).update(data);
  }

  deleteItem(collectionName: string, docId: string): Promise<void> {
    return this.firestore.collection(collectionName).doc(docId).delete();
  }

  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.sign, email, password);
  }

  async register(email: string, password: string): Promise<any> {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      return userCredential;
    } 
    catch (error) {
      throw error;
    }
  }

  async restaurarContraseña(email: string): Promise<any> {
    await sendPasswordResetEmail(auth, email);
  }
}

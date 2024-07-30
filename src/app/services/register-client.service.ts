import { Injectable } from '@angular/core';
import { getApp,  } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { Client } from '../models/client';


@Injectable({
  providedIn: 'root'
})
export class RegisterClientService {

  private firestore;

  constructor() {
    const app = getApp();
    this.firestore = getFirestore(app);
  }

  addClient(client: Client){
    return addDoc(collection(this.firestore, 'clients'), {...client, createdAt: serverTimestamp() });
  }

  getClients(userId: string){
    const q = query(collection(this.firestore, 'clients'), where('userId', '==', userId));
    return getDocs(q);
  }

  updateClient(clientId: string, client: Client){
    const clientDocRef = doc(this.firestore, 'clients', clientId);
    return updateDoc(clientDocRef, {client});
  }

  deleteClient(clientId: string){
    const clientDocRef = doc(this.firestore, 'clients', clientId);
    return deleteDoc(clientDocRef);
  }

}

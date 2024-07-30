import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceList } from '../models/servicelist';
//import { first, tap } from 'rxjs';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { getApp } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {


  private firestore
  //private readonly API = '';

  constructor(/*private httpClient: HttpClient*/) { 
    const app = getApp();
    this.firestore = getFirestore(app);
  }

  /*listServices() {
    return this.httpClient.get<ServiceList[]>(this.API+'/services')
    .pipe(
      first(),
      tap(services => console.log(services))
    );
  }*/

  addService(service: ServiceList | any){
    return addDoc(collection(this.firestore, 'services'), service);
  }

  getServiceByClient(clientId: string){
    const q = query(collection(this.firestore, 'services'), where('clientId', '==', clientId));
    return getDocs(q);
  }

  getService(servicoId: string) {
    const servicoDocRef = doc(this.firestore, 'services', servicoId);
    return getDoc(servicoDocRef);
  }

  updateService(serviceId: string, s: ServiceList){
    const serviceDocRef = doc(this.firestore, 'services', serviceId);
    return updateDoc(serviceDocRef, {s});
  }

  deleteService(serviceId: string){
    const serviceDocRef = doc(this.firestore, 'services', serviceId);
    return deleteDoc(serviceDocRef);
  }

  async addStage(userId: string, serviceId: string, stageData: any) {
    try {
      const stagesRef = collection(this.firestore, 'users', userId, 'services', serviceId, 'stages');
      await addDoc(stagesRef, { ...stageData, createdAt: serverTimestamp() });
    } catch (error) {
      console.error('Error adding stage', error);
      throw error;
    }
  }
}

import { Injectable } from '@angular/core';
import { getApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { doc, getDoc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import { RegisterUser } from '../pages/register-user/model/register-user';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth;
  private firestore;
  private userSubject = new BehaviorSubject<FirebaseUser | null>(null);
  public user$ = this.userSubject.asObservable();
  
  constructor(){
    const app = getApp(); // Obtem a instância do Firebase já inicializada
    this.auth = getAuth();
    this.firestore = getFirestore(app);

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userSubject.next(user);
      } else {
        this.userSubject.next(null);
      }
    });
  }

  signUp( email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(){
    return signOut(this.auth);
  }

  getUser() :  Promise<FirebaseUser | null> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        
          resolve(user);
        
      });
    });
  }

  async getUserProfile(userId: string) {
    try {
      const userDocRef = doc(this.firestore, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        return userDocSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile', error);
      throw error;
    }
  }

  async saveUserProfile(userId: string, name: string, companyName: string, phone: string) {
    try {
      const userProfile = {
        name,
        companyName,
        phone,
        updatedAt: serverTimestamp()
      };
      await setDoc(doc(this.firestore, 'users', userId), userProfile, { merge: true });
    } catch (error) {
      console.error('Error saving user profile', error);
      throw error;
    }
  }
}

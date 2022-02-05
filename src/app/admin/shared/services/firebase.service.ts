import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

import { Testimonial } from '../models/testimonial.model';
import { Category } from './../models/category.model';
import { Product } from '../models/product.model';
import { Contact } from '../models/contact.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  data: Observable<firebase.User>;
  user: User;
  admin: boolean = false;

  constructor(
    private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) {
    this.data = fireauth.authState;
  }

  bindChangeStateAuth(authGuardSubject: ReplaySubject<firebase.User>): void {
    this.fireauth.onAuthStateChanged(authGuardSubject);
  }

  async signup(email: string, password: string): Promise<boolean> {
    return this.fireauth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Usuário Criado com Sucesso! ', value);
        return true;
      });
  }

  async login(email: string, password: string): Promise<boolean> {
    return this.fireauth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Login Realiaddo com Sucesso! ', value);
        return true;
      });
  }

  async loginWithGoogle(): Promise<firebase.User> {
    const user = new firebase.auth.GoogleAuthProvider();
    return this.fireauth.signInWithPopup(user)
      .then((data: firebase.auth.UserCredential) => {
        if (!data.user) {
          return null
        }
        return data.user;
      });
  }

  logout(): void {
    this.fireauth.signOut();
    this.admin = false;
  }

  getCountDocs(collection: string): Observable<number> {
    return this.firestore.collection<number>(collection).get().pipe(map((data) => data.docs.length));
  }

  getDocsCategorys(): Observable<Category[]> {
    return this.firestore.collection<Category>('categorys').get().pipe(map((data) => data.docs.map((object) => object.data())));
  }

  getDocsProducts(): Observable<Product[]> {
    return this.firestore.collection<Product>('products').get().pipe(map((data) => data.docs.map((object) => object.data())));
  }

  getDocsUsers(): Observable<User[]> {
    return this.firestore.collection<User>('users').get().pipe(map((data) => data.docs.map((object) => object.data())));
  }

  getDocsTestimonial(): Observable<Testimonial[]> {
    return this.firestore.collection<Testimonial>('testimonials').get().pipe(map((data) => data.docs.map((object) => object.data())));
  }

  getDocContacts(): Observable<Contact> {
    return this.firestore.collection('info').doc<Contact>('contacts').get().pipe(map((data) => data.exists ? data.data() : null));
  }

  getDocUser(uid: string): Observable<User> {
    return this.firestore.collection('users').doc<User>(uid).get().pipe(map((data) => data.exists ? data.data() : null));
  }

  setDoc(collection: string, uid: string, object: any): Promise<void> {
    return this.firestore.collection(collection).doc(uid).set(Object.assign({}, object));
  }

  updateDoc(collection: string, uid: string, object: any): Promise<void> {
    return this.firestore.collection(collection).doc(uid).update(Object.assign({}, object));
  }

  deleteDoc(collection: string, uid: string): Promise<void> {
    return this.firestore.collection(collection).doc(uid).delete();
  }

  createId() {
    return this.firestore.createId();
  }
}

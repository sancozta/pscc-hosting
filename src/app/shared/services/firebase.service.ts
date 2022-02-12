import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

import { Testimonial } from '../models/testimonial.model';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { Contact } from '../models/contact.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  data?: Observable<firebase.User | null>;
  user?: User;
  admin?: boolean = false;

  constructor(
    private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { 
    this.data = fireauth.authState;
  }

  loginWithGoogle() {
    this.fireauth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((data: firebase.auth.UserCredential) => console.log(data));
  }

  logout(): void {
    this.fireauth.signOut();
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
    return this.firestore.collection('info').doc<Contact>('contacts').get().pipe(map((data) => {
      const object = this.returnObjectOrNull(data);
      return object != null ? object : new Contact();
    }));
  }

  getDocUser(uid: string): Observable<User> {
    return this.firestore.collection('users').doc<User>(uid).get().pipe(map((data) => {
      const object = this.returnObjectOrNull(data);
      return object != null ? object : new User();
    }));
  }

  returnObjectOrNull<T>(data: firebase.firestore.DocumentSnapshot<T>): T | null {
    return data.exists ? this.returnObjectOrNullOfUndefind(data.data()) : null;
  }

  returnObjectOrNullOfUndefind<T>(data: any): T | null {
    return !!data ? data : null;
  }

  setDoc(collection: string, uid: string, object: any): Promise<void> {
    Object.keys(object).forEach((k, i) => object[k] = (object[k] == undefined) ? null : object[k])
    return this.firestore.collection(collection).doc(uid).set(Object.assign({}, object));
  }

  updateDoc(collection: string, uid: string, object: any): Promise<void> {
    Object.keys(object).forEach((k, i) => object[k] = (object[k] == undefined) ? null : object[k])
    return this.firestore.collection(collection).doc(uid).update(Object.assign({}, object));
  }

  deleteDoc(collection: string, uid: string): Promise<void> {
    return this.firestore.collection(collection).doc(uid).delete();
  }

  createId() {
    return this.firestore.createId();
  }
}

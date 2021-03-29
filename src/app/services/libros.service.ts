import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Libro } from '../model/libro';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  constructor(
    private afs: AngularFirestore
  ) { }

  registrarLibro(libro: Libro){
    const refLib = this.afs.collection("libros");
    if(libro.uid == null ){
      libro.uid = this.afs.createId();
    }
    refLib.doc(libro.uid).set(Object.assign({}, libro), {merge: true});
  }

  getLibros(): Observable<any[]>{
    const datos = this.afs.collection("libros").valueChanges();
    return datos;
  }

  getLibroById(uid: string): Observable<any>{
    let itemDoc = this.afs.doc<any>(`libros/${uid}`);
    return itemDoc.valueChanges();
  }
}

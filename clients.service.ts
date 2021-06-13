import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../model/client'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  clientCollection: AngularFirestoreCollection<Client>;
  clientDocument: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;
  constructor(private afs: AngularFirestore) { 
    this.clientCollection = afs.collection<Client>('clients');
  }

  getclient():Observable<Client[]> {

    this.clients = this.clientCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.clients;
  }

  getbyid(id: string): Observable<Client> {
    this.clientDocument = this.afs.doc<Client>(`clients/${id}`);
   return this.client = this.clientDocument.valueChanges();
  
  }

  addItem(item: Client) {
    this.clientCollection.add(item);
  }

  updateItem(client:Client) {
    this.clientDocument = this.afs.doc<Client>(`clients/${client.id}`);
    this.clientDocument.update(client)
  }

  deleteClient(client:Client) {
    this.clientDocument = this.afs.doc<Client>(`clients/${client.id}`);
    this.clientDocument.delete();
  }



}

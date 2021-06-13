# firebasedetails

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

export class AppComponent {

  private itemsCollection: AngularFirestoreCollection<Item>;
    
  items: Observable<Item[]>;
    
  constructor(private afs: AngularFirestore) {    
    this.itemsCollection = afs.collection<Item>('items');    
    this.items = this.itemsCollection.valueChanges();    
  }
    
  addItem(item: Item) {    
    this.itemsCollection.add(item);    
  }
    
}

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
    AngularFirestore,
    AngularFirestoreCollection
} from 'angularfire2/firestore';



@Injectable()
export class EventService {
    private organizationCollection: AngularFirestoreCollection<MyEv.Organization>;
    private orgnizations$: Observable<MyEv.Organization[]>;

    constructor(private afs: AngularFirestore) {
        this.organizationCollection = afs.collection<any>('organizations');

        // this.orgnizations$ = this.organizationCollection.valueChanges();
        this.orgnizations$ = this.organizationCollection.
            snapshotChanges()
            .pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as MyEv.Organization;
                    const id = a.payload.doc.id;

                    return { id, ...data };
                }))
            );
    }

    getOrganizations$() {
        return this.orgnizations$;
    }

    getOrganization$(id: string): Observable<MyEv.Organization> {
        console.log(id);
        return this.afs.doc<MyEv.Organization>(`organizations/${id}`)
            .valueChanges()
            .pipe(
                take(1)
            );
    }
}

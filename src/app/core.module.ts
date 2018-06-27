import { NgModule, SkipSelf, Optional } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import {
    AngularFirestoreModule,
    AngularFirestore
} from 'angularfire2/firestore';

import { environment } from 'src/environments/environment';


@NgModule({
    imports: [
        AngularFireModule.initializeApp(environment.firebase, 'myEvents'),
        AngularFirestoreModule
    ],
    declarations: [],
    providers: [],
    exports: []
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule, db: AngularFirestore) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded');
        }

        const settings = { /* your settings... */ timestampsInSnapshots: true };
        db.firestore.settings(settings);
    }
}

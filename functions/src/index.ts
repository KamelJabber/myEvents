import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const onCreate = (collection: string, snapshot: functions.firestore.DocumentSnapshot, context: functions.EventContext) => {
    const data = snapshot.data();
    const id = snapshot.id;
    const uid = (context.auth ? context.auth.uid : (context.authType || '::onCreate'));

    data.created_at = data.updated_at = admin.firestore.FieldValue.serverTimestamp();
    data.created_by = data.updated_by = uid;

    return admin.firestore()
        .collection(collection)
        .doc(id)
        .set(data);
}

export const onCreateAddress =
    functions
        .firestore
        .document('addresses/{docId}')
        .onCreate(
            (snapshot, context) => {
                return onCreate('addresses', snapshot, context);
            }
        );

export const onCreateReduceAddress =
    functions
        .firestore
        .document('addresses/{addressId}')
        .onCreate((snapshot, context) => {
            const address = snapshot.data();
            let primary = address;
            const id = snapshot.id;
            const organization_id = address._organization_id || '';
            const db = admin.firestore();

            return db.collection('addresses')
                .where('_organization_id', '==', organization_id)
                .get()
                .then((snaps) => {
                    const promises: Promise<any>[] = [];

                    if (snaps.empty || snaps.docs.length === 0) {
                        address.primary = true;
                    } else {
                        const hasPrimary = snaps.docs.find(pDoc => pDoc.data().primary === true);

                        if (hasPrimary && address.primary === true) {
                            snaps.docs.forEach(snapDoc => {
                                if (snapDoc.id !== id) {
                                    promises.push(
                                        db.collection('addresses')
                                            .doc(snapDoc.id)
                                            .update({ primary: false })
                                    )
                                }
                            });
                        } else if (hasPrimary) {
                            primary = hasPrimary.data();
                        } else {
                            address.primary = true;
                        }
                    }

                    return Promise.all(promises);
                })
                .then(() => {
                    return db.collection('addresses')
                        .doc(id)
                        .set(address);
                })
                .then(() => {
                    if (organization_id && organization_id.trim() !== '') {
                        return db.collection('organizations')
                            .doc(organization_id)
                            .get();
                    }

                    return <functions.firestore.DocumentSnapshot>{ exists: false };

                })
                .then((organization) => {
                    if (organization && organization.exists === true) {
                        delete primary.created_at;
                        delete primary.updated_at;
                        delete primary.primary;
                        delete primary.created_by;
                        delete primary.updated_by;
                        primary._id = id;

                        return organization
                            .ref
                            .update({ address: primary });
                    }

                    return new Promise(resolve => resolve());
                });
        });

// export const reduceAddress =
//     functions
//         .firestore
//         .document('addressses/{addressId}')
//         .onWrite((change, context) => {

//             const id = context.params.addressId;
//             const address = change.after.exists ? change.after.data() : null;
//             const db = admin.firestore();
//             const complete = new Promise(resolve => resolve());


//             if (address) {
//                 const organization_id = address.organization_id;

//                 if (!organization_id || organization_id.toString().trim() === '') {
//                     return complete;
//                 }

//                 const organization_document = db.collection('organizations').doc(organization_id);
//                 const addresses = db.collection('addresses').where('organization_id', '==', organization_id).get();

//                 return organization_document
//                     .get()
//                     .then((organizationSnap) => {
//                         if (organizationSnap.exists) {
//                             return organizationSnap.data();
//                         }

//                         return complete;
//                     })
//                     .then(organization => {
//                         if (organization) {
//                             return addresses.then((addressSnaps) => {
//                                 if (addressSnaps.empty === true || addressSnaps.docs.length === 1) {
//                                     return organization_document
//                                         .set(
//                                             Object.assign({ address: address }),
//                                             { merge: true }
//                                         );
//                                 }

//                                 return complete;
//                             });
//                         }

//                         return complete;
//                     });
//             }


//             return complete;
//         });
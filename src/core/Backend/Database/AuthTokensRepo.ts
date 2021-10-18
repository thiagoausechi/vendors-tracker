import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import firebase, { app } from '../Config';

export default class AuthTokensRepo
{
    #converter = {
        toFirestore(at: string, rt: string)
        {
            return {
                access_token: at,
                refresh_token: rt
            }
        },
        fromFirestore(snapshot: firestore.QueryDocumentSnapshot, options: firestore.SnapshotOptions)
        {
            const data = snapshot?.data(options);
            return {
                id: snapshot?.id,
                access_token: data.access_token,
                refresh_token: data.refresh_token
            }
        }
    }

    #colection()
    {
        // https://www.npmjs.com/package/firebase
        return collection(getFirestore(app), 'tokens').withConverter(this.#colection);
    }
}
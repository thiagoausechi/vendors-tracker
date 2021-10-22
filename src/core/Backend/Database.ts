import { doc, getDoc, setDoc, collection, query, getDocs, Query, DocumentData } from "firebase/firestore";
import db from "../Backend/Config";

export async function setValue(collection: string, doc_name: string, keys: { [key: string]: string })
{
    await setDoc(doc(db, collection, doc_name), keys).catch(e => console.log(e));
}

export async function getValue(collection: string, doc: string, key: string)
{
    const data = await getDocFromCollection(collection, doc)
    return data[key];
}

export async function getDocFromCollection(collection: string, doc_name: string)
{
    const docSnapshot = await getDoc(doc(db, collection, doc_name));
    if (docSnapshot.exists())
        return docSnapshot.data();
    else
    {
        console.error(`No such document! (database/${collection}/${doc_name})`);
        return undefined;
    }
}

/*
export async function getDocsFromColletion(collection: string)
{
    return await getDocs(getCollection(collection));
}
*/

export function getCollection(name: string): Query<DocumentData>
{
    return query(collection(db, name));
}
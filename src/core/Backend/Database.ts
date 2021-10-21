import { doc, setDoc, collection, query, getDocs, Query, DocumentData } from "firebase/firestore";
import db from "../Backend/Config";

export async function setValue(collection: string, doc_name: string, keys: {[key: string]: string})
{
    await setDoc(doc(db, collection, doc_name), keys).catch(e => console.log(e));
}

export async function getValue(collection: string, doc: string, key: string)
{
    return await getDocFromCollection(collection, doc);
}

export async function getDocFromCollection(collection: string, doc: string)
{
    return await (await getDocsFromColletion(collection)).docs[doc].data();
}

export async function getDocsFromColletion(collection: string)
{
    return await getDocs(getCollection(collection));
}

export function getCollection(name: string): Query<DocumentData>
{
    return query(collection(db, name));
}
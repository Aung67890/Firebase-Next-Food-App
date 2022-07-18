import {
  collection,
  doc,
  getDocs,
  orderBy,
  getDoc,
  where,
  query,
  setDoc,
} from "firebase/firestore";

import { db } from "../configs/firebase";

export const saveItem =async (data) =>{
    await setDoc(doc(db, "foodItems", `${Date.now()}`), data, {
        merge: true,
    });
}

export const saveUser = async (user) =>{
    await setDoc(doc(db, "users", `${Date.now()}`), user, {
        merge: true,
    });
}

export const getAllItems = async () =>{
    
    const colRef = collection(db,"foodItems") 

    getDocs(colRef).then((data)=>data.forEach((doc)=>console.log(doc.id, " => ", doc.data()))).catch((err)=>console.log(err))

}

export const getItemsWithCategory = async (category) =>{
    const q = query(collection(db, "foodItems"), where("category", "==", category));

    let returnArr = []

    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        returnArr.push(doc.data())
        })

        return returnArr
}

export const getSingleItemWithId =async (id) =>{
    const docRef = doc(db, "foodItems", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    return docSnap.data()
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    }
}
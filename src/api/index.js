import { arrayRemove, arrayUnion, collection, doc, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { auth, db} from "../config/firebase.config";
import { toast } from "react-toastify";

export const getUserInfo = () => {
    return new Promise((resolve, reject) =>{
        const unsub = auth.onAuthStateChanged((userCred) => {
            if (userCred){
                const userData = userCred.providerData[0];
                const unsub = onSnapshot(doc(db, "users", userData?.uid), (_doc) => {
                    if(_doc.exists()){
                        resolve(_doc.data());
                    }else{
                        setDoc(doc(db, "users", userData?.uid), userData).then(() => {
                            resolve(userData);
                        })
                    }
                });
                return unsub;
            } else {
                reject(new Error("Kullanıcı yetkilendirilmedi"));
            }
            unsub();
        });
    });
};


export const getTemplates = () => {
  return new Promise((resolve, reject) => {
    const templateQuery = query(
      collection(db, "templates"),
      orderBy("timestamp", "asc")
    );

    const unsub = onSnapshot(templateQuery, (querySnap) => {
      const templates = querySnap.docs.map((doc) => doc.data());
      resolve(templates);
    });
    return unsub;
  });
}


export const saveToCollections = async (user, data) => {
  if (!user?.collections?.includes(data?._id)) {
    const docRef = doc(db, "users", user?.uid);
    
    await updateDoc(docRef, {
      collections: arrayUnion(data?._id),
    })
      .then(() => toast.success("Koleksiyonlarıma eklendi."))
      .catch((err) => toast.error(`Hata:${err.message}`));
  } else {
    const docRef = doc(db, "users", user?.uid);
    await updateDoc(docRef, {
      collections: arrayRemove(data?._id),
    })
      .then(() => toast.success("Koleksiyonlarımdan kaldırıldı."))
      .catch((err) => toast.error(`Hata:${err.message}`));
  }
};

export const saveToFav = async (user, data) => {
if (!data?.favourites?.includes(user?.uid)) {
  const docRef = doc(db, "templates", data?._id);
  
  await updateDoc(docRef, {
    favourites: arrayUnion(user?.uid),
  })
    .then(() => toast.success("Favorilere eklendi."))
    .catch((err) => toast.error(`Hata:${err.message}`));
} else {
  const docRef = doc(db, "templates", data?._id);
  await updateDoc(docRef, {
    favourites: arrayRemove(user?.uid),
  })
    .then(() => toast.success("Favorilerden kaldırıldı."))
    .catch((err) => toast.error(`Hata:${err.message}`));
}
};
import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { auth, db} from "../config/firebase.config";

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
    })
}
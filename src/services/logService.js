import { db } from "../config/firebase";
import { collection, addDoc, query, orderBy, getDocs, serverTimestamp } from "firebase/firestore";

export const logAccess = async (user) => {
  try {
    await addDoc(collection(db, "access_logs"), {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      accessedAt: serverTimestamp(),
      action: "LOGIN_VIEW_CALENDAR"
    });
  } catch (e) {}
};

export const getAccessLogs = async () => {
  const q = query(collection(db, "access_logs"), orderBy("accessedAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    accessedAt: doc.data().accessedAt?.toDate()
  }));
};
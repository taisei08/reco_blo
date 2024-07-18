import React, { useState, useEffect, FC } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { auth, provider, signInWithPopup, signOut, db } from "@/lib/firebase";

type Props = {
  user: any;
  setUser: any;
};
const LoginButton: FC<Props> = ({ user, setUser }) => {
  const [record, setRecord] = useState("");
  const [records, setRecords] = useState([]);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const addRecord = async () => {
    if (user) {
      try {
        await addDoc(collection(db, "records"), {
          uid: user.uid,
          record,
          timestamp: new Date(),
        });
        setRecord("");
        fetchRecords();
      } catch (error) {
        console.error("Error adding record: ", error);
      }
    }
  };

  const fetchRecords = async () => {
    if (user) {
      try {
        const querySnapshot = await getDocs(collection(db, "records"));
        const userRecords: any = querySnapshot.docs
          .filter((doc) => doc.data().uid === user.uid)
          .map((doc) => doc.data());
        setRecords(userRecords);
      } catch (error) {
        console.error("Error fetching records: ", error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecords();
    }
  }, [user]);

  return (
    <div>
      {user ? (
        <div className="">
          <div className="max-w-md bg-white border border-gray-400 rounded-xl px-6 py-4">
            <h1 className="text-xl font-bold ">{user.displayName}</h1>
            <p className="mb-2 text-gray-600">{user.uid}</p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              onClick={signOutUser}
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className="">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl"
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginButton;

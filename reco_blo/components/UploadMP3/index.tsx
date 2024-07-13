"use client";

import React, { FC, useState } from "react";
import { RiUploadLine } from "react-icons/ri";
import { collection, doc, setDoc } from "firebase/firestore";
import { Progress, Theme } from "@radix-ui/themes";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import "@radix-ui/themes/styles.css";

type Props = {
  uid: string;
  mutate: any;
};

export const UploadMP3: FC<Props> = ({ uid, mutate }) => {
  const [file, setFile]: any = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  const handleFileChange = (e: any) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please choose a file first!");
      return;
    }

    const storageRef = ref(storage, `audio/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDownloadURL(downloadURL);
          console.log("File available at", downloadURL);
          // ドキュメントを挿入する関数
          const insertDocument = async () => {
            const COLLECTION_NAME = "posts";
            const insertData = {
              title: "1",
              description: "あいうえお",
              audio_url: downloadURL,
              created_at: new Date(),
              user_id: uid,
            };

            try {
              const docRef = doc(collection(db, COLLECTION_NAME));
              await setDoc(docRef, insertData);
              mutate();
              return { message: "success" };
            } catch (error: any) {
              console.error("Error adding document: ", error);
              return { message: "error", error: error.message };
            }
          };

          // 関数を呼び出して結果を表示
          insertDocument().then((response) => {
            console.log(response);
          });
        });
      }
    );
  };

  return (
    <div>
      <div className="flex items-center">
        <input type="file" accept="audio/mp3" onChange={handleFileChange} />
        <button onClick={handleUpload}>
          <RiUploadLine
            size={30}
            className="hover:text-red-500 transition duration-300"
          />
        </button>
      </div>
      <div className="mt-2">
        <Progress value={uploadProgress} />
      </div>
    </div>
  );
};

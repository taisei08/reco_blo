"use client";
import { Progress } from "@radix-ui/themes";
import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { RiUploadLine } from "react-icons/ri";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { storage } from "./firebaseConfig";

export const UploadMP3 = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please choose a file first!");
      return;
    }

    const storageRef = ref(storage, `mp3/${file.name}`);
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
        });
      }
    );
  };

  return (
    <div>
      <input type="file" accept="audio/mp3" onChange={handleFileChange} />
      <button onClick={handleUpload}>
        <RiUploadLine
          size={30}
          className="hover:text-red-500 transition duration-300"
        />
      </button>
      <Progress value={uploadProgress} size="1" />
      <div>Upload Progress: {uploadProgress}%</div>
      {downloadURL && <a href={downloadURL}>Download MP3</a>}
    </div>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { Box, Button, InputLabel, TextField, useTheme } from "@mui/material";
import { toast } from "react-toastify";
import { saveItem } from "../utils/firebaseFunctions";
import { storage } from "../configs/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import SelectForm from "./SelectForm";
import { useRouter } from "next/router";
import { AppContext } from "./ContextProvider";

export default function AddFroduct() {
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState("Chicken");

  const {user} = useContext(AppContext)

  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {}, []);

  const [photoUrl, setPhotoUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [progressShow, setProgressShow] = useState(false);

  const fileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    imageUrlGetting(selectedFile);
  }, [selectedFile]);

  const imageUrlGetting = (selectedFile) => {
    setProgressShow(true);

    const fileName = new Date().getTime() + selectedFile?.name;

    const storageRef = ref(storage, `/images/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploaded = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(uploaded);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // handleInputState(name, url);
          setPhotoUrl(url);
          setProgressShow(false);
        });
      }
    );
  };

  const onProductCreate = async () => {
    try {
      if (!title || !price || !photoUrl) {
        toast.error("Please fill all the required fields");
        return;
      }
      const data = {
        id: `${Date.now()}`,
        title: title,
        photoUrl: photoUrl,
        category: category,
        price: price,
        user:user.uid
      };
      saveItem(data);
      toast.success("Product added");
      router.push("/");
    } catch (error) {}
  };

  return (
    <Box
      sx={{
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "350px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Product{" "}
        </h2>
        <Box
          component="form"
          onSubmit={onProductCreate}
          sx={{ width: "100%", mb: 5 }}
          noValidate
          autoComplete="off"
        >
          <Box>
            <TextField
              sx={{ width: "100%", my: 2, minWidth: "300px" }}
              label="Title"
              variant="standard"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            {progressShow && !isNaN(progress) && (
              <h5 style={{ textAlign: "right" }}>{progress}% uploaded</h5>
            )}
            <TextField
              sx={{ width: "100%", minWidth: "300px" }}
              label="UserPhoto"
              variant="standard"
              type="file"
              name="image"
              onChange={fileChange}
            />
          </Box>
          <Box>
            <TextField
              sx={{ width: "100%", my: 2, minWidth: "300px" }}
              label="Price"
              variant="standard"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Box>

          <Box sx={{ my: 2 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <SelectForm all category={category} setCategory={setCategory} />
          </Box>

          <Button
            disabled={progress < 99 ? true : false}
            onClick={onProductCreate}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

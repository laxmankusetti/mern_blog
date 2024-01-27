import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signOutSuccess,
} from "../redux/users/usersSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashboardProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [fileUploadProgress, setFileUploadProgress] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [fileUploadFailure, setFileUploadFailure] = useState(null);
  const [fileUploadSuccess, setFileUploadSuccess] = useState(null);
  const [formData, setFormData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const imageFileRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadFile();
    }
  }, [imageFile]);

  const uploadFile = async () => {
    setFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setFileUploadError("File must be less than 2 MBs");
        console.log(error);
        setFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  // service firebase.storage {
  //   match /b/{bucket}/o {
  //     match /{allPaths=**} {
  //       allow read;
  //       allow write: if
  //       request.resource.size < 2 * 1024 * 1024 &&
  //       request.resource.contentType.matches('image/.*')
  //     }
  //   }
  // }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFileUploadFailure(null);
    setFileUploadSuccess(null);
    if (Object.keys(formData).length === 0) {
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setFileUploadFailure("An error accured to update Details");
      }
      dispatch(updateSuccess(data));
      setFileUploadFailure(null);
      setFileUploadSuccess("Details updated successfully");
    } catch (error) {
      dispatch(updateFailure(error.message));
      setFileUploadFailure("An error accured to update Details");
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    setShowDeleteModal(false);
    try {
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteFailure(data.message));
      } else {
        dispatch(deleteSuccess());
      }
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });
      const data = res.json();
      if (!res.ok) {
        console.log(data.message);
      }
      dispatch(signOutSuccess());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="font-bold text-3xl text-center my-5">Profile</h1>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleImageChange}
          ref={imageFileRef}
          hidden
        />
        <div className="w-32 h-32 self-center cursor-pointer relative">
          {fileUploadProgress && (
            <CircularProgressbar
              value={fileUploadProgress || 0}
              text={`${fileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${fileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user profile pic"
            className={`w-full h-full rounded-full object-cover border-8 border-[lightgray] ${
              fileUploadProgress && fileUploadProgress < 100 && "opacity-60"
            }`}
            onClick={() => {
              imageFileRef.current.click();
            }}
            accept="image/*"
          />
        </div>
        {fileUploadError && <Alert color="failure">{fileUploadError}</Alert>}
        <TextInput
          type="text"
          defaultValue={currentUser.username}
          id="username"
          onChange={handleChange}
        />
        <TextInput
          type="email"
          defaultValue={currentUser.email}
          id="email"
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Button
          gradientDuoTone="purpleToBlue"
          outline
          type="submit"
          disabled={loading || fileUploadProgress}
        >
          {loading ? "Loading..." : "Update"}
        </Button>
        {currentUser.isAdmin && (
          <Link to="/create-post" gradientDuoTone="blueToPink">
            <Button gradientDuoTone='purpleToPink' className="w-full">Create a post</Button>
          </Link>
        )}
      </form>
      <div className="flex justify-between items-center text-red-600 mt-5">
        <button
          className="cursor-pointer"
          onClick={() => {
            setShowDeleteModal(true);
          }}
          type="button"
        >
          Delete Account
        </button>
        <button
          className="cursor-pointer"
          type="button"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
      {fileUploadFailure && (
        <Alert color="failure" className="mt-5">
          {fileUploadFailure}
        </Alert>
      )}
      {fileUploadSuccess && (
        <Alert color="success" className="mt-5">
          {fileUploadSuccess}
        </Alert>
      )}
      {error && (
        <Alert color="success" className="mt-5">
          {error}
        </Alert>
      )}
      {showDeleteModal && (
        <Modal
          show={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
          }}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 mb-5 mx-auto text-gray-400 dark:text-gray-200" />
              <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-300">
                Are you sure? You want to delete your Account?
              </h3>
              <div className="flex justify-center items-center gap-6 my-5">
                <Button color="failure" onClick={handleDeleteUser}>
                  Yes, I&apos;m sure
                </Button>
                <Button
                  color="gray"
                  onClick={() => {
                    setShowDeleteModal(false);
                  }}
                >
                  No, cancle
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

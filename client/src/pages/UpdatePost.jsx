import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';


export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const { currentUser } = useSelector(state => state.user)

  const navigate = useNavigate();
  const { postId } = useParams();
  useEffect(() => {
    try {
        const fetchPosts = async () => {
            const res = await fetch(`/api/post/getPosts?postId=${postId}`);
            const data = await res.json();
            if(!res.ok){
                setPublishError(data.message);
                console.log(data.message);
                return
            }
            if(res.ok){
                setFormData(data.posts[0])
                setPublishError(null);
            }
        }

        fetchPosts()
    } catch (error) {
        console.log(error)
    }
  }, [postId])

  const handleImageUpload = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image!");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed!");
          setImageUploadProgress(null);
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${postId}/${currentUser._id}`, {
        method : 'PUT', 
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData)
      })
      const data = await res.json();
      if(!res.ok){
        setPublishError(data.message)
      }
      setPublishError(null)
      navigate(`/post/${data.slug}`)
    } catch (error) {
      setPublishError('Something went wrong!')
      console.log(error)
    }
  }

  return (
    <div className="p-3 mx-auto max-w-3xl min-h-screen">
      <h1 className="text-3xl text-center font-semibold my-5">Update Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row justify-between gap-5">
          <TextInput
            type="text"
            placeholder="Title"
            id="title"
            className="flex-1"
            onChange={(e) => {setFormData({...formData, title : e.target.value})}}
            value={formData.title}
          />
          <Select onChange={(e) => {setFormData({...formData, category : e.target.value})}} value={formData.category}>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">ReactJs</option>
            <option value="nextjs">NextJs</option>
            <option value="angular">AngularJs</option>
            <option value="vue">VueJs</option>
          </Select>
        </div>
        <div className="flex justify-between items-center border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleImageUpload}
          >
            {imageUploadProgress ? (
              <div>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                  className="w-12 h-12"
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt={formData.image}
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          onChange={(value) => {setFormData({...formData, content : value})}}
          value={formData.content}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update
        </Button>
        {publishError && <Alert color='failure' className="mt-5">{publishError}</Alert>}
      </form>
    </div>
  );
}

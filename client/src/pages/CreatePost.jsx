import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className="p-3 mx-auto max-w-3xl min-h-screen">
      <h1 className="text-3xl text-center font-semibold my-5">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-5">
            <TextInput type="text" placeholder="Title" id="title" className="flex-1" />
            <Select>
                <option value="uncategorized">Select a category</option>
                <option value="javascript">Javascript</option>
                <option value="reactjs">ReactJs</option>
                <option value="nextjs">NextJs</option>
                <option value="angular">AngularJs</option>
                <option value="vue">VueJs</option>
            </Select>
        </div>
        <div className="flex justify-between items-center border-4 border-teal-500 border-dotted p-3">
            <FileInput type='file' accept="image/*"/>
            <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>
                Upload image
            </Button>
        </div>
        <ReactQuill theme="snow" placeholder="Write something..." className="h-72 mb-12"/>
        <Button type="submit" gradientDuoTone='purpleToPink'>Publish</Button>
      </form>
    </div>
  )
}

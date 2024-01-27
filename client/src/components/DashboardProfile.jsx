import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export default function DashboardProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="font-bold text-3xl text-center my-5">Profile</h1>
      <form className="flex flex-col gap-4 w-full">
        <div className="w-32 h-32 self-center cursor-pointer">
          <img
            src={currentUser.profilePicture}
            alt="user profile pic"
            className="w-full h-full rounded-full object-cover border-8 border-[lightgray]"
          />
        </div>
        <TextInput type="text" defaultValue={currentUser.username} id="username" />
        <TextInput type="email" defaultValue={currentUser.email} id="email" />
        <TextInput type="password" id="password" placeholder="Password" />
        <Button gradientDuoTone='purpleToBlue' outline type="submit">
            Update
        </Button>
      </form>
      <div className="flex justify-between items-center text-red-600 mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

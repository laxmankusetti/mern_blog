import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { themeToggle } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/users/usersSlice";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const path = useLocation().pathname;

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
        method : 'POST'
      })
      const data = res.json();
      if(!res.ok){
        console.log(data.message) 
      }
      dispatch(signOutSuccess());
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="whitespace-nowrap self-center text-sm sm:text-xl dark:text-white font-semibold"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 rounded-lg text-white">
          Laxman&apos;s
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" pill color="gray">
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" pill color="gray" onClick={() => {dispatch(themeToggle())}}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="text-sm block">@{currentUser.username}</span>
              <span className="text-sm block font-semibold truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-up">
            <Button gradientDuoTone="purpleToBlue" color="gray" outline>
              SignIn
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as="div">
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as="div">
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as="div">
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

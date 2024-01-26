import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SignIn() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

   console.log(error)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id] : e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            setError(null)
            const res = await fetch('/api/auth/signin', {
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(formData)
            });
            const data = await res.json();
            if(data.success === false){
                setError(data.message)
                setLoading(false);
                return
            }
            setLoading(false);
            if(res.ok){
              navigate('/')
            }
        } catch (error) {
            setError(error);
            setLoading(false)
        }
    }

  return (
    <div className="max-h-screen">
      <div className="flex max-w-3xl p-3 mx-auto mt-20 flex-col md:flex-row md:items-center gap-5">
        {/* left side */}
        <div className="flex-1">
          <Link to="/" className="text-3xl dark:text-white font-bold">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 rounded-lg text-white">
              Laxman&apos;s
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo blog project. You can sign up with your email id and
            password or Google account.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email"></Label>
              <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your password"></Label>
              <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit">
                {loading ? (
                <>
                <Spinner color='failure' />
                <span className="ml-2">
                    Loading...
                </span>
                </>
                ) : 'Sign In'}
            </Button>
            <div className="flex gap-1 text-sm">
                <span>Don&apos;t have an account? </span>
                <Link to='/sign-up' className="text-blue-500 font-semibold">
                    Sign Up
                </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

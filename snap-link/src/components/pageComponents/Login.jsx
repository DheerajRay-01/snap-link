import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { FaRegUser } from "react-icons/fa";

function Login() {
  const handleSignIn = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const navigate = useNavigate()

  return (
    // <div className="flex justify-center items-center">
  <div className="hero bg-base-200 min-w-screen min-h-screen w-full">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Welcome to SnapLink</h1>
      <p className="py-6">
       Securely shorten and share your links. Log in with Google to manage your personalized SnapLinks.
      </p>
      <button className="btn btn-primary m-2" onClick={handleSignIn}><FcGoogle size={30}/> Continue With Google</button>
      <button className="btn btn-secondary m-2" onClick={()=>navigate("/")}><FaRegUser size={25}/> Continue as Guest</button>
    </div>
  </div>
</div>
// </div>
  );
}

export default Login;

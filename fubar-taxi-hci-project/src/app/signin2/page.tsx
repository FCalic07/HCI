"use client";
import { useState, FormEvent } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';


const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [signInWithEmailAndPassword, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const router = useRouter();

  // Handle form submit with proper typing
  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signInWithEmailAndPassword(email, password);
    console.log(res);

    if (res && res.user) {
      setEmail("");
      setPassword("");
      sessionStorage.setItem('user', "true")
      return router.push("/adminpage"); // Change to your desired route
    }
    // If error, it will be handled below
  };

  return (
    
    <div  className="relative flex flex-col items-center justify-center min-h-screen bg-[url('/assets/backgroundPicture.jpg')] bg-cover bg-center bg-blend-darken">
      <img
        id="logo"
        src="/fubarLogo.svg"
        alt="Logo"
        className="h-20 w-auto mb-4 z-10 relative"
      />
      <div className="absolute inset-0 bg-violet-950 opacity-60 z-0"></div>
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      <div className="relative w-96 h-[420px] rounded-lg overflow-hidden">
        <form
          onSubmit={handleSignIn}
          className="backdrop-blur-md bg-white/10 border border-white/20 absolute inset-[2px] z-10  rounded-lg p-12 flex flex-col"
        >
          <h2 className="text-red-500 font-medium text-center tracking-wider mb-8 text-xl">
          Sign In 
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-2 text-red-500 text-center">Wrong email or password!</div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="mb-2 text-red-500 text-center">Loading...</div>
          )}

          {/* Email Input */}
          <div className="relative mt-3">
            <input
              type="email"
              required
              className="w-full pt-5 pb-2 px-2 bg-transparent outline-none text-white text-base tracking-wide text-center"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span
              className={`absolute left-0 px-2 text-[#8f8f8f] text-base tracking-wide transition-all duration-300 pointer-events-none
      ${
        email
          ? "text-xs top-0 pt-1 opacity-80"
          : "pt-5 text-base top-0 opacity-100"
      }
    `}
            >
              Email
            </span>
            <i className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded transition-all duration-300" />
          </div>

          {/* Password Input */}
          <div className="relative mt-8">
  <input
    type={showPassword ? "text" : "password"}
    required
    className="w-full pt-5 pb-2 px-2 bg-transparent outline-none text-white text-base tracking-wide text-center"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <span
    className={`absolute left-0 px-2 text-[#8f8f8f] text-base tracking-wide transition-all duration-300 pointer-events-none
      ${password ? "text-xs top-0 pt-1 opacity-80" : "pt-5 text-base top-0 opacity-100"}
    `}
  >
    Password
  </span>
  <i className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded transition-all duration-300" />
  
  {/* Eye Icon */}
  <div
    className="absolute right-4  bottom-2 -translate-y-1/6 cursor-pointer z-20"
    onClick={() => setShowPassword((prev) => !prev)}
    tabIndex={0}
    aria-label={showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
    role="button"
  >
    <FontAwesomeIcon
      icon={faEye}
      className="text-[#8f8f8f]"
      style={{ opacity: showPassword ? 0.5 : 1 }}
    />
  </div>
</div>


          {/* Links */}
          <div className="flex justify-between mt-4">
            <a
              href="#forgot"
              className="text-[#8f8f8f] text-xs hover:text-red-700"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className=" bg-red-500 hover:bg-red-700 mt-6 w-full bg-[#45f3ff] text-white font-semibold py-2 rounded transition-opacity hover:opacity-90"
            disabled={Boolean(loading)}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [Login, setLogin] = useState(true);
  const [signinemail, setsigninEmail] = useState("");
  const [signinpassword, setsigninPassword] = useState("");
  const [signupemail, setsignupEmail] = useState("");
  const [signuppassword, setsignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [login] = useLoginMutation();
  // const [register] = useRegisterMutation();
  const [error, setError] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [nameerror, setnameError] = useState("");
  const [disable, setdisable] = useState(false);

  const navigator = useNavigate();

  const Email = (email) => {
    const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return mail.test(email);
  };

  const Name = (name) => {
    const NAME = /^[A-Za-z\s]+$/;
    return NAME.test(name);
  };

  const handleSubmit = async (e) => {
    setdisable(true);
    try {
      e.preventDefault();

      if (Login) {
        const res = await login({
          email: signinemail,
          password: signinpassword,
        });

        if (res.error) {
          toast.error(res.error.data, { autoClose: 5000 });
          setdisable(false);
        } else {
          toast.success(res.data.message, { autoClose: 5000 });
          navigator("/");
        }
        console.log(res);
      } else {
        if (!Email(signupemail)) {
          setEmailError("Please enter a valid email address.");
          return;
        } else {
          setEmailError("");
        }

        if (!Name(name)) {
          setnameError("Please enter a valid name.");
          return;
        } else {
          setnameError("");
        }

        if (confirmPassword !== signuppassword) {
          setError("Password doesn't match with Confirm Password");
          return;
        } else {
          setError("");
        }

        const res = await register({
          email: signupemail,
          password: signuppassword,
          name,
        });
        console.log(res);
        if (res.error) {
          toast.error(res.error.data.message, { autoClose: 5000 });
          setdisable(false);
        } else {
          toast.success(res.data.message, { autoClose: 5000 });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const passfor = () => {
    navigator("/fpass");
  };

  return (
    <div className="min-h-screen mb- flex items-center  justify-center bg-cover bg-center bg-[url('./src/Images/back3.jpg')] pl-20">
      <div className="bg-white p-8 rounded shadow-md mb-14 w-full max-w-md mx-4 sm:mx-auto ">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {Login ? "Please Sign In" : "Please Sign Up"}
        </h2>
        <div className="flex justify-around mb-6">
          <button
            className={`py-2 px-4 font-bold ${
              Login ? "border-b-2 border-green-500 " : ""
            }`}
            onClick={() => setLogin(true)}
          >
            Sign In
          </button>
          <button
            className={`py-2 px-4 font-bold ${
              !Login ? "border-b-2 border-green-500" : ""
            }`}
            onClick={() => setLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700"> Email</label>
          <input
            type="text"
            value={Login ? signinemail : signupemail}
            onChange={(e) =>
              Login
                ? setsigninEmail(e.target.value)
                : setsignupEmail(e.target.value)
            }
            className="w-full px-3 py-2 border rounded"
            required
          />
          {emailerror && <p className="text-red-500">{emailerror}</p>}
        </div>

        {!Login && (
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
            {nameerror && <p className="text-red-500">{nameerror}</p>}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={Login ? signinpassword : signuppassword}
            onChange={(e) =>
              Login
                ? setsigninPassword(e.target.value)
                : setsignupPassword(e.target.value)
            }
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        {!Login && (
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type={"password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
          />
          <label className="text-gray-700">Show Password</label>

          {!Login && (
            <button
              className="text-blue-500 hover:underline ml-auto"
              onClick={passfor}
            >
              Forgot password
            </button>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={disable}
          type="submit"
          className={
            "w-full bg-green-500 text-white py-2 px-4 rounded " +
            (disable ? "" : " hover:bg-green-600 ")
          }
        >
          {Login ? "Sign In" : "Sign Up"}
        </button>

        <div className="mt-4 text-center">
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>
          <button
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center justify-center"
            disabled={disable}
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M21.35 11.1h-9.7v2.8h5.5c-.2 1.4-.9 2.6-2 3.4l2.6 2.1c2.1-2 3.3-4.9 3.3-8.3 0-.8-.1-1.5-.2-2.2z"
                fill="#4285F4"
              />
              <path
                d="M12 22c2.7 0 4.9-.9 6.6-2.4l-2.6-2.1c-.7.5-1.6.9-2.5 1-.7.1-1.4.2-2.1.2-4.1 0-7.5-2.8-8.7-6.6L2.1 14l-.1.3c1.6 4.1 5.5 7 9.9 7z"
                fill="#34A853"
              />
              <path
                d="M3.3 10.4C2.7 8.9 2.7 7.4 3.3 5.9L.6 3.8C-.7 6.2-.7 9.8.6 12.2l2.7-1.8z"
                fill="#FBBC05"
              />
              <path
                d="M12 4.8c1.4 0 2.7.5 3.6 1.4l2.7-2.7C16.9 1.7 14.6.8 12 .8c-4.5 0-8.3 3-9.6 7.1l2.8 2C5.5 6.7 8.5 4.8 12 4.8z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;


// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const [Login, setLogin] = useState(true);
//   const [signinemail, setsigninEmail] = useState("");
//   const [signinpassword, setsigninPassword] = useState("");
//   const [signupemail, setsignupEmail] = useState("");
//   const [signuppassword, setsignupPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [name, setName] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [emailerror, setEmailError] = useState("");
//   const [nameerror, setnameError] = useState("");
//   const [disable, setdisable] = useState(false);

//   const navigate = useNavigate();

//   const Email = (email) => {
//     const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return mail.test(email);
//   };

//   const Name = (name) => {
//     const NAME = /^[A-Za-z\s]+$/;
//     return NAME.test(name);
//   };

//   const handleSubmit = async (e) => {
//     setdisable(true);
//     try {
//       e.preventDefault();

//       if (Login) {
//         // Add your login function here
//         // const res = await login({
//         //   email: signinemail,
//         //   password: signinpassword,
//         // });
//         if (res.error) {
//           toast.error(res.error.data, { autoClose: 5000 });
//           setdisable(false);
//         } else {
//           toast.success(res.data.message, { autoClose: 5000 });
//           navigate("/");
//         }
//       } else {
//         if (!Email(signupemail)) {
//           setEmailError("Please enter a valid email address.");
//           return;
//         } else {
//           setEmailError("");
//         }

//         if (!Name(name)) {
//           setnameError("Please enter a valid name.");
//           return;
//         } else {
//           setnameError("");
//         }

//         if (confirmPassword !== signuppassword) {
//           setError("Password doesn't match with Confirm Password");
//           return;
//         } else {
//           setError("");
//         }

//         // Add your register function here
//         // const res = await register({
//         //   email: signupemail,
//         //   password: signuppassword,
//         //   name,
//         // });

//         if (res.error) {
//           toast.error(res.error.data.message, { autoClose: 5000 });
//           setdisable(false);
//         } else {
//           toast.success(res.data.message, { autoClose: 5000 });
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const passfor = () => {
//     navigate("/fpass");
//   };

//   return (
//     <div className="min-h-screen mb- flex items-center justify-center bg-cover bg-center bg-[url('./src/Images/back3.jpg')] pl-20">
//       <div className="bg-white p-8 rounded shadow-md mb-14 w-full max-w-md mx-4 sm:mx-auto">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           {Login ? "Please Sign In" : "Please Sign Up"}
//         </h2>
//         <div className="flex justify-around mb-6">
//           <button         
//             className={`py-2 px-4 font-bold ${
//               Login ? "border-b-2 border-green-500" : ""
//             }`}
//             onClick={() => setLogin(true)}
//           >
//             Sign In
//           </button>
//           <button
//             className={`py-2 px-4 font-bold ${
//               !Login ? "border-b-2 border-green-500" : ""
//             }`}
//             onClick={() => setLogin(false)}
//           >
//             Sign Up
//           </button>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="text"
//             value={Login ? signinemail : signupemail}
//             onChange={(e) =>
//               Login
//                 ? setsigninEmail(e.target.value)
//                 : setsignupEmail(e.target.value)
//             }
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//           {emailerror && <p className="text-red-500">{emailerror}</p>}
//         </div>

//         {!Login && (
//           <div className="mb-4">
//             <label className="block text-gray-700">Name</label>
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//             {nameerror && <p className="text-red-500">{nameerror}</p>}
//           </div>
//         )}
//         <div className="mb-4">
//           <label className="block text-gray-700">Password</label>
//           <input
//             type={showPassword ? "text" : "password"}
//             value={Login ? signinpassword : signuppassword}
//             onChange={(e) =>
//               Login
//                 ? setsigninPassword(e.target.value)
//                 : setsignupPassword(e.target.value)
//             }
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//         {!Login && (
//           <div className="mb-4">
//             <label className="block text-gray-700">Confirm Password</label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>
//         )}
//         {error && <p className="text-red-500">{error}</p>}
//         <div className="mb-4">
//           <label className="inline-flex items-center">
//             <input
//               type="checkbox"
//               checked={showPassword}
//               onChange={() => setShowPassword(!showPassword)}
//               className="form-checkbox"
//             />
//             <span className="ml-2">Show Password</span>
//           </label>
//         </div>
//         <div className="flex justify-center items-center flex-col">
//           <button
//             onClick={handleSubmit}
//             disabled={disable}
//             className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded focus:outline-none focus:shadow-outline"
//           >
//             {Login ? "Sign In" : "Sign Up"}
//           </button>
//           {Login && (
//             <button
//               onClick={passfor}
//               className="mt-4 text-green-500 font-bold underline"
//             >
//               Forgot Password
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;




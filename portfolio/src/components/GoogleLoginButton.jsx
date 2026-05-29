// import React from "react";

// import axios from "axios";

// import toast from "react-hot-toast";

// import {
//   signInWithPopup,
// } from "firebase/auth";

// import {
//   auth,
//   provider,
// } from "../firebase";

// const GoogleLoginButton = ({ onLoginSuccess }) => {

//   const handleGoogleLogin = async () => {

//     try {

//       const result = await signInWithPopup(
//         auth,
//         provider
//       );

//       const token = await result.user.getIdToken();

//       const { data } = await axios.post(
//         "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/customer/firebase-login",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       localStorage.setItem(
//         "customerToken",
//         data.token
//       );

//       toast.success("Login Successful");

//       if (onLoginSuccess) {
//         onLoginSuccess();
//       }

//     } catch (error) {

//       console.log(error);

//       toast.error("Login Failed");

//     }
//   };

//   return (
//     <button
//       onClick={handleGoogleLogin}
//       className="
//       bg-green-500
//       hover:bg-green-600
//       text-white
//       px-6
//       py-3
//       rounded-xl
//       font-semibold
//       transition
//       duration-300
//       "
//     >
//       Continue With Google
//     </button>
//   );
// };

// export default GoogleLoginButton;



import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import axios from "axios";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_BACKEND_URL || "https://mern-portfolio-backend-ke5j.onrender.com";

const GoogleLoginButton = ({ onLoginSuccess }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken(true);
      if (!token) throw new Error("Token not generated");

      const res = await axios.post(
        `${API}/api/v1/customer/login`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Login Successful 🎉");

      if (onLoginSuccess) {
        onLoginSuccess(res.data.customer);
      }
    } catch (err) {
      console.log("❌ LOGIN ERROR:", err);
      toast.error("Google Login Failed");
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center gap-3 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all font-medium"
    >
      <svg width="20" height="20" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
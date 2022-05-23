import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase-config";
function Reset() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="">
      <div className="items-center bg-gray-300 mt-20 mx-20 ">
       
        <button type="link"
          className="bg-green-400 mx-20 mt-10 text-center py-2 px-4 rounded text-slate-200 font-serif"
          onClick={() => sendPasswordResetEmail(auth.currentUser.email)}
        >
          Send password reset email
        </button>
        <p className=" mx-20 mt-2 mb-10  rounded text-white-800 font-serif">
          I dont need password reset? <Link className="underline text-white-800" to="/login">Login</Link> now.
        </p>
      </div>
    </div>
  );
}
export default Reset;
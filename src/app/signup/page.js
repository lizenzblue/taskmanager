"use client";
import React, { useState } from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    // Check for email and password validity
    if (!validateEmail(email) || password.length < 6) {
      return;
    }

    const { result, error } = await signUp(email, password);

    if (error) {
      console.error(error);
      return;
    }

    console.log(result);
    router.push("/");
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Update emailError based on the email format
    setEmailError(!validateEmail(newEmail));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Update passwordError based on the length of the password
    setPasswordError(newPassword.length < 6);
  };

  const validateEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid =
    !emailError &&
    !passwordError &&
    email.trim() !== "" &&
    password.trim() !== "";

  const borderColorClassEmail = emailError
    ? "border-red-500"
    : "focus:border-blue-500";

  const borderColorClassPassword = passwordError
    ? "border-red-500"
    : "focus:border-blue-500";

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-3xl font-semibold mb-6 text-center">Sign up</h1>
        <form onSubmit={handleForm} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              onChange={handleEmailChange}
              required
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className={`w-full p-3 border rounded-md focus:outline-none ${borderColorClassEmail} transition duration-300`}
            />
          </div>
          {emailError && (
            <p className="text-sm text-red-500 mt-1">
              {emailError && "Not a valid email."}
            </p>
          )}
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              onChange={handlePasswordChange}
              required
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className={`w-full p-3 border rounded-md focus:outline-none transition duration-300 ${borderColorClassPassword}`}
            />
          </div>
          {passwordError && (
            <p className="text-sm text-red-500 mt-1">
              {passwordError && "Password must be at least 6 characters long."}
            </p>
          )}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ${
              isFormValid ? "" : "opacity-50 cursor-not-allowed"
            }`}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;

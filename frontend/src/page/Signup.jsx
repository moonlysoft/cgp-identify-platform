import React, { useState } from "react";
import Text from "../components/elements/Text";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Dropdown, Option } from "../components/elements/Dropdown/Dropdown";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [optionValue, setOptionValue] = useState("Default");
  const handleSelect = (e) => {
    console.log(e.target.value);
    setOptionValue(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log("optionValue: " + optionValue);
    if (optionValue !== "Default") {
      auth.tenantId = optionValue;
      console.log("tenantId set to: " + auth.tenantId);
    } else {
      auth.tenantId = null;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <main>
      <section>
        <div className="flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <Text className="text-4xl text-white text-center font-bold mb-2">
                Focus<span className="text-tertiary">App</span>
              </Text>

              <h2 className="text-white text-center text-base  tracking-tight text-gray-900">
                Are you new? Sign up today
              </h2>
            </div>
            <div>
              <Dropdown
                formLabel="Select a tenant"
                buttonText="Send form"
                onChange={handleSelect}
                action="/"
              >
                <Option selected value="Select a tenant" />
                <Option value="Default" />
                <Option value="Kisakallio-b6mf8" />
                <Option value="Pajulahti-5a91o" />
              </Dropdown>
            </div>
            <form onSubmit={onSubmit} className="mt-8 space-y-6">
              <div className=" space-y-6 rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    label="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign up
                </button>
              </div>
            </form>

            <p className="text-sm text-white text-center">
              Already have an account?{" "}
              <NavLink to="/login" className="underline text-tertiary">
                Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;

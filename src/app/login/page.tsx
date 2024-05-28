"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useCookies } from "next-client-cookies";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function Login() {
  useEffect(() => {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  }, []);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const cookies = useCookies();

  const handleSunmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username, password);
    if (!username || !password) {
      setError("Please fill in complete information.");
      return;
    }
    try {
      MySwal.fire({
        title: "Logging in",
        text: "please wait a moment...",
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((data) => {
              throw new Error(data.message);
            });
          }
          return res.json();
        })
        .then((data) => {
          Swal.close();
          if (data.status === 200) {
            MySwal.fire({
              title: "Login successful",
              text: "Taking you to the home page....",
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            }).then(() => {
              cookies.set("token", data.token);
              if (data.role === "admin") {
                window.location.href = "/admin";
              } else {
                window.location.href = "/";
              }
              console.log("User Login Successfully");
            });
          } else {
            MySwal.fire({
              title: "Login failed",
              text: data.message,
              icon: "error",
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        })
        .catch((error) => {
          MySwal.fire({
            title: "Login failed",
            text: error.message,
            icon: "error",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        });
    } catch (error) {
      console.log("Error During login : ", error);
    }
  };

  return (
    <div className="m-0 bg-gray-800 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-14">
        <div className="w-full max-w-sm p-4 bg-indigo-700 border border-indigo-400 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSunmit}>
            <h5 className="text-2xl font-semibold text-white dark:text-white text-center">
              Login to your account
            </h5>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-xl font-semibold text-white dark:text-white"
              >
                Username
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-xl font-semibold text-white dark:text-white"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div className="flex items-start">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                <a
                  href="/register"
                  className="text-white hover:underline dark:text-blue-500"
                >
                  create account ?
                </a>
              </div>
              <a
                href="/forgot"
                className="ms-auto text-sm text-white hover:underline dark:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-rose-500 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
            >
              Login to your account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

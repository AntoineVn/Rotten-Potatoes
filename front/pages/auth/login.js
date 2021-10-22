import React, { useState, createContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../components/Header/Header";
import useUser from "../context/users";
import useLocalStorage from "../../hooks/useLocalstorage";

const baseUrl = "//localhost:5000/auth/login";

function Login() {
  const [token, setToken] = useLocalStorage("token", null);
  const [userId, setUserId] = useLocalStorage("userId", null);
  const [username, setUsername] = useLocalStorage("username", null);
  const [role, setRole] = useLocalStorage("role", null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.access_token);
        setUsername(data.username);
        setUserId(data.userId);
        setRole(data.role);
        setToken(data.access_token);
        localStorage.setItem("access_token",data.access_token)
        router.push("/");
      });
  };

  return (
    <div>
      <Header />
      <div className="ml-auto mr-auto w-1/4 pt-24">
        <div className="w-full">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Username"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="********"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>

              <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <Link href="/auth/register">
                  <a>Not Register yet !</a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

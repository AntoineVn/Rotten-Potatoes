import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Header from "../../components/Header/Header";
import useUser from '../context/users'
import Head from 'next/head'
import useLocalStorage from '../../hooks/useLocalstorage';

export default function Profile() {

    const router = useRouter()

    const User = useUser //Context

    const baseUrl = '//localhost:5000/users/'

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [newusername, setNewUsername] = useState("")

    const [token, setToken] = useLocalStorage("token", null);
    const [userId, setUserId] = useLocalStorage("userId", null);
    const [username, setUsername] = useLocalStorage("username", null);
    console.log(token)

    const [profilename, setProfileName] = useState(username)

    const [edit, setEdit] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === confirm) {
            const patch_user = new Request(
                baseUrl + userId,
                {
                    method: "PATCH",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"

                    },
                    body: JSON.stringify({
                        email: email,
                        username: newusername,
                        password: password
                    })
                }
            )

            const res = await fetch(patch_user)
            const patch_data = await res.json()
            console.log(patch_data)
            setUsername(newusername)
            setEdit(false)
        }
    };

    const editing = () => {
        setEdit(true)
    }

    const deleting = async (e) => {
        e.preventDefault()

        const del_user = new Request(
            baseUrl + userId,
            {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        )
        const res = await fetch(del_user)
        const del_data = await res.json()


        if (del_data.statusCode == 200) {
            localStorage.removeItem("username")
            localStorage.removeItem("access_token")
            localStorage.removeItem("userId")
            router.push("/")
        }
    }

    const back = () => {
        router.push('/')
    }

    return (
        <div>
            <Head>
                <title>RottenPotatoes</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            {!username && (
                <div className="flex flex-col">
                    <h1 className="text-center text-5xl text-red-600">Unauthorized </h1>

                    <button
                        className="ml-auto mr-auto mt-20 w-40 rounded text-xl 
                        bg-white text-red-500 hover:text-red-600"
                        onClick={back}
                    >
                        Back to Home
                </button>
                </div>
            )}


            { username && (
                <div>
                    <h1 className="text-center text-5xl m-10">Your Profile</h1>

                    <div className=" ml-auto mr-auto w-1/3">
                        <div className="bg-gray-300 h-48 mt-40">

                            <div className="text-center pt-10">
                                <label className="text-black text-4xl">
                                    Hi {profilename}
                                </label>
                            </div>

                            <div className="flex justify-center gap-10 mt-10">
                                <div>
                                    <button
                                        onClick={editing}
                                        className=" bg-green-600 rounded w-28 text-black "
                                    >
                                        EDIT
                                </button>
                                </div>

                                <div>
                                    <button
                                        onClick={deleting}
                                        className=" bg-red-700 rounded w-28 text-black "
                                    >
                                        DELETE
                                </button>
                                </div>
                            </div>

                            {edit && (

                                <form onSubmit={handleSubmit} className=" bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4">

                                    <div className="mb-4 text-center">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            for="username"
                                        >
                                            Username
                                    </label>
                                        <input
                                            className="shadow appearance-none border 
                                    rounded w-80 py-2 px-3 leading-tight 
                                    focus:outline-none focus:shadow-outline"
                                            id="username"
                                            name="username"
                                            value={newusername}
                                            onChange={(e) => setNewUsername(e.target.value)}
                                            type="text"
                                            placeholder="Username"
                                        />
                                    </div>

                                    <div className="mb-4 text-center">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            for="email"
                                        >
                                            Email
                                    </label>
                                        <input
                                            className="shadow appearance-none border 
                                    rounded w-80 py-2 px-3 leading-tight 
                                    focus:outline-none focus:shadow-outline"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            placeholder="Email"
                                        />
                                    </div>

                                    <div className="mb-4 text-center">
                                    <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="password"
                                    >
                                    Password
                                    </label>
                                    <input
                                    className="shadow appearance-none border 
                                    rounded w-80  py-2 px-3 text-gray-700 mb-3 
                                    leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Password"
                                    />
                                </div>
    
                                <div className="mb-4 text-center">
                                    <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    for="password"
                                    >
                                    Confirm Password
                                    </label>
                                    <input
                                    className="shadow appearance-none border 
                                    rounded w-80  py-2 px-3 text-gray-700 mb-3 
                                    leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    name="password"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    type="password"
                                    placeholder="Password"
                                    />
                                </div>

                                    <div className=" text-center">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 
                                    text-white font-bold py-2 px-4 rounded 
                                    focus:outline-none focus:shadow-outline"
                                            type="submit"
                                        >
                                            Submit
                                    </button>
                                    </div>

                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Nav from "../../components/Users/Nav";
import Link from "next/link";
import { useRouter } from "next/router";
import useLocalStorage from "../../hooks/useLocalstorage";
import FetchUserLists from './fetchUserLists'


export default function CreateLists() {
    const router = useRouter();
    const localStorage = useLocalStorage;
    const [listName, setListName] = useState("");
    const [listDescription, setListDescription] = useState("");

    const token = localStorage('token')[0];
    const userId = localStorage('userId')[0];
    const username = localStorage('username')[0];
    console.log(token)
    console.log(userId)

    const createUserLists = async (e) => {
        e.preventDefault()
        const res = await fetch('//localhost:5000/lists', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                userId: userId,
                name: listName,
                description: listDescription
            }),
        })

        const user = res.json()
        console.log(user.list)
    }

    const back = () => {
        router.push('/')
      }

    return (
        <div>
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
            {username && (
                <div>
                <div className="ml-auto mr-auto w-1/5 pt-5">
                <form className=" h-60 w-52 border-2 rounded-lg bg-gray-300" onSubmit={createUserLists}>
                    <h3 className="text-xl text-black text-center pt-5">Name your list</h3>
                    <input className="w-32 rounded mx-8 my-2" name="listName" value={listName} onChange={(e) => setListName(e.target.value)} />
                    <br />
                    <h3 className="text-xl text-black text-center pt-5">Leave a description</h3>
                    <input className="w-32 rounded mx-8 my-2"  name="listDescription" value={listDescription} onChange={(e) => setListDescription(e.target.value)} />
                    
                        <button className= "mx-12 mt-2 w-1/2 rounded transition duration-700 ease-in-out bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110" type="submit">
                            Create list
                        </button>
                </form>
            </div>
            <FetchUserLists />
            </div>
            )}
            
        </div>
    )
}
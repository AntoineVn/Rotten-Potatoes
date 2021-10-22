import React, { useEffect, useState, Fragment, useRef } from "react";
import Header from "../../components/Header/Header";
import Nav from "../../components/Users/Nav";
import Link from "next/link";
import useLocalStorage from "../../hooks/useLocalstorage";
import Display from './displayList'

export default function FetchUserLists() {
    const localStorage = useLocalStorage
    const [userLists, setUserLists] = useState([])

    const token = localStorage('token')[0];
    const userId = localStorage('userId')[0];

    useEffect(async () => {

        console.log(token)
        console.log(userId)

        await fetch('//localhost:5000/lists/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then((res) => res.json())
            .then((userlists) => {
                console.log(userlists);
                setUserLists(userlists)
            });

    }, [userId])

    return (
        <div>
            {!userLists && (
                <p>Loading</p>
            )}
            {userLists.map(list => (
                <Display key={list.id} list={list} />
            ))}
        </div>
    )
}
import React, { createContext, useContext } from "react";

const UserContext = createContext()


export function getFavoritesUserMovies({ props }) {

    const localStorage = useLocalStorage
    const [userMovies, setUserMovies] = useState(() => { })
    const token = localStorage('token')[0]
    const userId = localStorage('userId')[0]

    useEffect(async () => {

        console.log(token)
        console.log(userId)

        const res = await fetch('//localhost:5000/users/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then((res) => res.json())
            .then((userMovies) => {
                console.log(userMovies.favorite);
                return {
                    props: userMovies.favorite
                }
            });

    }, [])
}

export function getUserLists() {
    const localStorage = useLocalStorage
    const [userMovies, setUserMovies] = useState(() => { })
    const token = localStorage('token')[0]
    const userId = localStorage('userId')[0]
    console.log(userMovies)

    useEffect(async () => {

        console.log(token)
        console.log(userId)

        const res = await fetch('//localhost:5000/lists/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
            .then((res) => res.json())
            .then((userLists) => {
                console.log(userMovies.favorite)
                return {
                    props: userLists
                }
            })

    }, [userId])




}

export function useUserContext() {
    return useContext(UserContext);
}


import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Header/Header";
import useLocalStorage from "../../hooks/useLocalstorage";
import Display from './displayFavorites'
import FlipMove from 'react-flip-move'
import Head from 'next/head'
import { useRouter } from "next/router";

function FavoriteMoviesUsers() {
  const localStorage = useLocalStorage
  const [userMovie, setUserMovie] = useState([])
  const token = localStorage('token')[0]
  const userId = localStorage('userId')[0]
  const username = localStorage('username')[0]
  console.log(userMovie)

  const router = useRouter()

  useEffect(async () => {
    console.log(userId)
    await fetch(`http://localhost:5000/users/` + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((userMovie) => {
        setUserMovie(userMovie.favorite)
        console.log(userMovie.favorite)
      })
  })

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
      {username && (
        <div>
            <FlipMove className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
              {userMovie.map(movie => (
                <Display  key={movie.id} movie={movie} />
              ))}
            </FlipMove>
        </div>
      )}
      
      
    </div>

  )
};

export default FavoriteMoviesUsers
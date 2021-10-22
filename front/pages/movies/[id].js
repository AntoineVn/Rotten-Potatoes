import Header from "../../components/Header/Header";
import React, { useState } from "react";
import Nav from "../../components/Users/Nav";
import Image from "next/image";
import { ThumbUpIcon, StarIcon, HeartIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";
import useLocalStorage from '../../hooks/useLocalstorage';
import { useRouter } from "next/router";
import Comment from '../../components/Comment'
import moment from 'moment'
import Head from 'next/head'


export default function Movie({ movie }) {
  console.log(movie)

  const date_now = moment().format("YYYY/MM/DD")                   // DATE DU JOUR

  const router = useRouter()                                      // ROUTER redirection des pages

  const [role, setRole] = useLocalStorage("role", null);          // LOCALSTORAGE
  const [token, setToken] = useLocalStorage("token", null);
  const [userId, setUserId] = useLocalStorage("userId", null);
  const [username, setUsername] = useLocalStorage("username", null);

  const BASE_URL = "https://image.tmdb.org/t/p/original/";        // BASE URL DES IMAGES

  const [comment, setComment] = useState("");                     // STATE UTILISE
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.overview);
  const [date, setDate] = useState(movie.release_date);
  const [count, setCount] = useState(movie.vote_count);
  const [average, setAverage] = useState(movie.vote_average);
  const [edit, setEdit] = useState(false)
  const [movie_id, setId] = useState(movie.id)
  const [grade, setGrade] = useState(0)

  const movie_Url = '//localhost:4000/movies/'                    // BASE URL DU BACK MOVIES
  const users_Url = '//localhost:5000/users/'

  const handleSubmit = async (e) => {
    e.preventDefault();



    const patch_movie = new Request(             // Requete pour EDITER un movie
      movie_Url + movie_id,
      {
        method: "PATCH",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"

        },
        body: JSON.stringify({
          title: title,
          overview: description,
          release_date: date,
          vote_average: average,
          vote_count: count
        })
      }
    )

    const res = await fetch(patch_movie)
    const patch_data = await res.json()
    console.log(patch_data)
    setEdit(false)
  };

  const editing = () => {                         // Affiche le formualaire EDIT
    if (edit == false) {
      setEdit(true)
    }
    else if (edit == true) {
      setEdit(false)
    }
  }

  const cancel = () => {                          // Annule le formulaire EDIT
    setEdit(false)
  }

  const add_comment = async (e) => {
    e.preventDefault()


    if (grade && comment) {

      const body_comment = {                      // Construction du body comment
        date: date_now,
        comment: comment,
        userId_comment: userId,
        username_comment: username,
        grade: grade
      }


      const somme = (count * average) + grade     // Calcul de la moyenne 
      const moy = somme / (count + 1)

      const avg = moy.toFixed(1)                  // Arrondi de la moyenne
      const int_avg = Number(avg)

      setAverage(int_avg)                             // nouvelle moyenne a afiicher

      setCount(count + 1)                         // On rajoute un vote
      console.log(count)

      const patch_movie_vote_comment = new Request(      // Requete pour actualiser le film avec les votes
        movie_Url + movie_id,
        {
          method: "PATCH",
          headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            comments: body_comment,
            vote_count: count + 1,
            vote_average: int_avg
          })
        }
      )

      const res = await fetch(patch_movie_vote_comment)
      const patch_data_movie = await res.json()
      console.log(patch_data_movie)
      router.push("/movies/" + movie_id)

    }

  }

  const del_movie = async () => {                 // Requete pour supprimer le movie
    const del = new Request(
      movie_Url + movie_id,
      {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + token,
        },
      }
    )

    const res = await fetch(del)
    const delete_data = await res.json()
    console.log(delete_data)
    router.push("/")

  }

  async function addMoviesToFavorite(mov) {       // Requete pour ajouter le film dans ses favoris au user
    console.log(mov);
    const res = await fetch(
      users_Url + userId,
      {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token,
        },
        body: JSON.stringify({
          favorite:
            mov
        })
      }
    );
    const movie = res.json();
    console.log(movie);
  }

  return (
    <div>
      <Head>
        <title>RottenPotatoes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Nav />

      <div className="grid   grid-flow-col gap-2  my-20">
        <div className="row-span-5 h-full w-96">
          {role == "admin" && (

            <div className=" flex justify-center mt-10">
              <button onClick={editing} className="flex text-3xl rounded text-bold transition duration-100 
              transform hover:scale-105  stroke-current text-white hover:text-green-700 focus:outline-none">
                EDIT <PencilIcon className="h-8 mx-6" />
              </button>
            </div>

          )}
          {edit && (

            <form onSubmit={handleSubmit} className="bg-gray-200 shadow-md rounded mt-10 pt-2 pb-8 mx-5">

              <div className="mb-4 text-center">
                <div className="my-10">
                  <label className="text-black text-bold text-2xl">
                    {title}
                  </label>
                </div>

                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Title
                </label>
                <input
                  className="shadow appearance-none border 
                rounded w-72 py-2 px-3 leading-tight 
                focus:outline-none focus:shadow-outline"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder={movie.title}
                />
              </div>

              <div className="mb-4 text-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="email"
                >
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border 
                rounded w-72 h-40 py-2 px-3 leading-tight 
                focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="email"
                  placeholder={movie.overview}
                />
              </div>

              <div className="mb-4 text-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="email"
                >
                  Date
                </label>
                <input
                  className="shadow appearance-none border 
                rounded w-72 py-2 px-3 leading-tight 
                focus:outline-none focus:shadow-outline"
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value)
                    console.log(date)
                  }
                  }
                  type="date"
                  placeholder={movie.release_date}
                />
              </div>

              <div className="mb-4 text-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="email"
                >
                  Vote Count
                </label>
                <input
                  className="shadow appearance-none border 
                rounded w-72 py-2 px-3 leading-tight 
                focus:outline-none focus:shadow-outline"
                  id="vote_count"
                  name="vote_count"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  type="number"
                  min="0"
                  placeholder={movie.vote_average}
                />
              </div>

              <div className="mb-4 text-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="email"
                >
                  Description
                </label>
                <input
                  className="shadow appearance-none border 
                rounded w-72 py-2 px-3 leading-tight 
                focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  value={average}
                  onChange={(e) => setAverage(e.target.value)}
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  placeholder={movie.overview}
                />
              </div>

              <div className="flex  justify-center gap-5">
                <button
                  className="bg-blue-500 hover:bg-blue-700 
                text-white font-bold py-2 px-4 rounded 
                focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>

                <button onClick={cancel} className="bg-red-500 hover:bg-red-700 
                text-white font-bold py-2 px-4 rounded 
                focus:outline-none focus:shadow-outline">
                  Cancel
                </button>
              </div>

            </form>

          )}

        </div>

        <div className="grid justify-center">
          <Image
            className="object-none object-center"
            src={`${BASE_URL}${movie.backdrop_path}`}
            height={400}
            width={680}
          />
        </div>

        <div className="grid justify-center px-2 pt-10">
          <h1 className="text-3xl font-bold pt-3 text-center">{title}</h1>
          <p className="text-xl py-2">{description}</p>
          <p className="flex  justify-center text-xl">
            {date} -
            <ThumbUpIcon
              className="h-6 mx-2 transition duration-100 
                        transform hover:scale-125
                        stroke-current hover:text-blue-300"
            />
            {count} -
            <StarIcon
              className="h-6 mx-2 transition duration-100 
                        transform hover:scale-125
                        stroke-current hover:text-yellow-300"
            />
            {average}
            {token && (
              <div className="pl-14">
                <button
                  className="w-20 bg-white transition duration-100 
              transform hover:scale-125"
                  onClick={() => addMoviesToFavorite(movie)}
                >
                  <HeartIcon
                    className=" h-8  mx-6 transition duration-100 
              transform hover:scale-105 stroke-current text-red-600"
                  />
                </button>
              </div>
            )}


          </p>
        </div>

        <div className="grid justify-center ">
          <h1 className="text-5xl text-center text-red-600 font-bold pb-10">Critics</h1>
          {movie.comments == 0 && (<p>No comments</p>)}
          {movie.comments.map(data => (
            <Comment key={data.date} data={data} />
          ))}
        </div>
        {token && (
          <div className="ml-auto mr-auto mt-10 bg-white rounded h-80 w-96">
            <form onSubmit={add_comment}>
              <label
                className="block text-center text-2xl text-gray-700 font-bold m-6"
                for="Comment"
              >
                Write a Comment
            </label>

              <div className="text-center">
                <textarea
                  type="text"
                  className="shadow m-5 appearance-none border rounded w-72 text-gray-700"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Type the comment ..."
                ></textarea>
              </div>
              <label className="block text-gray-700 text-2xl font-bold text-center pb">Grade the movies</label>
              <div className="text-center">
                <input
                  className="text-center shadow m-5 appearance-none border rounded w-20 text-gray-700"
                  type="number"
                  min="0"
                  max="10"
                  value={grade}
                  onChange={(e) => setGrade(e.target.valueAsNumber)}
                ></input>
              </div>


              <div className="text-center pb-10">
                <button type="submit" className="rounded w-20 bg-gray-700">
                  Submit
              </button>
              </div>
            </form>
          </div>

        )}

        <div className="row-span-5 h-full w-96">
          {role == "admin" && (
            <div className="flex justify-center mt-10">
              <button onClick={del_movie} className="flex text-3xl text-bold transition duration-100 
                transform hover:scale-105  stroke-current text-white hover:text-red-600">
                DELETE <TrashIcon className="h-8 mx-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const movie = await fetch(
    `http://localhost:4000/movies/${params.id}`
  ).then((res) => res.json());

  return {
    props: {
      movie,
    },
  };
}

export async function getStaticPaths() {
  const movies = await fetch(`http://localhost:4000/movies`).then((res) =>
    res.json()
  );

  return {
    paths: movies.map((movie) => ({
      params: { id: movie.id.toString() },
    })),
    fallback: false,
  };
}

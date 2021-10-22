import { HeartIcon, PlusIcon, StarIcon, ThumbUpIcon } from "@heroicons/react/outline"
import Image from "next/image"
import { useState, forwardRef } from 'react'


const Thumbnail = forwardRef(({result}, ref) => {
    const BASE_URL = "https://image.tmdb.org/t/p/original/"

    const test = () => {
        console.log(result)
    }

    const add_movies = async (e) => {
        e.preventDefault()

        const get_movie = {
            
        }

        const [ movie, data ] = await Promise.all([
            fetch('https://api.themoviedb.org/3/movie/' + result.id + '?api_key=df88b4b1e14b68d69afc892ebeb82fd7', {
                method:"GET"
            }).then(res => res.json())
            ,
            fetch('https://api.themoviedb.org/3/movie/' + result.id + '/credits?api_key=df88b4b1e14b68d69afc892ebeb82fd7',{
                method:"GET"
            }).then(res => res.json())
        ])

        const genre = Object.assign({}, movie.genres)

        var director = data.crew.find(element => {
            if (element.job === 'Director') {
                return element
            }
        })
        if ( genre == undefined ) {
            genre = 0
        }
        if ( director == undefined ) {
            director = "No data"
        }


        if ( genre && director ) {

            const add_movies = new Request ('//localhost:4000/movies',
                {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("access_token"),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify ({
                        backdrop_path: result.backdrop_path,
                        genre_ids : genre || genre[0].id,
                        title: result.title || result.original_title|| result.name || result.original_name ,
                        overview: result.overview,
                        release_date: result.release_date || result.first_air_date,
                        vote_average: result.vote_average,
                        vote_count: result.vote_count,
                        director: director.name || director,
                        role: "admin"
                    })
                }
            )
            
            const res = await fetch(add_movies)
            const post_data = await res.json()
            console.log(post_data)
        }        
        
    }

    return (
        <div>
        <div ref={ref} className="p-2 group cursor-pointer transition duration-200 ease-in-out transform sm:hover:scale-105 hover:z-50">
            <Image 
                layout='responsive'
                src={
                    `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
                    `${BASE_URL}${result.poster_path}`
                }
                alt=""
                height={1080}
                width={1920}
            />
            
            <div className="p-2">
                <p className="truncate max-w-md">{result.overview}</p>
                <h2 className="mt-1 text-2xl text-white transition
                duration-100 ease-in-out group-hover:font-bold">
                    {result.title || result.original_title || result.name} 
                </h2>
                <p className="flex items-center opacity-0 group-hover:opacity-100">
                    {result.release_date || result.first_air_date}  -
                    <ThumbUpIcon className="h-5 mx-2"/> {result.vote_count} -
                    <StarIcon className="h-5 mx-2"/> {result.vote_average}
                </p>
                
            </div>
        </div>
        <p className="flex justify-center gap-20 py-5 ">
            
            <button onClick={test} className="w-20 bg-gray-100 transition duration-100 
                                transform hover:scale-125">
                <HeartIcon className=" h-8  mx-6 transition duration-100 
                                    transform hover:scale-105 
                                    stroke-current text-red-600" />
            </button>

            <button onClick={add_movies} className="w-20 bg-gray-100 transition duration-100 
                                transform hover:scale-125">
                <PlusIcon className=" h-8  mx-6 transition duration-100 
                                        transform hover:scale-105 
                                        stroke-current text-green-400" />
            </button>
        </p>
        </div>
    )
})

export default Thumbnail

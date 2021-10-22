import { StarIcon, ThumbUpIcon } from "@heroicons/react/outline"
import Image from "next/image"
import { forwardRef } from 'react'
import Link from 'next/link'

const Favorites = forwardRef(({ movie }, ref) => {
    const BASE_URL = "https://image.tmdb.org/t/p/original/"
    console.log(movie)

    return (
        <div>
            <div ref={ref} className="p-2 group transition duration-200 ease-in-out transform sm:hover:scale-105 hover:z-50">
                <div className="grid grid-flow-col gap-2  my-20">
                    <Link href={`/movies/${movie.id}`} >
                        <a>
                            <Image
                                layout='responsive'
                                src={
                                    `${BASE_URL}${movie.backdrop_path}`
                                }
                                height={1080}
                                width={1920}
                            />

                            <div className="p-2">
                                <p className="truncate max-w-md">{movie.overview}</p>
                                <h2 className="mt-1 text-2xl text-white transition
                            duration-100 ease-in-out group-hover:font-bold">
                                    {movie.title || movie.original_title}

                                </h2>
                                <p className="flex items-center opacity-0 group-hover:opacity-100">
                                    {movie.release_date} -
                                <ThumbUpIcon className="h-5 mx-2" /> {movie.vote_count} -
                                <StarIcon className="h-5 mx-2" /> {movie.vote_average}
                                </p>
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
})

export default Favorites
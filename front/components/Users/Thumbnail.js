import { HeartIcon, PlusIcon, StarIcon, ThumbUpIcon } from "@heroicons/react/outline"
import Image from "next/image"
import { forwardRef } from 'react'
import Link from 'next/link'

const Thumbnail = forwardRef(({result}, ref) => {
    const BASE_URL = "https://image.tmdb.org/t/p/original/"

    return (
        <div>
            <div ref={ref} className="p-2 group transition duration-200 ease-in-out transform sm:hover:scale-105 hover:z-50">
                <Link href={`/movies/${result.id || result._id}`} >
                    <a>
                        <Image 
                            layout='responsive'
                            src={
                                `${BASE_URL}${result.backdrop_path}`
                            }
                            height={1080}
                            width={1920}
                        />
                
                        <div className="p-2">
                            <p className="truncate max-w-md">{result.overview}</p>
                            <h2 className="mt-1 text-2xl text-white transition
                            duration-100 ease-in-out group-hover:font-bold">
                                {result.title || result.original_title } 
                                
                            </h2>
                            <p className="flex items-center opacity-0 group-hover:opacity-100">
                                {result.release_date} -
                                <ThumbUpIcon className="h-5 mx-2"/> {result.vote_count} -
                                <StarIcon className="h-5 mx-2"/> {result.vote_average}
                            </p>
                        </div>
                    </a>
                </Link>
            </div>
        </div>

    )
})

export default Thumbnail

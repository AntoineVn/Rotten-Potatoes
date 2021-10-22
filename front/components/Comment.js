import { CogIcon, StarIcon } from "@heroicons/react/outline"
import { forwardRef } from "react"
import useLocalStorage from "../hooks/useLocalstorage"


const Comment = forwardRef(({data},ref) => {

    const [userId, setUserId] = useLocalStorage("userId", null);

    return (
        <div className="bg-white rounded my-2 w-80 h-auto text-black">
            <div className="flex justify-evenly pt-3">
                <p className="text-xl text-bold">
                    {data.username_comment}
                </p>
                <p className="text-xl">
                    {data.date}
                </p>
                { data.userId_comment ==  userId && (
                    <CogIcon className="h-8 mx-1"/>
                )}
                
            </div>
            <div className="flex justify-between pt-3 pb-3">
                <p className="pl-5 text-xl">
                    {data.comment}
                </p>
                <p className="flex pr-5">
                    <StarIcon className="h-8 text-xl transition duration-100 
                        transform hover:scale-125 stroke-current hover:text-yellow-300"></StarIcon>  {data.grade}
                    
                </p>
            </div>
            
            
        </div>
    )

})

export default Comment
import Heart from "./Heart"
import { useEffect, useState } from "react"



export default function LikeButton({clickhandler=()=>{},tweetId}){
    let [clicked, setClicked]= useState(false)
    let [likes, setLikes] = useState(0)

    useEffect(()=>{
        fetch(`/api/likes?tweetId=${tweetId}`)
        .then(d=>d.json())
        .then(r=>console.log(r))
    },[])
    return(
        <>
            <button style={{ width: '20px' }} onClick={()=>{
                setClicked(!clicked)
                clickhandler()
            }}><Heart fill={clicked?'red':''}/>{likes+clicked}</button>
        </>
    )
}


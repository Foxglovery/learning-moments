import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import { getLikes } from "../services/likesService";

export const AllPostsList = () => {
    const [allPosts, setAllPosts] = useState([])
    const [allLikes, setAllLikes] = useState([])

    useEffect(() => {
        getAllPosts().then((allPostArray) => {
            setAllPosts(allPostArray)
        })
    }, [])

    useEffect(() => {
        getLikes().then((likesArray) => {
            setAllLikes(likesArray)
        })
    }, [])

    //returns card with post title,likes,topic
    return <div className="posts">
        {allPosts.map(postObj => {
            //finds matches amongst the wreckage
            const foundLike = allLikes.find(like => like.postId === postObj.id)
            //checks if foundLike is truthy and sets length to variable 
            const likeCount = foundLike ? foundLike.likedUserID.length : 0
            return (
                <div id="post_card">
                    <div id="post_card_title" key={postObj.Id} >{postObj.title}</div>

                    <div id="post_card_topic">{postObj.topic.topicName}</div>
                    <div id="post_card_likes">{likeCount} Likes</div>



                </div>
            )
        })}
    </div>
}

//Style this betch just a little
//then plan out searchBar
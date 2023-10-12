import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/postService";
import "./PostDetails.css";
import { getLikesByPostId, updateLike } from "../../services/likesService";


export const PostDetails = ({currentUser, getAndSetPosts}) => {
  const [post, setPost] = useState({});
  const [likes, setLikes] = useState({})
  //added state to watch when count changes
  const [likeCount, setLikeCount]= useState(0)
  const { postId } = useParams();
  
  //grabs likes and sets likes
  useEffect(() => {
    //returns array of matching id like objects
    getLikesByPostId(postId).then((likeArray) => {
      //sets like state  
      setLikes(likeArray)
      console.log(likeArray)
    })
  },[postId,likeCount])


  ////grabs specific post with user and topic expanded
  useEffect(() => {
    getPostById(postId).then((data) => {
      //this strips the array layer off my post object
      const postObj = data[0];
      //set post state
      setPost(postObj);
      //my beautiful post Obj with expanded info
      console.log(postObj)
    });
  }, [postId,likeCount]);

  const handleLike = () => {
    const newLikeObj = {
        
        "postId": parseInt(postId),
        "userId": currentUser.id
        
    }
    
    updateLike(newLikeObj).then(() => {
      getAndSetPosts()
      //updates state and induces rerender
      setLikeCount(likeCount + 1)
    })
    console.log(newLikeObj)
    
  }

  return (
    <div className="post">
      <div id="post_card">
        <div id="post_card_title">{post.title}
        </div>
        <div>
        <p className="post-info">{post.content}</p>
      </div>
      <div>
        <span className="post-info">{post.user?.name}</span>
      </div>
      
      
        
      <div className="card_btm_wrapper">
      <div className="post_card_topic">
        <span>
          Posted In: <span className="italics">{post.topic?.topicName}</span>
        </span>
      </div>
      
       <div>
          <span className="post-info">{post.created_at}</span>
        </div>
      
      
         <div>
          <span className="post-info">
            This post has {likes.length} Schmoodles{" "}
          </span>
        </div>
      
        <div className="btn-container">
            {/* if logged in user id matches the post.userId, display Edit Post  */}
            {currentUser.id === post.userId ? (
                <button>Edit Post</button>
            ) : ""}
            {/* if logged in userid does not match, display UpSchmood btn */}
            {currentUser.id != post.userId ? (
                <button onClick={handleLike}>UpSchmoodles</button>
            ) : ""}
        </div>
      </div>
      </div>
    </div>
  );
};


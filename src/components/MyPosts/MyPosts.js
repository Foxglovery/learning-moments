import { useEffect, useState } from "react";
import { deletePost, getPostsByUserId } from "../../services/postService";
import { Link } from "react-router-dom";
import "./MyPosts.css";
//passed in currentUser as prop
export const MyPosts = ({ currentUser }) => {
  const [myPosts, setMyPosts] = useState([]);
  //added new state here to listen for when a post is deleted and added to first Effect Dep Array for to refresh upon delete
  const [postDeleted, setPostDeleted] = useState([]);

  //added currentUser to dependency array to persist list after refresh
  useEffect(() => {
    getPostsByUserId(currentUser.id).then((myPostsArray) => {
      setMyPosts(myPostsArray);
    });
    console.log(myPosts);
  }, [currentUser, postDeleted]);

  return (
    <div className="posts">
      {myPosts.map((postObj) => {
        return (
          <div key={postObj.id} className="post_card">
            {/* added link to title */}
            <Link to={`/allPosts/${postObj.id}`}>
              <div className="post_card_title" key={postObj.id}>
                {postObj.title}
              </div>
            </Link>
            <div className="card_btm_wrapper">
              <div id="post_card_topic">
                <p>
                  Posted In:{" "}
                  <span className="italics">{postObj.topic.topicName}</span>
                </p>
              </div>

              <div id="post_card_likes">{postObj.created_at}</div>
            </div>
            <button
              className="post_button"
              onClick={() => {
                deletePost(postObj.id);
                setPostDeleted();
              }}
            >
              Delete Post
            </button>
          </div>
        );
      })}
    </div>
  );
};

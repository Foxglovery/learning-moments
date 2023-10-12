import { useEffect, useState } from "react";

import "./NewPost.css";
import { NewPostDropdownSearch } from "../dropdown/NewPostDropdown";
import { addNewPost } from "../../services/postService";


export const NewPost = ({ currentUser, allPosts }) => {
  const [post, setPost] = useState({})
  const [newTopicId, setNewTopicId] = useState(0)

  
  const handleSave = (event) => {
      event.preventDefault()
      console.log('save clicked')
      //there may be a better way to make sure the topic is selected
      if (!newTopicId) {
        alert("Yo, you gotta pick a topic, bruh");
        return
      }

    // declare constant with post object format key pairs
    const newPost = {
      //this says, yeah yeah, don't touch my content or title which would be erased from state otherwise
      ...post,
      userId: currentUser.id,
      created_at: new Date(),
      //uses state set in NPDD compo.
      topicId: parseInt(newTopicId)
    }
    setPost(newPost)
    //call post funct on newPost
    addNewPost(newPost)
  //  NAVIGATE FUNCTIONALITY GOES HERE TO MYPOSTS
  }
  
  


  return (
    <form className="profile">
      <h2>New Post</h2>
      <fieldset>
        <div>
          {/* passes state setter to component so it can do the dirty work */}
          {<NewPostDropdownSearch setNewTopicId={setNewTopicId}/>}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            required
            className="form-control"
            
            
            onChange={(event) => {
              const copy = {...post}
            copy.title = event.target.value
            setPost(copy)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Body Text</label>
          <input
            type="text"
            name="body"
            required
            className="form-control"
            //saves temp input in state
            onChange={(event) => {
              //this works by making a copy of post
              const copy = {...post}
              //assigning event value to copy's content property
              copy.content = event.target.value
              //updates state with new value
              setPost(copy)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button onClick={handleSave}>
            Add New Post
          </button>
        </div>
      </fieldset>
    </form>
  );
};


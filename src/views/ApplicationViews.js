import { Outlet, Route, Routes } from "react-router-dom";
import { AllPostsList } from "../components/AllPosts/AllPosts";
import { NavBar } from "../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { PostDetails } from "../components/AllPosts/PostDetails";
import { getAllPosts } from "../services/postService";
import { NewPost } from "../components/NewPost/NewPost";
import { MyPosts } from "../components/MyPosts/MyPosts";


export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})
  const [allPosts, setAllPosts] = useState([])
  
  //this will update our posts when edited or liked
  const getAndSetPosts = () => {
    getAllPosts().then(postArray => {
        setAllPosts(postArray)//fills a new array with state of database tickets
        console.log("posts set")
    })
}

  useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user")
    const learningUserObject = JSON.parse(localLearningUser)
    setCurrentUser(learningUserObject)
  }, [])

    return (
    <>
      <Routes>
        {/* parent route */}
        <Route path="/" element={
            <>
            <NavBar />
            <Outlet />
            </>
        }>
          <Route index element={<AllPostsList />} />
          <Route path="allPosts">
            <Route index element={<AllPostsList />} />
            {/* the path becomes a variable based upon the useParam defined in child component */}
            <Route path=":postId" element={<PostDetails currentUser={currentUser} getAndSetPosts={getAndSetPosts} />} />
          </Route>
          <Route path="newPost" element={<NewPost   currentUser={currentUser} />} />
        <Route path="myPosts" element={< MyPosts   currentUser={currentUser} />} />
        </Route>
        
      </Routes>
    </>
  );
};

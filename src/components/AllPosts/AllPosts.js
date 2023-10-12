import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postService";
import { getLikes } from "../../services/likesService";
import "./AllPosts.css"
import { DropdownSearch } from "../dropdown/DropdownSearch";
import { Link } from "react-router-dom";
import { FilterBar } from "../filterBar/FilterBar";

export const AllPostsList = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allLikes, setAllLikes] = useState([]);
  const [topicId, setTopicId] = useState(0);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  
    

  useEffect(() => {
    //gets all the posts
    getAllPosts().then((allPostArray) => {
      //sets filteredposts to all the posts
      setFilteredPosts(allPostArray);
      //also sets all posts as all posts
      setAllPosts(allPostArray);
    });
  }, []);

  useEffect(() => {
    //gets and sets all likes
    getLikes().then((likesArray) => {
      setAllLikes(likesArray);
    });
  }, []);

  useEffect(() => {
    //if topicId is not truthy (BECAUSE IT WONT BE!) then all posts will display
    if (!topicId) {
      setFilteredPosts(allPosts);
    } else {
      const filteredPosts = allPosts.filter(
        (post) => parseInt(topicId) === post.topicId
      );
      setFilteredPosts(filteredPosts);
    }
    //stores array of filtered posts with matching ids to dropdown
  }, [topicId, allPosts]);

  //if value in search bar is included in post title it will display
  useEffect(() => {
    if (searchTerm) {
      const postSearch = allPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(postSearch);
    } else {
      setFilteredPosts(allPosts);
    }
  }, [searchTerm]);

  //if where post title lowecase includes searchterm lowercase
  //set filteredpost to postsearch
  //pass setsearchterm to dropdownsearch
  //on the input in dropdownsearch, an onchange event to setsearhterm

  //returns dropdown and card with (post title,likes,topic)
  return (
    <>
      <DropdownSearch
        //passes setTopicId as a prop so that DropdownBar can use it
        setTopicId={setTopicId}
        // setSearchTerm={setSearchTerm}
      />
      <FilterBar setSearchTerm={setSearchTerm}/>
      <div className="posts">
        {/* iterates filtered posts and for each */}
        {filteredPosts.map((postObj) => {
          //finds matches amongst the wreckage
          const foundLikes = allLikes.filter((like) => like.postId === postObj.id);
          //checks if foundLikes is truthy and sets length to variable
          const likeCount = foundLikes.length
          return (
            
              <div key={postObj.id} id="post_card">
                
                <Link to={`/allPosts/${postObj.id}`}>
                  <div id="post_card_title" key={postObj.Id}>
                  {postObj.title}
                </div></Link>
                
                <div className="card_btm_wrapper">
                  
                  <div id="post_card_topic">
                    <p>
                      Posted In:{" "}
                      <span className="italics">{postObj.topic.topicName}</span>
                    </p>
                  </div>
                  
                  <div id="post_card_likes">{likeCount} UpSchmoodle
                  </div>
                </div>
              </div>
            
          );
        })}
      </div>
    </>
  );
};




import { useEffect, useState } from "react";
import { getAllTopics } from "../../services/topicsService";
import "./Dropdown.css"
//add newtopicid and setter State to NP-----
//new post will pass setNewTopicId to Newpostdropdown.------
//NPDD will take as parameter, and execute its function
//newtopicId will change as NPDD does its work

//takes in setTopicId and setSearchTerm to be used down below
export const NewPostDropdownSearch = ({setNewTopicId}) => {
  const [topics, setTopics] = useState([]);
  
  useEffect(() => {
    //get list of topics
    getAllTopics().then((allTopicsArray) => {
      setTopics(allTopicsArray);

      
    });
  },[]);

  
  return (<div id="filter_container">
    <div></div>
    <div id="select_div">
      <select
        
        //on change the topic id from db is sent up to newPost as a state hook
        onChange={(event) => {
          //sets state in NewPost.js Dance Monkey Dance
            setNewTopicId(event.target.value);
          // setNewTopicId(event.target.value)
          console.log(event.target.value)
        }}
      >
        <option value="">All Topics</option>
        {topics.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.name}
          </option>
        ))}
      </select>
    </div>
    
 </div> );
};


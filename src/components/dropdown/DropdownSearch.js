import { useEffect, useState } from "react";
import { getAllTopics } from "../../services/topicsService";
import "./Dropdown.css"



//takes in setTopicId and setSearchTerm to be used down below
export const DropdownSearch = ({ setTopicId, setSearchTerm }) => {
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
        onChange={(event) => {
          setTopicId(event.target.value);
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
    <div id="search_div">
    <input
                onChange={(event) => {
                    setSearchTerm(event.target.value)

                }}
                type="text"
                placeholder="Search Posts"
                className="ticket-search"
            />
    </div>
 </div> );
};
//how will this change allPosts?
//this is supposed to make a filtered array
//how does that get back to AllPosts?

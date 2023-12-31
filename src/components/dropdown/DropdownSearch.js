import { useEffect, useState } from "react";
import { getAllTopics } from "../../services/topicsService";
import "./Dropdown.css"



//takes in setTopicId and setSearchTerm to be used down below
export const DropdownSearch = ({ setTopicId }) => {
  const [topics, setTopics] = useState([]);
  // const [newTopicId, setNewTopicId] = useState(0)
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


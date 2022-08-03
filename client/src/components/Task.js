import { useState}from 'react'
import {Container, Input, Button, Paragraph} from "../styles/Taskcss"
import axios from 'axios';

function Task() {

const[myTasks, setMyTasks] = useState("");
const[taskList, setTaskList]= useState([]);


//add button
const getData = () => {
   
    let url ="http://localhost:7676/tasks";
    axios.get(url).then((response)=>{
    setTaskList(response.data);
    });

};

const addData = () => {
    axios.post("http://localhost:7676/tasks", {
      name: myTasks
   
      
    }).then(() => {
      setTaskList([
        ...taskList,
        {
            name: myTasks
           
          
        },
      ]);
    });
  };


    const updateTask = (id) => {
        axios.put(`http://localhost:7676/tasks/${id}`, { name: myTasks, id: id }).then(
          (response) => {
            setTaskList(
              taskList.map((val) => {
                return val.id === id
                  ? {
                      id: val.id,
                      name: val.name,
                      
                    }
                  : val;
              })
            );
          }
        );
      };
 
 
  const deleteTask = (id) => {
    axios.delete(`http://localhost:7676/tasks/${id}`).then((response) => {
      setTaskList(
        taskList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

//Hey my first commit

  return (
    <Container>
   <div >
    
    Task
    
    </div>

    <Input>
    <input 
    type="text"
    onChange={(e) =>{
        setMyTasks(e.target.value);
    }}
    />
    </Input>

  
    <Button onClick={addData}>Add Task</Button>
<Button onClick={getData}>Display Todo</Button>

 <Paragraph>
 <p>Mi Tasks</p>
 </Paragraph>

     {taskList.map((val, key) => {
          return (
            <div >
              <div>{val.name}</div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setMyTasks(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateTask(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteTask(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}


    </Container>


  
  )
}

export default Task
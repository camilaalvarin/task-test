import Head from 'next/head'
import { useState, useEffect  } from 'react'
import { useRouter } from 'next/router'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { BsFillPencilFill, BsXLg } from "react-icons/bs";

import { database } from '../firebaseConfig';

export default function Home() {

  let router = useRouter()
  const databaseRef = collection(database, 'camila')
  const [fireData, setFireData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    let token = sessionStorage.getItem('Token')
    if(token){
      getData()
    }
    if(!token) {
        router.push('/register')
    }
}, [])

const addData = () => {
  if(item != '' && !tasks.includes(item)) {
    addDoc(databaseRef, {
      tasks: item
    })
    .then(() => {
      getData()
      setTasks('')
      setItem('')
    })
    } 
    
}

  const getData = async () => {
    await getDocs(databaseRef)
    .then((response) => {
      setFireData(response.docs.map((data) => {
        return {...data.data(), id: data.id}
      }))
    })
  }

  const [ID, setID] = useState(null)
  const [tasks, setTasks] = useState('')
  const [item, setItem] = useState('')

  function removeItem (taskName) {
    setTasks(tasks.filter((task) => {
      return task != taskName
      })
      .then(() => {
        alert('Data Updated')
      })
      .catch((err) => {
        console.log(err)
      })
    );
  } 

  function AddItem () {
    if(item != '' && !tasks.includes(item)) {
      let temp = tasks;
      temp.push(item)
      setTasks(temp);
      setItem('')
    } else {
      alert ('Esa tarea ya existe!')
      setItem('')
    }
  }

  const getID = (id, tasks) => {
    setID(id)
    setItem(tasks)
    setTasks(tasks)
    setIsUpdate(true)
  }

  const updateFields = () => {
    let fieldToEdit = doc(database, 'camila', ID);
    console.log(ID)
    updateDoc(fieldToEdit, {
      tasks: item
    })
    .then(() => {
      setIsUpdate(false)
      getData()
    })
    .catch((err) => {
      console.log(err)
    })
    setItem('')
  }

  const deleteDocs = (id) => {
    let fieldToEdit = doc(database, 'camila', id);
    deleteDoc(fieldToEdit)
    .then(() => {
      getData()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className='container'>
      <Head>
        <title>To do App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='navTitle'>
        <p>TODO LIST</p>
      </div>
      <div className='border'>
        <h2>TODO LIST</h2>
        <div className='flex'>
          <div className='taskList'>
            {fireData.map((data) => {
              return ( <div className='liDiv'> 
                  <div className='borderDiv'><li>{data.tasks}</li></div>
                    <div>
                      <button className='xButton' onClick={() => {
                          getID(data.id, data.tasks)
                        }}>
                        <BsFillPencilFill /> 
                      </button>
                      <button className='xButton' onClick={() => {
                          deleteDocs(data.id)
                        }}>
                        <BsXLg />
                      </button>
                </div>
              </div>)
            })}
          </div>

          <div className='newTask'>
            <div>
              <input placeholder='New Todo' value={item}
                onChange={(e) => {
                  setItem(e.target.value)
                }}
              >
              </input>
            </div> 
            <div>
              <select>
                <option>Status (Pending / In progress / Done)</option>
              </select>
            </div>
            <div className='buttonsDiv'>
              {isUpdate ? (
                <button disabled={true} className='buttons' onClick={updateFields}>ADD</button> 
              ) :
              (  
                <button className='buttons' onClick={addData}>ADD</button> 
              )}
              <br />
              {isUpdate ? (
                <button className='modifyButton buttons' onClick={updateFields}>MODIFY</button> 
              ) :
              (  
                <button className='modifyButton buttons' disabled={true} onClick={updateFields}>MODIFY</button> 
              )}
            </div>
          </div>
        </div>

      </div>
      <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap');
          .container {
            display: grid;
            justify-content: center;
          }

          .border {
            width: fit-content;
            background-color: #ffb014;
            padding: 50px;
            margin-top: 150px;
          }
          .flex {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          h2 {
            width: 200px;
            font-weight: bold;
            color: #333333;
            border-bottom: 2px solid white;
            padding-bottom: 15px;
            font-size: poppins;
          }

          .navTitle {
            position: absolute;
            width: 100%;
            padding: 10px;
            background-color: #333333;
            color: white;
            font-weight: bolder;
          }

          .navTitle p {
            margin-left: 120px;
          }
          .newTask {
            display: grid;
          }

          .taskList {
            max-width: 400px;
            max-height: 200px;
            overflow: hidden;
            overflow-y: scroll;
            margin-right: 60px;
          }

          .taskList::-webkit-scrollbar {
            width: 8px;     
            height: 8px;    
            display: none;  
        } 

          .borderDiv {
            height: fit-content;
            margin-top: 10px;
          }

          .liDiv {
            display: flex;
            justify-content: space-between;
            color: #333333;
            border-bottom: 2px solid white;
            width: 400px;
            height: 48px;
            padding-bottom: 7px;
          }

          .liDiv button{
            margin-left: 10px;
          }

          .you {
            margin-rigth: 100px;
          }

          .buttons {
            padding: 8px;
            width: 100px;
            background-color: #333333;
            color: #ffb014;
            font-weight: bolder;
            border: 1px solid #333333;
            border-radius: 3px;
            cursor: pointer;
          }

          .buttons:hover {
            cursor: pointer;
            background-color: #ffb014;
            border: 1px solid #333333;
            color: #333333;
          }

          .xButton {
            width: 20px;
            background-color: #ffb014;
            color: #333333;
            font-weight: bold;
            border: 0px;
            margin-right: 10px;
            cursor: pointer;
            font-size: 20px;
            margin-top: 4px;
          }

          input {
            background-color: #ffb014;
            border: none;
            color: #333333;
            width: 300px;
            border-bottom: 2px solid white;
            padding: 10px;
          }

          input::-webkit-input-placeholder {
            color: #333333;
        }

          *:focus {
            outline: none;
        }

          select {
            background-color: #ffb014;
            border: none;
            color: #333333;
            width: 300px;
            border-bottom: 2px solid white;
            padding: 10px;
            margin-top: 15px;
          }

          .buttonsDiv {
            display: grid;
            justify-self: end;
            margin-top: 20px;
          }

          .modifyButton {
            margin-top: -10px;
          }
          

          @media only screen and (max-width: 900px) {
            .flex {
              flex-direction: column;
            }

            .newTask {
              margin-top: 50px;
            }
          }
    `}</style>
    </div>

  )
}

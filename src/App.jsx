import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';
import Editor from './Editor';
import { data } from './data';
import { useEffect, useState } from 'react';
//  import { nanoid } from '@reduxjs/toolkit';
import Split from "react-split"
  import {nanoid} from "nanoid"

function App() {
  const [notes, setNotes]= useState(

   () =>JSON.parse(localStorage.getItem("notes")) || []
   //lazy state initialization is done so that the app component doesnt rerender
   //we are pulling from local storage.
    //initialize local storage, getting the item with the key of notes
    //localStorage.get("notes") will come back as a stringfy values
  );
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0]?.id) || ""
  )

  const currentNote = 
        notes.find(note => note.id === currentNoteId) 
        || notes[0]



  // const [state, setState] = useState(console.log("state initialization"));

  useEffect(()=>{
    localStorage.setItem("notes", JSON.stringify(notes))
    console.log(notes[0].body.split("\n"))
  },[notes])
  //i want this effect to run anytime the notearray changes. I will need the notes. notesArray
  // will be converted to a string
  function createNewNote(){
    const newNote ={
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
    setNotes(prevNotes =>[newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(text){
    // Put the most recently-modified note at the top
    setNotes(oldNotes => {
      const newArray = []

      for(let i = 0; i < oldNotes.length; i++){
        const oldNote = oldNotes[i]
        if(oldNote.id === currentNoteId){
          newArray.unshift({...oldNote, body: text})
          //oldNote and the updated text in the newArray.unshift()
        }else{
          newArray.push(oldNote)
        }
      }
      return newArray
  // Create a new empty array
            // Loop over the original array
                // if the id matches
                    // put the updated note at the 
                    // beginning of the new array
                // else
                    // push the old note to the end
                    // of the new array
            // return the new array
    }
    )
    // This does not rearrange the notes
    // setNotes(oldNotes => oldNotes.map(oldNote =>{
    //   return oldNote.id === currentNoteId
    //   ? {...oldNote, body: text}
    //   : oldNote
  }

   

    function deleteNote(event, noteId){
      event.stopPropagation()
      // console.log("deleted note", noteId)
      setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId ))
      //I want to return a new Array that results in calling
      //oldNotes.filter. 
      //For every(note) filtered must include items of each id property not equal to noteId
      //if the note.id does not equal to the one we are trying to delete then it results to true,
      //you fit delete
    }
  
  return (
    <main>
    {
        notes.length > 0 
        ?
        <Split 
            sizes={[30, 70]} 
            direction="horizontal" 
            className="split"
        >
            <Sidebar
                notes={notes}
                currentNote= {currentNote}
                setCurrentNoteId={setCurrentNoteId}
                newNote={createNewNote}
                deleteNote={deleteNote}
            />
            {
                currentNoteId && 
                notes.length > 0 &&
                <Editor 
                    currentNote={currentNote} 
                    updateNote={updateNote} 
                />
            }
        </Split>
        :
        <div className="no-notes">
            <h1>You have no notes</h1>
            <button 
                className="first-note" 
                onClick={createNewNote}
            >
                Create one now
            </button>
        </div>
        
    }
    </main>
)
};
  
  



export default App;

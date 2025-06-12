import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("/notes").then((res) => {
      setNotes(res.data);
    });
  }, []);

  function addNote(newNote) {
    axios.post("/notes", newNote).then((res) => {
      setNotes((prev) => [...prev, res.data]);
    });
  }

  function deleteNote(id) {
    axios.delete(`/notes/${id}`).then(() => {
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== id)
      );
    });
  }

  function editNote(id, updatedNote) {
    axios.put(`/notes/${id}`, updatedNote).then((res) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? res.data : note
        )
      );
    });
  }

  return (
    <div className="notes-container">
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note) => (
        <Note
          key={note._id}
          id={note._id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
          onEdit={editNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;


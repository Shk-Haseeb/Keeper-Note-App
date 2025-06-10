import React, { useState } from "react";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState({
    title: props.title,
    content: props.content
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setEditNote(prev => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    props.onEdit(props.id, editNote);
    setIsEditing(false);
  }

  return (
    <div className="note">
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={editNote.title}
            onChange={handleChange}
          />
          <textarea
            name="content"
            rows="3"
            value={editNote.content}
            onChange={handleChange}
          />
          <div className="note-buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <div className="note-buttons">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => props.onDelete(props.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Note;

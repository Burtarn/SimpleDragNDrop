import React, { useState, useRef } from 'react';
import '../styles/Todo.css';

const Todo = () => {
    const [artists, setArtists] = useState([]);
    const nextId = useRef(0);

    const handleCheckboxChange = (id) => {
        setArtists(prevArtists =>
            prevArtists.map(artist =>
                artist.id === id ? { ...artist, checked: !artist.checked } : artist
            )
        );
    };

    const handleAdd = (name) => {
        if (name.trim() === '') return; 
        setArtists([...artists, { id: nextId.current++, name, checked: false, isEditing: false }]);
    };

    const handleEditToggle = (id) => {
        setArtists(prevArtists =>
            prevArtists.map(artist =>
                artist.id === id ? { ...artist, isEditing: !artist.isEditing } : artist
            )
        );
    };

    const handleEditChange = (id, newName) => {
        setArtists(prevArtists =>
            prevArtists.map(artist =>
                artist.id === id ? { ...artist, name: newName } : artist
            )
        );
    };

    const handleBlurOrEnter = (id) => {
        setArtists(prevArtists =>
            prevArtists.map(artist =>
                artist.id === id ? { ...artist, isEditing: false } : artist
            )
        );
    };

    const handleRemove = (id) => {
        setArtists(prevArtists => prevArtists.filter(artist => artist.id !== id));
    };

    return (
        <div className="todo-container">
            <h1>Todo!</h1>
            <div className="input-container">
                <input 
                    id="add-input"
                    type="text"
                    placeholder="Lägg till en artist..."
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleAdd(e.target.value);
                            e.target.value = ''; 
                        }
                    }}
                />
                <button onClick={() => {
                    const inputElement = document.getElementById('add-input');
                    handleAdd(inputElement.value);
                    inputElement.value = '';
                }} className="add-btn">
                    Lägg till
                </button>
            </div>
            <ul className="todo-list"> 
                {artists.map(artist => (
                    <li key={artist.id} className="todo-item">
                        <input 
                            className="checkBoxBtn"
                            type="checkbox" 
                            checked={artist.checked}
                            onChange={() => handleCheckboxChange(artist.id)}
                        />
                        {artist.isEditing ? (
                            <input
                                className="edit-input"
                                type="text"
                                value={artist.name}
                                onChange={(e) => handleEditChange(artist.id, e.target.value)}
                                onBlur={() => handleBlurOrEnter(artist.id)}
                                onKeyDown={(e) => e.key === 'Enter' && handleBlurOrEnter(artist.id)}
                                autoFocus
                            />
                        ) : (
                            <span 
                                className={artist.checked ? "checked-text" : ""}
                                onDoubleClick={() => handleEditToggle(artist.id)}
                            >
                                {artist.name}
                            </span>
                        )}
                        <button className="editBtn" onClick={() => handleEditToggle(artist.id)}>Ändra</button>
                        <button className="removeBtn" onClick={() => handleRemove(artist.id)}>Ta bort</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;

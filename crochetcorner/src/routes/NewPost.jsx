import React, { useState } from 'react';
import { supabase } from '../client';
import { useParams } from 'react-router-dom';

const NewPost = () => {

    const {id} = useParams();

    const [userTitle, setUserTitle] = useState('');
    const [userContent, setUserContent] = useState('');
    const [userImages, setUserImages] = useState('');
    const [addedImages, setAddedImages] = useState([]);

    const handleTitleChange = (event) => {
        setUserTitle(event.target.value);
    }

    const handleContentChange = (event) => {
        setUserContent(event.target.value);
    }

    const handleImageChange = (event) => {
        setUserImages(event.target.value);
    }

    const AddImage = () => {
        console.log("button clicked");
        setAddedImages([...addedImages, userImages]);
    }

    const submitPost = async() => {

        await supabase.from('posts').insert({
            UserID: id,
            Title: userTitle,
            ContentText: userContent,
            imgLinks: addedImages,
            comments: []});

        
        
    }

    return (
        <>
        <h2 style={{color: 'black', textAlign:'center'}}>Create Post</h2>
        <div id="newpost-view">
            <input type="text" name="title" placeholder="Title..." onChange={handleTitleChange}id=""/>
            <br />
            <textarea name="content" placeholder="Content..." onChange={handleContentChange} id="" cols="30" rows="10"></textarea>
            <br />
            <div>
                <label htmlFor="image">Add Image Link here</label>
                <p>{addedImages}</p>
                <input type="text" name="image" id="Add Image Link here" onChange={handleImageChange} placeholder="Add image link"/>
                <button onClick={AddImage}>Add Image</button>
            </div>
            <button onClick={submitPost}>Post!</button>
        </div>
        </>
    );
};
export default NewPost;
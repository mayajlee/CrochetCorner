import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const UpdatePost = () => {
    const { id } = useParams();

    const [userTitle, setUserTitle] = useState('');
    const [userContent, setUserContent] = useState('');
    const [userImages, setUserImages] = useState('');
    const [addedImages, setAddedImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
                const { data } = await supabase
                .from('posts')
                .select('*')
                .eq('postID', id); 

            setUserTitle(data[0].Title);
            setUserContent(data[0].ContentText);
            setAddedImages(data[0].imgLinks);
        };
        fetchData();
    }, []);

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

        await supabase.from('posts').update({Title: userTitle,
            ContentText: userContent,
            imgLinks: addedImages,
            comments: []}).eq('postID', id);   
    }

    const deletePost = async() => {
        await supabase.from('posts').delete().eq('postID', id);
    }
    
    console.log("user image: " + userImages);
    console.log("added image:" + addedImages);

    return (
        <>
        <h2 style={{color: 'black', textAlign:'center'}}>Update Post</h2>
        <div id="newpost-view">
            <input type="text" name="title" placeholder={userTitle} onChange={handleTitleChange}id=""/>
            <br />
            <textarea name="content" placeholder={userContent} onChange={handleContentChange} id="" cols="30" rows="10"></textarea>
            <br />
            <div>
                <label htmlFor="image">Add Image Link here</label>
                <p>{addedImages}</p>
                <input type="text" name="image" id="Add Image Link here" onChange={handleImageChange}/>
                <button onClick={AddImage}>Add Image</button>
            </div>
            <button onClick={submitPost}>Post!</button>
            <button onClick={deletePost} id="delete-post" style={{backgroundColor: "red", margin: "10px"}}>Delete Post</button>
        </div>
        </>
    );
    };

export default UpdatePost;
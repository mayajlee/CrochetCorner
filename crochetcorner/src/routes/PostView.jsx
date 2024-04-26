import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../client';
import { useEffect, useState } from 'react';

const PostView = () => {
    //Retrieve Post ID from URL
    const { id } = useParams();

    //Retrieve Post from Database
    const [post, setPost] = useState({});
    const [postComments, setComments] = useState([]);

    //Hold comments for post
    const [userComment, setUserComment] = useState("");

    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
                const { data } = await supabase
                .from('posts')
                .select(`
                  *,
                  ImageComments (
                    comments
                  )
                `).eq('postID', id); 
            
            setPost(data[0]);

            if (data[0].comments != null) {
                setComments(data[0].comments);
            }
            else {
                setComments([]);
            }
            

        };
        fetchData();
    }, []);


   const handleInputChange = (event) => {
        setUserComment(event.target.value);
    }

    const postComment = async () => {
        postComments.push({"user": "notfunctional", "comment": userComment});
        console.log(postComments);

        await supabase.from('posts').update({comments: postComments}).eq('postID', id);

    }

    const handleUpVote = async () => {
        if (liked) {
            await supabase.from('posts').update({Upvotes: post.Upvotes - 1}).eq('postID', id);
        }
        else {
            await supabase.from('posts').update({Upvotes: post.Upvotes + 1}).eq('postID', id);
        }
        setLiked(!liked);
    }

    console.log(postComments);
    return (
        <div id='post-window'>
            <div  id='post-window-postedupdate'>
                <h4>Posted by: user{post.UserID}</h4>
                <p>{post.Upvotes} upvotes</p>
                <Link to={`/UpdatePost/${id}`}>
                    <button>UPDATE</button>
                </Link>
            </div>

            <h2>{post.Title}</h2>
            <p>{post.ContentText}</p>
            <div style={{display: "flex"}}>
            {post.imgLinks != null ? post.imgLinks.map((img, index) => {
                return (
                    <div key={index}>
                        <img src={img} alt="post image"/>
                    </div>
                );
            }): <p>No Images</p>}
            </div>

            <div id='post-window-comments'>
                <h4>Comments</h4>
                <input type="text" placeholder='Add comment' onChange={handleInputChange}/>
                <button onClick={postComment}>post</button>
                
                <button className={liked ? "liked" : "notliked"} onClick={handleUpVote}>UpVote</button>
                
                <div>
                    {postComments != null ? postComments.map((com, index) => {
                        return (
                            <div key={index}>
                                <p>{com.comment}</p>
                            </div>
                        );
                    }): <p>No Comments</p>}
                </div>
            </div>
        </div>
    );
};

export default PostView;
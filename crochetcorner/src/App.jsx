import { useEffect, useState } from 'react'
import { supabase } from './client.js'
import { Link, Outlet } from 'react-router-dom'

function App() {

  //Retrieve Posts from Database
  const [posts, setPosts] = useState([]);
  const [buttonFilter, setButtonFilter] = useState('Newest'); //['Newest', 'Most Popular'
  const [search, setSearch] = useState('');

  //Filter and Retrieve Posts
  useEffect(() => {
    if (buttonFilter === 'Newest') {
      const fetchData = async () => {
        const { data } = await supabase.from('posts').select('*').order('created_at', {ascending: false});
        setPosts(data);
      };
      fetchData();
    }
    else if (buttonFilter === 'Most Popular') {
      const fetchData = async () => {
        const { data } = await supabase.from('posts').select('*').order('Upvotes', {ascending: false});
        setPosts(data);
      };
      fetchData();
    }
  }, [buttonFilter]);

  useEffect(() => {
    if (search != '') {
      const fetchData = async () => {
        const { data } = await supabase.from('posts').select('*').ilike('Title', `%${search}%`);
        setPosts(data);
      };
      fetchData();
    }
  } , [search]);

  //handle button clicks
  const handleNewest = () => {
    setButtonFilter('Newest');
  }
  const handlePopular = () => {
    setButtonFilter('Most Popular');
  }

  //handle search
  const handleInputChange = (event) => {
    setSearch(event.target.value);
    setButtonFilter('');
  }



  console.log(posts);
  return (
    <div id='homepage'>
      <div id='sideBar'>
        <h2>Sort By</h2>

        <button onClick={handleNewest}>Newest</button>
        <br />
        <button onClick={handlePopular}>Most Popular</button>
      </div>
      <div id='rightContent'>
        <input type='text' placeholder='Search' id='postsearch' onChange={handleInputChange}/>
        <br />
        <div id='postGallery'>
          {posts.length != 0 ? posts.map((post, postIndex) => {
            return (
                <Link to={`/PostView/${post.postID}`} key={postIndex} style={{color: "black"}}>
                  <div key={postIndex} className='post' id='pg-post'>
                    <div id='pg-post-content'>
                      <p>{post.created_at}</p>
                      <h2>{post.Title}</h2>
                      <p>user{post.UserID}</p>
                    </div>
                    <p id='upvote'>{post.Upvotes} upvotes</p>
                  </div>
                </Link>
            )
          }): <h2>No Posts Yet</h2>}
        </div>
      </div>
    <Outlet />
   </div>
  )
}

export default App

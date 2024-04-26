import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import App from './App.jsx';
import Banner from './routes/Banner.jsx';
import PostView from './routes/PostView.jsx';
import NewPost from './routes/NewPost.jsx';
import UpdatePost from './routes/UpdatePost.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Banner />} >
          <Route index={true} path="/" element={<App />} />
          <Route path="/PostView/:id" element={<PostView />} />
          <Route path="/NewPost/:id" element={<NewPost />} />
          <Route path="/UpdatePost/:id" element={<UpdatePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

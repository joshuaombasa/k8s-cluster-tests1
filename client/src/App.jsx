import { useState } from 'react'

import './App.css'
import CreatePost from './components/CreatePost'
import PostsList from './components/PostsList'



function App() {
 
  return (
    <div className='container'>
     <CreatePost/>
     <PostsList/>
    </div>
  )
}

export default App

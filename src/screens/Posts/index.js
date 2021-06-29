import './index.css'
import {useEffect, useState} from 'react'
import Post from '../../components/Post'
import {Switch, Route, useRouteMatch, useLocation} from 'react-router-dom'
import PostDetails from '../../components/PostDetails'

function Posts() {

  const [posts, setPosts] = useState([])

  let match = useRouteMatch()
  let location = useLocation()
  const deletePost = (index) => {
    const tempPostList = [...posts]
    tempPostList.splice(index, 1)
    setPosts(tempPostList)
  }

  const updatePost = (index, title, body) => {
    const tempPostList = [...posts]
    const tempPost = tempPostList.slice(index, index + 1)
    tempPost[0].body = body
    tempPost[0].title = title
    tempPostList.splice(index, 1, tempPost[0])
    setPosts(tempPostList)
  }
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(res => setPosts(res))
  }, [])

  return (
    location.pathname === "/posts" || location.pathname === "/posts/" ?
    <div className="post-container">
        {posts.map((post, index) => {
          return  <Post post={post} postIndex={index}/>
          })
        }
    </div>:
    <Switch>
      <Route path={`${match.path}/:postId`}>
          <PostDetails posts={posts} deletePost={deletePost} updatePost={updatePost}/>
      </Route>
    </Switch>
    
  );
}

export default Posts
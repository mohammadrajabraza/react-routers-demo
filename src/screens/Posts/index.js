import './index.css'
import {useEffect, useState} from 'react'
import Post from '../../components/Post'
import {Switch, Route, useRouteMatch, useLocation, Redirect} from 'react-router-dom'
import PostDetails from '../../components/PostDetails'

function Posts(props) {

  const {getPosts, deletePost, updatePost, isAuthenticated} = props
  const [allPosts, setAllPosts] = useState([])
  let match = useRouteMatch()
  let location = useLocation()

  useEffect(() => {
    setAllPosts(props.getPosts)
  }, [props])


  
  return (
    isAuthenticated ?
    <div className="post-container"> 
      {location.pathname === "/posts" || location.pathname === "/posts/" ?
      allPosts.length === 0 ?
        <div>Data not available</div>:
        allPosts.map((post, index) => {
        return  <Post post={post} postIndex={index}/>
        })
      :
      <Switch>
        <Route path={`${match.path}/:postId`}>
            <PostDetails getPosts={getPosts} deletePost={deletePost} updatePost={updatePost}/>
        </Route>
      </Switch>}
    </div> :
    <Redirect to="/login"/>
  );
}

export default Posts
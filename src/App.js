import './App.css'
import { Switch, Route, Link, Redirect, useHistory, useRouteMatch } from 'react-router-dom'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Posts from './screens/Posts'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Button} from 'react-bootstrap'
import PostDetails from './components/PostDetails'

function App() {

  let history = useHistory()
  let match = useRouteMatch()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [posts, setPosts] = useState([])
  
  const getAuthenticated = () => {
    setIsAuthenticated(true)
    history.goBack()
  }

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

  const getPosts = () => posts
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(res => setPosts(res))
  }, [])
  
  return (
        <div className="App">
            <Container className="greeting-bar">
              <Row>
                <Col><Link to="/" onClick={() => history.push("/home")}>Home</Link></Col>
                <Col><Link to="/about" onClick={() => history.push("/about")}>About</Link></Col>
                <Col><Link to="/users" onClick={() => history.push("/users")}>Users</Link></Col>
                <Col><Link to="/posts" onClick={() => history.push("/posts")}>Posts</Link></Col>
                <Col md={{ span: 4, offset: 4}}>
                  {isAuthenticated && 'Welcome User, '}
                  {isAuthenticated && 
                    <Button variant="primary" type="button" onClick={() => setIsAuthenticated(false)}>Logout</Button>  
                  }
                  {!isAuthenticated && 'You are not logged in!'}
                </Col>
              </Row>
            </Container>
          <div className="body">
            <Switch>
              <Route exact path="/">
                <Home isAuthenticated={isAuthenticated}/>
              </Route>
              <Route path="/about">
                <About isAuthenticated={isAuthenticated}/>
              </Route>
              <Route path="/users">
                  <Users isAuthenticated={isAuthenticated}/>
              </Route>
              <Route path={`${match.path}/:postId`}>
                  <PostDetails getPosts={getPosts} deletePost={deletePost} updatePost={updatePost}/>
              </Route>
              <Route path="/posts">
                <Posts getPosts={getPosts} deletePost={deletePost} updatePost={updatePost} isAuthenticated={isAuthenticated}/>
              </Route>
              <Route path="/signup">
                <Signup/>
              </Route>
              <Route path="/login">
                <Login getAuthenticated={getAuthenticated} isAuthenticated={isAuthenticated}/>
              </Route>

              <Redirect to="/"/>
            </Switch>
          </div>
            
        </div>
  );
}

export default App;


function Home() {
    return <div>
      <h2>Home</h2>
    </div>
}

function About() {
    return <div>
      <h2>About</h2>
    </div>
}

function Users(props) {

  const { isAuthenticated} = props
  return isAuthenticated ?
    <div>
      <h2>Users</h2>
    </div> : 
    <Redirect to="/login" />
}
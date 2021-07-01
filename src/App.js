import './App.css'
import { Switch, Route, Link, Redirect, useHistory,
   useRouteMatch, useLocation } from 'react-router-dom'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Posts from './screens/Posts'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { Navbar, Nav, NavItem, Container, Button} from 'react-bootstrap'
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
        <Navbar bg="light" variant="light" fixed="top">
          <Container>
            <Navbar.Brand>React Routers</Navbar.Brand>
            <Nav className="mr-auto">
              <NavItem className="mr-2">
                <Link to="/" onClick={() => history.push("/home")}>Home</Link>
              </NavItem>
              <NavItem className="mr-2">
                <Link to="/about" onClick={() => history.push("/about")}>About</Link>
                </NavItem>
              <NavItem className="mr-2">
                <Link to="/users" onClick={() => history.push("/users")}>Users</Link>
                </NavItem>
              <NavItem className="mr-2">
                <Link to="/posts" onClick={() => history.push("/posts")}>Posts</Link>
                </NavItem>
            </Nav>
            <div className="inline">
            {isAuthenticated && 'Welcome User, '}
                  {isAuthenticated && 
                    <Button variant="primary" type="button" onClick={() => setIsAuthenticated(false)}>Logout</Button>  
                  }
                  {!isAuthenticated && 'You are not logged in!'}
            </div>
          </Container>
        </Navbar>
            <div className="body">
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route path="/about">
                <About/>
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
              <Route to="*">
                  <NotFound/>
              </Route>
            </Switch>
          </div>
            
        </div>
  );
}

export default App;


function Home() {
    return <div>
      <h2>Paragraph 1</h2>
      <p>
        In the Browser world, you often hear people talking about the Browser DOM and DOM Manipulation and so on. In the React world, you often hear people talking about the Virtual DOM. What exactly is the Virtual DOM and how is it different from the Browser DOM, and why do we have a Virtual DOM? Similarly, if you learn about view.js, there also, people mention about the Virtual DOM. Let's learn a little bit about virtual DOM and why is it interesting in a React application. Before we talk about Virtual DOM, let me again reiterate that the Browser DOM is a browser object. And so when you render something in your web page, the Browser DOM is built up, and so any changes that you want to make to your web page will be effected when you make changes to the Browser DOM. Now, in the React world, the React application maintains a Virtual DOM. The Virtual DOM is a React object. The Virtual DOM in React terminology is a lightweight representation of a Browser DOM. Now, since the Virtual DOM is an in-memory object in your React application, the Virtual DOM can be easily manipulated by React whenever it's required. So, manipulations are extremely fast compared to manipulating the Browser DOM. When you change anything in the Browser DOM, you need to go and re-render the web page allover again. But the Virtual DOM, since it is maintained in memory by your React application, you can easily make changes to the Virtual DOM. So, when you have any changes to the state of your components or changes to the props that a component obtains, then that may result in the component being re-rendered. So, this re-rendering is initially done to the Virtual DOM, so any changes are reflected at the Virtual DOM first. And then, after that, we will see how the Browser DOM gets manipulated. So this Virtual DOM is created completely from scratch every time you call the setState. So, you'll see that whenever you call setState, you are changing the state with a new React application, which also means that it is possible that some of the props passed into the child components to change, and so the child components may have to be re-rendered. So, in the Virtual DOM hierarchy that you build up in your React application, not all components make it affected by changes to the state of your application. So, as an example, on the left side, I show you a Virtual DOM tree here. And in that Virtual DOM, you see I have marked three components there with red red color. These three components are the ones that have been affected by a change in the state for my React application. Now, what that means is that you will have to re-render your view in the browser, that means that you will need to manipulate the Browser DOM to make the Browser DOM correspond to the changes that have been effective in the Virtual DOM. So, the React application's work is that they will do a difference between the previous version of the DOM and the current modified version of the DOM. So, to notice which parts of the Virtual DOM tree have changed, then you know which of the components need to be re-rendered. So in this case, for example, when these three red components are effected due to the change in the state, then it may result in re-rendering of all those nodes that are marked in purple to the right of the screen. So, only that part of the DOM tree may have to be re-rendered to ensure that the changes are reflected into the Browser DOM. So how is this actually done? Now, with React because React maintains the Virtual DOM which is a React object, and as we have understood, manipulating the Virtual DOM is very very fast and effective. So every time there are changes to the Virtual DOM and you are at the point of re-rendering the view in the Browser DOM, then to update the DOM, React runs in diffing algorithm. The diffing algorithm will detect all the nodes that have changed. And so, once it detects all the nodes that are changed as we have seen, the red color nodes that were marked in the tree there, this may result in updates to the entire sub-tree if the diffing detects that two elements are of different types. So, the diffing algorithm identifies the minimum number of components or minimum part of the tree that needs to be updated in order to make the modified version in sync with that Browser DOM. Then you are rendering multiple items, for example, in a list. You can use the key attribute in the list items in order to indicate which child elements are stable. Indeed, that is the reason when we rendered list, we always supply the key attribute to each list item, and each key attribute was a unique identifier for that particular item in the list. So, when the diffing algorithm works, if it notices that some parts of the list cannot change, they don't need to be re-rendered. And so, it'll re-render only those list items that have actually been modified. Now, with the React 16, there is a new version of the React diffing algorithm called React Fiber. This is a new reconciliation algorithm that has been launched with React 16 and it is a lot more faster in performing the diffing and then identifying what needs to be changed in the Browser DOM to update the views. With this quick understanding of what the React Virtual DOM is, let's move on to learn more about how to make use of the React router in this lesson.
      </p>
      <h2>Paragraph 2</h2>
      <p>
        In the Browser world, you often hear people talking about the Browser DOM and DOM Manipulation and so on. In the React world, you often hear people talking about the Virtual DOM. What exactly is the Virtual DOM and how is it different from the Browser DOM, and why do we have a Virtual DOM? Similarly, if you learn about view.js, there also, people mention about the Virtual DOM. Let's learn a little bit about virtual DOM and why is it interesting in a React application. Before we talk about Virtual DOM, let me again reiterate that the Browser DOM is a browser object. And so when you render something in your web page, the Browser DOM is built up, and so any changes that you want to make to your web page will be effected when you make changes to the Browser DOM. Now, in the React world, the React application maintains a Virtual DOM. The Virtual DOM is a React object. The Virtual DOM in React terminology is a lightweight representation of a Browser DOM. Now, since the Virtual DOM is an in-memory object in your React application, the Virtual DOM can be easily manipulated by React whenever it's required. So, manipulations are extremely fast compared to manipulating the Browser DOM. When you change anything in the Browser DOM, you need to go and re-render the web page allover again. But the Virtual DOM, since it is maintained in memory by your React application, you can easily make changes to the Virtual DOM. So, when you have any changes to the state of your components or changes to the props that a component obtains, then that may result in the component being re-rendered. So, this re-rendering is initially done to the Virtual DOM, so any changes are reflected at the Virtual DOM first. And then, after that, we will see how the Browser DOM gets manipulated. So this Virtual DOM is created completely from scratch every time you call the setState. So, you'll see that whenever you call setState, you are changing the state with a new React application, which also means that it is possible that some of the props passed into the child components to change, and so the child components may have to be re-rendered. So, in the Virtual DOM hierarchy that you build up in your React application, not all components make it affected by changes to the state of your application. So, as an example, on the left side, I show you a Virtual DOM tree here. And in that Virtual DOM, you see I have marked three components there with red red color. These three components are the ones that have been affected by a change in the state for my React application. Now, what that means is that you will have to re-render your view in the browser, that means that you will need to manipulate the Browser DOM to make the Browser DOM correspond to the changes that have been effective in the Virtual DOM. So, the React application's work is that they will do a difference between the previous version of the DOM and the current modified version of the DOM. So, to notice which parts of the Virtual DOM tree have changed, then you know which of the components need to be re-rendered. So in this case, for example, when these three red components are effected due to the change in the state, then it may result in re-rendering of all those nodes that are marked in purple to the right of the screen. So, only that part of the DOM tree may have to be re-rendered to ensure that the changes are reflected into the Browser DOM. So how is this actually done? Now, with React because React maintains the Virtual DOM which is a React object, and as we have understood, manipulating the Virtual DOM is very very fast and effective. So every time there are changes to the Virtual DOM and you are at the point of re-rendering the view in the Browser DOM, then to update the DOM, React runs in diffing algorithm. The diffing algorithm will detect all the nodes that have changed. And so, once it detects all the nodes that are changed as we have seen, the red color nodes that were marked in the tree there, this may result in updates to the entire sub-tree if the diffing detects that two elements are of different types. So, the diffing algorithm identifies the minimum number of components or minimum part of the tree that needs to be updated in order to make the modified version in sync with that Browser DOM. Then you are rendering multiple items, for example, in a list. You can use the key attribute in the list items in order to indicate which child elements are stable. Indeed, that is the reason when we rendered list, we always supply the key attribute to each list item, and each key attribute was a unique identifier for that particular item in the list. So, when the diffing algorithm works, if it notices that some parts of the list cannot change, they don't need to be re-rendered. And so, it'll re-render only those list items that have actually been modified. Now, with the React 16, there is a new version of the React diffing algorithm called React Fiber. This is a new reconciliation algorithm that has been launched with React 16 and it is a lot more faster in performing the diffing and then identifying what needs to be changed in the Browser DOM to update the views. With this quick understanding of what the React Virtual DOM is, let's move on to learn more about how to make use of the React router in this lesson.
      </p>
      <h2>Paragraph 3</h2>
      <p>
        In the Browser world, you often hear people talking about the Browser DOM and DOM Manipulation and so on. In the React world, you often hear people talking about the Virtual DOM. What exactly is the Virtual DOM and how is it different from the Browser DOM, and why do we have a Virtual DOM? Similarly, if you learn about view.js, there also, people mention about the Virtual DOM. Let's learn a little bit about virtual DOM and why is it interesting in a React application. Before we talk about Virtual DOM, let me again reiterate that the Browser DOM is a browser object. And so when you render something in your web page, the Browser DOM is built up, and so any changes that you want to make to your web page will be effected when you make changes to the Browser DOM. Now, in the React world, the React application maintains a Virtual DOM. The Virtual DOM is a React object. The Virtual DOM in React terminology is a lightweight representation of a Browser DOM. Now, since the Virtual DOM is an in-memory object in your React application, the Virtual DOM can be easily manipulated by React whenever it's required. So, manipulations are extremely fast compared to manipulating the Browser DOM. When you change anything in the Browser DOM, you need to go and re-render the web page allover again. But the Virtual DOM, since it is maintained in memory by your React application, you can easily make changes to the Virtual DOM. So, when you have any changes to the state of your components or changes to the props that a component obtains, then that may result in the component being re-rendered. So, this re-rendering is initially done to the Virtual DOM, so any changes are reflected at the Virtual DOM first. And then, after that, we will see how the Browser DOM gets manipulated. So this Virtual DOM is created completely from scratch every time you call the setState. So, you'll see that whenever you call setState, you are changing the state with a new React application, which also means that it is possible that some of the props passed into the child components to change, and so the child components may have to be re-rendered. So, in the Virtual DOM hierarchy that you build up in your React application, not all components make it affected by changes to the state of your application. So, as an example, on the left side, I show you a Virtual DOM tree here. And in that Virtual DOM, you see I have marked three components there with red red color. These three components are the ones that have been affected by a change in the state for my React application. Now, what that means is that you will have to re-render your view in the browser, that means that you will need to manipulate the Browser DOM to make the Browser DOM correspond to the changes that have been effective in the Virtual DOM. So, the React application's work is that they will do a difference between the previous version of the DOM and the current modified version of the DOM. So, to notice which parts of the Virtual DOM tree have changed, then you know which of the components need to be re-rendered. So in this case, for example, when these three red components are effected due to the change in the state, then it may result in re-rendering of all those nodes that are marked in purple to the right of the screen. So, only that part of the DOM tree may have to be re-rendered to ensure that the changes are reflected into the Browser DOM. So how is this actually done? Now, with React because React maintains the Virtual DOM which is a React object, and as we have understood, manipulating the Virtual DOM is very very fast and effective. So every time there are changes to the Virtual DOM and you are at the point of re-rendering the view in the Browser DOM, then to update the DOM, React runs in diffing algorithm. The diffing algorithm will detect all the nodes that have changed. And so, once it detects all the nodes that are changed as we have seen, the red color nodes that were marked in the tree there, this may result in updates to the entire sub-tree if the diffing detects that two elements are of different types. So, the diffing algorithm identifies the minimum number of components or minimum part of the tree that needs to be updated in order to make the modified version in sync with that Browser DOM. Then you are rendering multiple items, for example, in a list. You can use the key attribute in the list items in order to indicate which child elements are stable. Indeed, that is the reason when we rendered list, we always supply the key attribute to each list item, and each key attribute was a unique identifier for that particular item in the list. So, when the diffing algorithm works, if it notices that some parts of the list cannot change, they don't need to be re-rendered. And so, it'll re-render only those list items that have actually been modified. Now, with the React 16, there is a new version of the React diffing algorithm called React Fiber. This is a new reconciliation algorithm that has been launched with React 16 and it is a lot more faster in performing the diffing and then identifying what needs to be changed in the Browser DOM to update the views. With this quick understanding of what the React Virtual DOM is, let's move on to learn more about how to make use of the React router in this lesson.
      </p>
      <h2>Paragraph 4</h2>
      <p>
        In the Browser world, you often hear people talking about the Browser DOM and DOM Manipulation and so on. In the React world, you often hear people talking about the Virtual DOM. What exactly is the Virtual DOM and how is it different from the Browser DOM, and why do we have a Virtual DOM? Similarly, if you learn about view.js, there also, people mention about the Virtual DOM. Let's learn a little bit about virtual DOM and why is it interesting in a React application. Before we talk about Virtual DOM, let me again reiterate that the Browser DOM is a browser object. And so when you render something in your web page, the Browser DOM is built up, and so any changes that you want to make to your web page will be effected when you make changes to the Browser DOM. Now, in the React world, the React application maintains a Virtual DOM. The Virtual DOM is a React object. The Virtual DOM in React terminology is a lightweight representation of a Browser DOM. Now, since the Virtual DOM is an in-memory object in your React application, the Virtual DOM can be easily manipulated by React whenever it's required. So, manipulations are extremely fast compared to manipulating the Browser DOM. When you change anything in the Browser DOM, you need to go and re-render the web page allover again. But the Virtual DOM, since it is maintained in memory by your React application, you can easily make changes to the Virtual DOM. So, when you have any changes to the state of your components or changes to the props that a component obtains, then that may result in the component being re-rendered. So, this re-rendering is initially done to the Virtual DOM, so any changes are reflected at the Virtual DOM first. And then, after that, we will see how the Browser DOM gets manipulated. So this Virtual DOM is created completely from scratch every time you call the setState. So, you'll see that whenever you call setState, you are changing the state with a new React application, which also means that it is possible that some of the props passed into the child components to change, and so the child components may have to be re-rendered. So, in the Virtual DOM hierarchy that you build up in your React application, not all components make it affected by changes to the state of your application. So, as an example, on the left side, I show you a Virtual DOM tree here. And in that Virtual DOM, you see I have marked three components there with red red color. These three components are the ones that have been affected by a change in the state for my React application. Now, what that means is that you will have to re-render your view in the browser, that means that you will need to manipulate the Browser DOM to make the Browser DOM correspond to the changes that have been effective in the Virtual DOM. So, the React application's work is that they will do a difference between the previous version of the DOM and the current modified version of the DOM. So, to notice which parts of the Virtual DOM tree have changed, then you know which of the components need to be re-rendered. So in this case, for example, when these three red components are effected due to the change in the state, then it may result in re-rendering of all those nodes that are marked in purple to the right of the screen. So, only that part of the DOM tree may have to be re-rendered to ensure that the changes are reflected into the Browser DOM. So how is this actually done? Now, with React because React maintains the Virtual DOM which is a React object, and as we have understood, manipulating the Virtual DOM is very very fast and effective. So every time there are changes to the Virtual DOM and you are at the point of re-rendering the view in the Browser DOM, then to update the DOM, React runs in diffing algorithm. The diffing algorithm will detect all the nodes that have changed. And so, once it detects all the nodes that are changed as we have seen, the red color nodes that were marked in the tree there, this may result in updates to the entire sub-tree if the diffing detects that two elements are of different types. So, the diffing algorithm identifies the minimum number of components or minimum part of the tree that needs to be updated in order to make the modified version in sync with that Browser DOM. Then you are rendering multiple items, for example, in a list. You can use the key attribute in the list items in order to indicate which child elements are stable. Indeed, that is the reason when we rendered list, we always supply the key attribute to each list item, and each key attribute was a unique identifier for that particular item in the list. So, when the diffing algorithm works, if it notices that some parts of the list cannot change, they don't need to be re-rendered. And so, it'll re-render only those list items that have actually been modified. Now, with the React 16, there is a new version of the React diffing algorithm called React Fiber. This is a new reconciliation algorithm that has been launched with React 16 and it is a lot more faster in performing the diffing and then identifying what needs to be changed in the Browser DOM to update the views. With this quick understanding of what the React Virtual DOM is, let's move on to learn more about how to make use of the React router in this lesson.
      </p>
      <h2>Paragraph 4</h2>
      <p>
        In the Browser world, you often hear people talking about the Browser DOM and DOM Manipulation and so on. In the React world, you often hear people talking about the Virtual DOM. What exactly is the Virtual DOM and how is it different from the Browser DOM, and why do we have a Virtual DOM? Similarly, if you learn about view.js, there also, people mention about the Virtual DOM. Let's learn a little bit about virtual DOM and why is it interesting in a React application. Before we talk about Virtual DOM, let me again reiterate that the Browser DOM is a browser object. And so when you render something in your web page, the Browser DOM is built up, and so any changes that you want to make to your web page will be effected when you make changes to the Browser DOM. Now, in the React world, the React application maintains a Virtual DOM. The Virtual DOM is a React object. The Virtual DOM in React terminology is a lightweight representation of a Browser DOM. Now, since the Virtual DOM is an in-memory object in your React application, the Virtual DOM can be easily manipulated by React whenever it's required. So, manipulations are extremely fast compared to manipulating the Browser DOM. When you change anything in the Browser DOM, you need to go and re-render the web page allover again. But the Virtual DOM, since it is maintained in memory by your React application, you can easily make changes to the Virtual DOM. So, when you have any changes to the state of your components or changes to the props that a component obtains, then that may result in the component being re-rendered. So, this re-rendering is initially done to the Virtual DOM, so any changes are reflected at the Virtual DOM first. And then, after that, we will see how the Browser DOM gets manipulated. So this Virtual DOM is created completely from scratch every time you call the setState. So, you'll see that whenever you call setState, you are changing the state with a new React application, which also means that it is possible that some of the props passed into the child components to change, and so the child components may have to be re-rendered. So, in the Virtual DOM hierarchy that you build up in your React application, not all components make it affected by changes to the state of your application. So, as an example, on the left side, I show you a Virtual DOM tree here. And in that Virtual DOM, you see I have marked three components there with red red color. These three components are the ones that have been affected by a change in the state for my React application. Now, what that means is that you will have to re-render your view in the browser, that means that you will need to manipulate the Browser DOM to make the Browser DOM correspond to the changes that have been effective in the Virtual DOM. So, the React application's work is that they will do a difference between the previous version of the DOM and the current modified version of the DOM. So, to notice which parts of the Virtual DOM tree have changed, then you know which of the components need to be re-rendered. So in this case, for example, when these three red components are effected due to the change in the state, then it may result in re-rendering of all those nodes that are marked in purple to the right of the screen. So, only that part of the DOM tree may have to be re-rendered to ensure that the changes are reflected into the Browser DOM. So how is this actually done? Now, with React because React maintains the Virtual DOM which is a React object, and as we have understood, manipulating the Virtual DOM is very very fast and effective. So every time there are changes to the Virtual DOM and you are at the point of re-rendering the view in the Browser DOM, then to update the DOM, React runs in diffing algorithm. The diffing algorithm will detect all the nodes that have changed. And so, once it detects all the nodes that are changed as we have seen, the red color nodes that were marked in the tree there, this may result in updates to the entire sub-tree if the diffing detects that two elements are of different types. So, the diffing algorithm identifies the minimum number of components or minimum part of the tree that needs to be updated in order to make the modified version in sync with that Browser DOM. Then you are rendering multiple items, for example, in a list. You can use the key attribute in the list items in order to indicate which child elements are stable. Indeed, that is the reason when we rendered list, we always supply the key attribute to each list item, and each key attribute was a unique identifier for that particular item in the list. So, when the diffing algorithm works, if it notices that some parts of the list cannot change, they don't need to be re-rendered. And so, it'll re-render only those list items that have actually been modified. Now, with the React 16, there is a new version of the React diffing algorithm called React Fiber. This is a new reconciliation algorithm that has been launched with React 16 and it is a lot more faster in performing the diffing and then identifying what needs to be changed in the Browser DOM to update the views. With this quick understanding of what the React Virtual DOM is, let's move on to learn more about how to make use of the React router in this lesson.
      </p>
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

function NotFound() {

  const {pathname} = useLocation()
  return <div>
    <h2>404! Not Found</h2>
    <p>{`The path: ${pathname} you are interested is not available!`}</p>
  </div>
}
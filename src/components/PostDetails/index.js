import { useState, useEffect} from 'react'
import './index.css'
import { Container, Row, Col, Button} from 'react-bootstrap'
import {useParams, Redirect} from 'react-router-dom'


function PostDetails(props) {

    const [updateMode, setUpdateMode] = useState(false)
    const [updatedPostTitle, setUpdatedPostTitle] = useState()
    const [updatedPostBody, setUpdatedPostBody] = useState() 
    const [posts, setPosts] = useState([])
    const [currentPostIndex, setCurrentPostIndex] = useState(-2)

    const {updatePost, deletePost} = props
    const {postId} = useParams()


    useEffect(() => {
        setPosts(props.getPosts())
    }, [props])

    useEffect(() => {
        if(posts.length > 0){
            setCurrentPostIndex(posts.findIndex((post) => post.id === parseInt(postId) ))
        }        
    },[posts, postId])

    console.log(posts)
    return (
        posts.length > 0 && currentPostIndex !== -2 && currentPostIndex !== -1?
    <Container className="post">
        <Row className="header justify-content-center">
            <Col lg="auto">
                {updateMode ? 
                    <textarea cols="100" rows="2" value={updatedPostTitle}
                    onChange = { e => setUpdatedPostTitle(e.target.value)} /> :
                    <h1> {`${currentPostIndex+1}. ${posts[currentPostIndex].title}`} </h1>
                }
            </Col>
        </Row>
        <Row className="body">
            <Col>
                {
                    updateMode && 
                    <textarea  cols="100" rows="5" value={updatedPostBody}
                        onChange = { e => setUpdatedPostBody(e.target.value)} />
                }
                {
                    updateMode && 
                    <Button onClick={() => {
                        updatePost(currentPostIndex, updatedPostTitle, updatedPostBody)
                        setUpdateMode(false)
                        }
                    }>Update</Button>
                }
        
                {
                    updateMode || 
                    <p> {posts[currentPostIndex].body} </p>
                }
            </Col>
        </Row>
        <Row className="footer">
            <Col lg={{ span: 6, offset: 6}}>
                { 
                    updateMode || 
                    <Button onClick={() => {
                        setUpdatedPostBody(posts[currentPostIndex].body)
                        setUpdatedPostTitle(posts[currentPostIndex].title)
                        setUpdateMode(true)
                        }
                    }>Edit</Button> 
                }
                { 
                    updateMode || 
                    <Button className="ml-2" variant="danger" onClick={() => deletePost(currentPostIndex)}>Delete</Button> 
                }
            </Col>
        </Row>
    </Container>:
    (currentPostIndex === -1 ?
        <Redirect to="/posts"/>:
        <div>No data available</div>)
    
    )
}

export default PostDetails
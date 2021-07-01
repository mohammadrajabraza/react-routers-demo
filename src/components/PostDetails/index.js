import { useState, useEffect} from 'react'
import './index.css'
import { Card, Row, Col, Button} from 'react-bootstrap'
import {useParams, Redirect} from 'react-router-dom'
import PostUpdateForm from '../PostUpdateForm'


function PostDetails(props) {

    const [updateMode, setUpdateMode] = useState(false)
    const [posts, setPosts] = useState([])
    const [postIndex, setCurrentPostIndex] = useState(-2)

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

    return (
        posts.length > 0 && postIndex !== -2 && postIndex !== -1 ?
        
    ( updateMode    ?
        <PostUpdateForm updatePost={updatePost} setUpdateMode={setUpdateMode} 
            postIndex={postIndex} title={posts[postIndex].title}
                body={posts[postIndex].body}
            />   :
        <Card className="post"  style={{ width: 'auto' }}>
            <Card.Header className="header justify-content-center">Post</Card.Header>
            <Card.Body className="body">
                <Card.Title>{posts[postIndex].title}</Card.Title>
                <Card.Text>{posts[postIndex].body}</Card.Text>
                <Row className="footer">
                    <Col>
                        <Button onClick = { () => setUpdateMode(true) } >Edit</Button> 
                        <Button className ="ml-2" variant="danger" onClick = { () => deletePost(postIndex) } >Delete</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        // <Container className="post">
        //     <Row className="header justify-content-center">
        //         <Col lg="auto">
        //                 <h1> {posts[postIndex].title} </h1>
        //         </Col>
        //     </Row>
        //     <Row className="body">
        //         <Col>
        //                 <p> {posts[postIndex].body} </p>
        //         </Col>
        //     </Row>
        //     <Row className="footer">
        //         <Col lg={{ span: 6, offset: 6}}>
        //                 <Button onClick={() => {
        //                     setUpdateMode(true)
        //                     }
        //                 }>Edit</Button> 
        //                 <Button className="ml-2" variant="danger" onClick={() => deletePost(postIndex)}>Delete</Button>
        //         </Col>
        //     </Row>
        // </Container>
    )   :
    (postIndex === -1 ?
        <Redirect to="/posts"/> :
        <div>No data available</div>
    )
    
    )
}

export default PostDetails
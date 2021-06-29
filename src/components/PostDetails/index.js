import { useState } from 'react'
import './index.css'
import { Container, Row, Col, Button} from 'react-bootstrap'
import {useParams} from 'react-router-dom'


function PostDetails(props) {

    const [updateMode, setUpdateMode] = useState(false)
    const [updatedPostTitle, setUpdatedPostTitle] = useState()
    const [updatedPostBody, setUpdatedPostBody] = useState() 

    const { posts, updatePost, deletePost} = props
    const {postId} = useParams()
    let postIndex = posts.findIndex((post) => post.id === parseInt(postId) )
    let {title, body} = posts[postIndex]

    return <Container className="post">
        <Row className="header justify-content-center">
            <Col lg="auto">
                {updateMode ? 
                    <textarea cols="100" rows="2" value={updatedPostTitle}
                    onChange = { e => setUpdatedPostTitle(e.target.value)} /> :
                    <h1> {`${postIndex+1}. ${title}`} </h1>
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
                        updatePost(postIndex, updatedPostTitle, updatedPostBody)
                        setUpdateMode(false)
                        }
                    }>Update</Button>
                }
        
                {
                    updateMode || 
                    <p> {body} </p>
                }
            </Col>
        </Row>
        <Row className="footer">
            <Col lg={{ span: 6, offset: 6}}>
                { 
                    updateMode || 
                    <Button onClick={() => {
                        setUpdatedPostBody(body)
                        setUpdatedPostTitle(title)
                        setUpdateMode(true)
                        }
                    }>Edit</Button> 
                }
                { 
                    updateMode || 
                    <Button className="ml-2" variant="danger" onClick={() => deletePost(postIndex)}>Delete</Button> 
                }
            </Col>
        </Row>
    </Container>
}

export default PostDetails
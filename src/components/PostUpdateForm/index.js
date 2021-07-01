import { Form, Button} from 'react-bootstrap'
import { useEffect, useState} from 'react'

function PostUpdateForm(props) {

    const {updatePost, setUpdateMode, postIndex} = props
    const [updatedPostTitle, setUpdatedPostTitle] = useState()
    const [updatedPostBody, setUpdatedPostBody] = useState() 

    useEffect(() => {
        setUpdatedPostBody(props.body)
        setUpdatedPostTitle(props.title)
    }, [props])

    return (
        <Form>
            <Form.Group controlId="formPostTitle">
                <Form.Label>Post Title</Form.Label>
                <Form.Control as="textarea" rows={2} value={updatedPostTitle} 
                    onChange = { e => setUpdatedPostTitle(e.target.value)}
                />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formPostBody">
                <Form.Label>Post Body</Form.Label>
                <Form.Control as="textarea" rows={3} value={updatedPostBody}
                    onChange = { e => setUpdatedPostBody(e.target.value)}
                />
            </Form.Group>
            <Button onClick={() => {
                        updatePost(postIndex, updatedPostTitle, updatedPostBody)
                        setUpdateMode(false)
                        }
                    }>Update</Button>
        </Form>
    )
}

export default PostUpdateForm
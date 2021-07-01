import './index.css'
import {Row, Col, Button, Card} from 'react-bootstrap'
import {Link, useRouteMatch} from 'react-router-dom'


function Post(props) {

    const { post : {title, id}, postIndex} = props
    let match = useRouteMatch()
    return (
        <Card className="post"  style={{ width: 'auto' }}>
            <Card.Header className="header">{`Post ${postIndex + 1}`}</Card.Header>
            <Card.Body >
                <Card.Title>{title}</Card.Title>
                <Row className="footer">
                <Col className="col">
                    <Link to={`${match.url}/${id}`}>
                        <Button className="ml-2" variant="success">Detail</Button> 
                    </Link>
                </Col>
            </Row>
            </Card.Body>
        </Card>
    )
}
export default Post
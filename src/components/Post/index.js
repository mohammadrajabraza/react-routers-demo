import './index.css'
import { Container, Row, Col, Button} from 'react-bootstrap'
import {Link, useRouteMatch, useHistory} from 'react-router-dom'


function Post(props) {

    const { post : {title, id}, postIndex} = props
    let match = useRouteMatch();
    let history = useHistory()

    let handlePostDetailsButtonCLick = (id) => {
        history.push(`/${id}`)
    }


    return <> 
                <Container className="post">
                    <Row className="header justify-content-center">
                        <Col lg="auto">
                            <h1> {`${postIndex+1}. ${title}`} </h1>
                        </Col>
                    </Row>
                    <Row className="footer">
                        <Col lg={{ span: 2, offset: 10}}>
                            <Link to={`${match.url}/${id}`}>
                                <Button className="ml-2" variant="success">Details</Button> 
                            </Link>
                        </Col>
                    </Row>
                </Container>

    </>
}
export default Post
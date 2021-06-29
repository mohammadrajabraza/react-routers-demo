import './index.css'
import { Container, Row, Col, Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
function Signup() {
    return <div className="auth-container">
                <Container>
                    <Form>
                    <h1 > Sign Up</h1>
                        <Form.Group controlId="formBasicUsername" >
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Row>
                            <Col className="text-right">
                                <Link  to="/login">Already Registered? Login here</Link>
                            </Col>
                        </Row>
                        <Button variant="primary" type="button">
                            Sign Up
                        </Button>
                    </Form>
                </Container>
            </div> 
    }

export default Signup
import React, {useRef, useState} from 'react';
import { Form, Button, Card} from 'react-bootstrap';
import {useAuth} from './Contexts/Authcontext';
import {Link, useNavigate} from 'react-router-dom'

export default function Login() {
    const emailRef =useRef();
    const passwordRef =useRef();
    const {login} = useAuth(); 
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();

        try { 
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value);
            navigate.push('/home')
        } catch {
            setError('Failed to login')
        }

        setLoading(false);
        
    }

    return (
        <>
            <Card> 
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    <Form onSubmit={handleSubmit} > 
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label> 
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label> 
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        
                        <Button disabled={loading} className="register-button" type="submit">Log In</Button>
                    </Form>
                </Card.Body>
                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to="/register">Register</Link>
                    </div>
            </Card>
        </>
    )
}
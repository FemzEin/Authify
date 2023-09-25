import { Container, Card, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'> A MERN Authentication Solution </h1>
          <p className='text-center mb-4'>
          Have you ever wondered how web applications authenticate their users? How do 
they ensure that only authorized users can access certain features or pages? 
These are some of the questions that motivated me to try to recreate a 
comprehensive authentication application built using the MERN stack 
(MongoDB, Express.js, React, Node.js). This project is named Authify and 
aims to create a secure, customizable, and scalable authentication system 
that can be integrated into various web applications in future projects.
          </p>
          <div className='d-flex'>
            <Button variant='primary' href='/login' className='me-3'>
              Log In
            </Button>
            <Button variant='secondary' href='/register'>
              Register
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;

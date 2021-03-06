import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Button, Divider } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' size='huge' inverted>
                    Parkedex
                </Header>
                <Header as='h2' size='medium' style={{marginTop: 10}} inverted>
                    Gotta Visit 'Em All!
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to Parkedex' />
                        <Button as={Link} to='/parks' size='huge' inverted>
                            Go to the Parks!
                        </Button>
                    </>
                ) : (
                        <>
                            <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                                Login
                            </Button>
                            <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                                Register
                            </Button>
                            <Divider></Divider>
                            <Header as={Link} to='/parks' size='tiny' inverted>
                                I just want National Park Info!
                            </Header>
                        </>
                    )}
            </Container>
        </Segment>
    )
})
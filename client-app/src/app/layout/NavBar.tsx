import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Dropdown, Icon, Menu } from 'semantic-ui-react';
import LoginForm from '../../features/users/LoginForm';
import RegisterForm from '../../features/users/RegisterForm';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    const { userStore: {user, logout, isLoggedIn}, modalStore } = useStore();

    return(
        <Menu borderless fixed='top'>
            <Container>
                <Menu.Item header as={Link} to={'/parks'}>
                    <Icon name='tree' />
                    Parkedex
                </Menu.Item>
                {isLoggedIn ? (
                    <>
                        <Menu.Item position='right'>
                            <Dropdown position='right' pointing='top left' text={user!.displayName}>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} 
                                        text='My Profile' icon='user' />
                                    <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    </>
                ) : (
                    <>
                        <Menu.Item onClick={() => modalStore.openModal(<LoginForm />)} name='Login' position='right' /> 
                        <Menu.Item onClick={() => modalStore.openModal(<RegisterForm />)} name='Register' /> 
                    </>
                )}
            </Container>
        </Menu>
    )
})
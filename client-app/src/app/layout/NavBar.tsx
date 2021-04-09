import React from 'react';
import { Container, Icon, Menu } from 'semantic-ui-react';

export default function NavBar() {
    return (
        <Menu borderless fixed='top'>
            <Container>
                <Menu.Item header>
                    <Icon name='tree' />
                    Parkedex
                </Menu.Item>
                <Menu.Item name='Parks' />
                <Menu.Item position='right'>
                    <Icon name='user'/>
                    Login
                </Menu.Item>
            </Container>
        </Menu>
    )
}
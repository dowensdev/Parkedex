import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid, Header, Item, Segment } from 'semantic-ui-react';
import { User } from '../../app/models/user';

interface Props {
    user: User;
}

export default observer(function ProfileHeader({user}: Props) {
    
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content={user.displayName} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    
                </Grid.Column>
            </Grid>
        </Segment>
    )
})
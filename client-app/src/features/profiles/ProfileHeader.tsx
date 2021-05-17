import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid, Header, Item, Segment, Statistic } from 'semantic-ui-react';
import { User } from '../../app/models/user';
import { useStore } from '../../app/stores/store';

interface Props {
    user: User;
}

export default observer(function ProfileHeader({user}: Props) {
    const {userStore} = useStore();
    const {allVisited} = userStore;

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
                    <Statistic>
                        <Statistic.Value>{allVisited.length}</Statistic.Value>
                        <Statistic.Label>Parks Visited</Statistic.Label>
                    </Statistic>
                </Grid.Column>
            </Grid>
        </Segment>
    )
})
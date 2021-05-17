import React, { Fragment } from 'react';
import { Segment, Button, Placeholder, Item, PlaceholderLine } from 'semantic-ui-react';

export default function ParkItemPlaceholder() {
    return (
        <Fragment >
            <Placeholder fluid style={{marginTop: 10}}>
                <Segment.Group >
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Content>
                                    <Placeholder fluid>
                                        <Placeholder.Line length='medium' />
                                        <Placeholder.Image fluid style={{ minHeight: 400, marginBottom: 10 }}></Placeholder.Image>
                                    </Placeholder>
                                    <Item.Description>
                                        <Placeholder fluid>
                                            <Placeholder.Line length='full'/>
                                            <Placeholder.Line length='full'/>
                                            <Placeholder.Line length='full'/>
                                            <Placeholder.Line length='full'/>
                                        </Placeholder>
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                    <Segment secondary clearing style={{ minHeight: 50 }}>
                        <Placeholder fluid>             
                            <Placeholder.Line length='medium'/>
                            <Placeholder.Line />
                        </Placeholder>
                    </Segment>
                    <Segment clearing>
                        <Button disabled color='grey' floated='right' icon='x' content='Not Visited' />
                    </Segment>
                </Segment.Group>
            </Placeholder>
        </Fragment>
    );
};
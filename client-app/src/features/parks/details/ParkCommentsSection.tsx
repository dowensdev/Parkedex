import { Field, FieldProps, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import {Segment, Header, Comment, TextArea, Loader} from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { formatDistanceToNow } from 'date-fns';

interface Props {
    parkId: string;
}

export default observer(function ParkCommentsSection({parkId}: Props) {
    const {parkCommentStore} = useStore();

    useEffect(() => {
        if(parkId) {
            parkCommentStore.createHubConnection(parkId);
        }
        return () => {
            parkCommentStore.clearComments();
        }
    }, [parkCommentStore, parkId]);

    return (
        <>
            <Segment
                textAlign='left'
                attached='top'
                inverted
                color='grey'
                style={{border: 'none'}}
            >
                <Header>Comments</Header>
            </Segment>
            <Segment attached clearing>
                <Formik 
                    onSubmit={(values, {resetForm}) => parkCommentStore.addComment(values).then(() => resetForm())}
                    initialValues={{body:''}}
                    validationSchema={Yup.object({
                        body: Yup.string().required()
                    })}
                >
                    {({isSubmitting, isValid, handleSubmit}) => (
                        <Form className='ui form'>
                            <Field name='body'>
                                {(props: FieldProps) => (
                                    <div style={{position: 'relative'}}>
                                        <Loader active={isSubmitting} />
                                        <textarea
                                        placeholder='Enter your comment (Enter to submit, SHIFT + enter for new line)'
                                        rows={2}
                                        {...props.field}
                                        onKeyPress={e => {
                                            if (e.key === 'Enter' && e.shiftKey) {
                                                return;
                                            }
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                isValid && handleSubmit();
                                            }
                                        }}
                                    />
                                    </div>
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik>
                <Comment.Group>
                    {parkCommentStore.comments.map(comment => (
                        <Comment key={comment.id}>
                        <Comment.Content>
                            <Comment.Author>{comment.displayName}</Comment.Author>
                            <Comment.Metadata>
                                <div>{formatDistanceToNow(comment.createdAt)}</div>
                            </Comment.Metadata>
                            <Comment.Text>{comment.body}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                    ))}
                </Comment.Group>
            </Segment>
        </>
    )
})
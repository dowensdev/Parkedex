import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import AppTextInput from '../../app/common/form/AppTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup'
import ValidationErrors from '../errors/ValidationErrors';


export default observer(function RegisterForm() {
    const {userStore} = useStore();

    return(
        <Formik
                initialValues={{displayName: '', username: '', email: '', password: '', error: null}}
                onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => 
                    setErrors({error}))}   
                validationSchema={Yup.object({
                    displayName: Yup.string().required(),
                    username: Yup.string().required(),
                    email: Yup.string().required().email(),
                    password: Yup.string().required(),
                })}

        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off' >
                    <Header as='h2' content='Register at Parkedex' textAlign='center' />
                    <AppTextInput name='displayName' placeholder='Display Name' />
                    <AppTextInput name='username' placeholder='Username' />
                    <AppTextInput name='email' placeholder='Email' />
                    <AppTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage
                        name='error' render={() => <ValidationErrors errors={errors.error}/>}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Register' type='submit' fluid />
                </Form>
            )}
            
        </Formik>
    )
})
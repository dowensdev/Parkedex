import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { VisitLogFormValues } from '../../../app/models/visitLog';
import { Park } from '../../../app/models/park';
import AppDateInput from '../../../app/common/form/AppDateInput';
import AppTextInput from '../../../app/common/form/AppTextInput';
import AppTextArea from '../../../app/common/form/AppTextArea';

interface Props {
    park: Park;
    logId: string;
}

export default observer(function VisitLogForm({park, logId}: Props) {
    const { visitLogStore, modalStore } = useStore();
    const { createVisitLog, editVisitLog, loadVisitLog } = visitLogStore;

    const [visitLog, setVisitLog] = useState<VisitLogFormValues>(new VisitLogFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('The visit title is required'),
        startDate: Yup.date().required('The start date is required'),
        endDate: Yup.date().min(Yup.ref('startDate'), "End date can not be before Start date"),
    });

    useEffect(() => {
        if (logId !== 'create') loadVisitLog(logId).then(visitLog => setVisitLog(new VisitLogFormValues(visitLog)))
    }, [loadVisitLog, logId]);

    function handleFormSubmit(visitLog: VisitLogFormValues) {
        if (!visitLog.id) {
            let newVisitLog = {
                ...visitLog,
                id: uuid(),
                parkRef: park.id,
                parkName: park.fullName
            };
            //Need park id here
            createVisitLog(park.id, newVisitLog)
                .finally(() => modalStore.closeModal());
        } else {
            editVisitLog(visitLog)
                .finally(() => modalStore.closeModal());
        }
    }

    return (
        <Segment clearing>
            <Header content='Visit Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={visitLog} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <AppTextInput name='title' placeholder='Title' />
                        <Header content='Visit Dates' sub color='teal' />
                        <AppDateInput 
                            placeholderText='Start Date'  
                            name='startDate' 
                            showFullMonthYearPicker
                            dateFormat='MMMM d, yyyy'
                        />
                        <AppDateInput 
                            placeholderText='End Date'  
                            name='endDate' 
                            showFullMonthYearPicker
                            dateFormat='MMMM d, yyyy'
                        />
                        <AppTextArea rows={5} placeholder='Notes' name='notes' />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} floated='right' 
                            positive type='submit' content='Submit' />
                        <Button as={Link} to='/parks' onClick={() => modalStore.closeModal()} floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})
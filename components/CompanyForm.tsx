import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import Select, { MultiValue } from 'react-select';
import { toast} from 'react-toastify';
import * as Yup from 'yup';

interface User {
    _id: string;
    name: string;
}

interface CompanyFormValues {
    name: string;
    address: string;
    users: string[];
}

interface SelectOption {
    value: string;
    label: string;
}

interface CompanyFormProps {
    initialValues: CompanyFormValues;
    onSubmit: (values: CompanyFormValues) => Promise<void>;
    isLoading: boolean;
    users: User[];
}

const CompanyForm: React.FC<CompanyFormProps> = ({ initialValues, onSubmit, isLoading, users }) => {
    const [isClient, setIsClient] = useState(false);


    useEffect(() => {
        setIsClient(true);
    }, []);


    const usersOptions: SelectOption[] = users.map((user) => ({
        value: user._id,
        label: user.name,
    }));

    if (!isClient) {
        return null;
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters').max(50, 'Name can be up to 50 characters'),
                address: Yup.string().required('Address is required').min(5, 'Address is too short').max(100, 'Address is too long'),
                users: Yup.array().min(1, 'At least one user is required').required('At least one user is required'),
            })}
            onSubmit={async (values, { resetForm }) => {
                try {
                    await onSubmit(values);
                    resetForm();
                    toast.success('Form submitted successfully!');
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                    toast.error('Submission failed, please try again');
                }
            }}
        >
            {({ setFieldValue, values, touched, errors }) => (
                <Form className="space-y-6">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-lg font-semibold text-gray-700">
                            Name
                        </label>
                        <Field
                            type="text"
                            name="name"
                            id="name"
                            className="input-field"
                            placeholder="Enter your name"
                        />
                        {touched.name && errors.name && (
                            <div className="text-red-500 text-sm">{errors.name}</div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="address" className="text-lg font-semibold text-gray-700">
                            Address
                        </label>
                        <Field
                            type="text"
                            name="address"
                            id="address"
                            className="input-field"
                            placeholder="Enter a company address"
                        />
                        {touched.address && errors.address && (
                            <div className="text-red-500 text-sm">{errors.address}</div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="users" className="text-lg font-semibold text-gray-700">
                            Select User
                        </label>
                        <Select
                            isMulti
                            options={usersOptions}
                            value={usersOptions.filter((option) =>
                                values.users.includes(option.label)
                            )}
                            onChange={(newValue: MultiValue<SelectOption>) => {
                                const selectedValues = newValue.map(
                                    (option) => option.label
                                );
                                setFieldValue('users', selectedValues);
                            }}
                            placeholder="Select users"
                            classNamePrefix="react-select"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    padding: '0.5rem',
                                }),
                                option: (base) => ({
                                    ...base,
                                    padding: '0.75rem',
                                }),
                            }}
                        />
                        {touched.users && errors.users && (
                            <div className="text-red-500 text-sm">{errors.users}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default CompanyForm;
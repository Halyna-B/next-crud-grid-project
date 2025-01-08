import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import Select, { MultiValue } from 'react-select';
import * as Yup from 'yup';

interface Company {
    _id: string;
    name: string;
}

interface UserFormValues {
    name: string;
    email: string;
    companies: string[];
}

interface SelectOption {
    value: string;
    label: string;
}

interface UserFormProps {
    initialValues: UserFormValues;
    onSubmit: (values: UserFormValues) => Promise<void>;
    isLoading: boolean;
    companies: Company[];
}

const UserForm: React.FC<UserFormProps> = ({ initialValues, onSubmit, isLoading, companies }) => {
    const [isClient, setIsClient] = useState(false);


    useEffect(() => {
        setIsClient(true);
    }, []);


    const companyOptions: SelectOption[] = companies.map((company) => ({
        value: company._id,
        label: company.name,
    }));

    if (!isClient) {
        return null;
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                name: Yup.string().required('Name is required'),
                email: Yup.string().email('Invalid email address').required('Email is required'),
                companies: Yup.array().required('At least one company is required'),
            })}
            onSubmit={onSubmit}
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
                        <label htmlFor="email" className="text-lg font-semibold text-gray-700">
                            Email
                        </label>
                        <Field
                            type="email"
                            name="email"
                            id="email"
                            className="input-field"
                            placeholder="Enter your email"
                        />
                        {touched.email && errors.email && (
                            <div className="text-red-500 text-sm">{errors.email}</div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="companies" className="text-lg font-semibold text-gray-700">
                            Select Companies
                        </label>
                        <Select
                            isMulti
                            options={companyOptions}
                            value={companyOptions.filter((option) =>
                                values.companies.includes(option.value)
                            )}
                            onChange={(newValue: MultiValue<SelectOption>) => {
                                const selectedValues = newValue.map(
                                    (option) => option.value
                                );
                                setFieldValue('companies', selectedValues);
                            }}
                            placeholder="Select companies"
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
                        {touched.companies && errors.companies && (
                            <div className="text-red-500 text-sm">{errors.companies}</div>
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

export default UserForm;

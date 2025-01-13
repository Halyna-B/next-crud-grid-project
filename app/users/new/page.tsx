'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies } from '@/redux/companiesSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { createUser } from '@/redux/userSlice';
import UserForm from '@/components/UserForm';

const AddUserPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const { list: companies, status } = useSelector((state: RootState) => state.companies);
    const { status: userStatus, error } = useSelector((state: RootState) => state.users);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCompanies());
        }
    }, [dispatch, status]);

    const handleCreateUser = async (values: { name: string; email: string; companies: string[] }) => {
        try {
            setIsSubmitting(true);
            setSubmissionError(null);

            await dispatch(createUser(values));

            if (userStatus === 'failed') {
                setSubmissionError(error || 'An error occurred');
            } else {
                console.log('User created successfully');
            }
        } catch (error) {
            setSubmissionError('An error occurred while creating the user');
            console.error('Error creating user:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isLoading = status === 'loading' || isSubmitting;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New User</h2>

            {submissionError && (
                <div className="mb-4 text-red-500">{submissionError}</div>
            )}

            <UserForm
                initialValues={{ name: '', email: '', companies: [] }}
                onSubmit={handleCreateUser}
                isLoading={isLoading}
                companies={companies}
            />
        </div>
    );
};

export default AddUserPage;

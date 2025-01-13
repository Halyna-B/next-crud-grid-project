'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '@/redux/userSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { createCompany } from '@/redux/companiesSlice';
import CompanyForm from '@/components/CompanyForm';

const AddCompanyPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const { list: users, status } = useSelector((state: RootState) => state.users);
    const { status: companyStatus, error } = useSelector((state: RootState) => state.companies);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUsers());
        }
    }, [dispatch, status]);

    const handleCreateCompany = async (values: { name: string; address: string; users: string[] }) => {
        try {
            setIsSubmitting(true);
            setSubmissionError(null);

            await dispatch(createCompany(values));

            if (companyStatus === 'failed') {
                setSubmissionError(error || 'An error occurred');
            } else {
                console.log('Company created successfully');
            }
        } catch (error) {
            setSubmissionError('An error occurred while creating the company');
            console.error('Error creating company:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isLoading = status === 'loading' || isSubmitting;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Company</h2>

            {submissionError && (
                <div className="mb-4 text-red-500">{submissionError}</div>
            )}

            <CompanyForm
                initialValues={{ name: '', address: '', users: [] }}
                onSubmit={handleCreateCompany}
                isLoading={isLoading}
                users={users}
            />
        </div>
    );
};

export default AddCompanyPage;

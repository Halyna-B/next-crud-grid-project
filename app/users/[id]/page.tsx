"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import {useRouter} from "next/navigation";

import { fetchUserById, updateUser } from '@/redux/userSlice';
import UserForm, { UserFormValues } from '@/components/UserForm';
import { AppDispatch, RootState } from "@/redux/store";
import { fetchCompanies } from "@/redux/companiesSlice";

interface EditUserPageProps {
    params: Promise<{ id: string }>;
}

const EditUserPage: React.FC<EditUserPageProps> = ({ params }) => {
    const dispatch: AppDispatch = useDispatch();
    const [isMounted, setIsMounted] = useState(false);

    const router = useRouter();

    const { id } = React.use(params);

    const { currentUser, status, error: userError } = useSelector((state: RootState) => state.users);
    const { list: companies, status: companiesStatus, error: companiesError } = useSelector((state: RootState) => state.companies);

    const isUserDataLoading = status === 'loading';
    const isCompaniesLoading = companiesStatus === 'loading';

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (id && isMounted) {
            dispatch(fetchUserById(id));
            dispatch(fetchCompanies());
        }
    }, [id, isMounted, dispatch]);


    const handleSubmit = async (values: UserFormValues) => {
        if (id) {
            try {
                await dispatch(updateUser({ ...values, _id: id }));
                toast.success('User was edit successfully!');
                router.push('/users');
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                toast.error('Error while updating user');
            }
        }
    };

    if (isUserDataLoading || isCompaniesLoading) return <div>Loading...</div>;
    if (userError || companiesError) return <div>Error: {userError || companiesError}</div>;

    const initialValues: UserFormValues = {
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        companies: currentUser?.companies || [],
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit User</h2>

            {currentUser && companies.length > 0 && (
                <UserForm
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    isLoading={isUserDataLoading}
                    companies={companies}
                />
            )}
        </div>
    );
};

export default EditUserPage;

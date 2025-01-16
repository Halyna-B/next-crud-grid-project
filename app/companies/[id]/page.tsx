"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import {useRouter} from "next/navigation";

import { fetchCompanyById, updateCompany } from '@/redux/companiesSlice';
import CompanyForm, { CompanyFormValues } from '@/components/CompanyForm';
import { AppDispatch, RootState } from '@/redux/store';

import { fetchUsers } from "@/redux/userSlice";

interface EditCompanyPageProps {
  params: Promise<{ id: string }>;
}

const EditCompanyPage: React.FC<EditCompanyPageProps> = ({ params }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  const { id } = React.use(params);

  const { currentCompany, status, error: companyError } = useSelector((state: RootState) => state.companies);
  const { list: users, status: userstatus, error: usersError } = useSelector((state: RootState) => state.users);

  const isCompanyDataLoading = status === 'loading';
  const isUsersLoading = userstatus === 'loading';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (id && isMounted) {
      dispatch(fetchCompanyById(id));
      dispatch(fetchUsers());
    }
  }, [id, isMounted, dispatch]);


  const handleSubmit = async (values: CompanyFormValues) => {
    if (id) {
      try {
        await dispatch(updateCompany({ ...values, _id: id }));
        toast.success('Company was edit successfully!');
        router.push('/companies');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error('Error while updating company');
      }
    }
  };

  if (isCompanyDataLoading || isUsersLoading) return <div>Loading...</div>;
  if (companyError || usersError) return <div>Error: {companyError || usersError}</div>;

  const initialValues: CompanyFormValues = {
    name: currentCompany?.name || '',
    address: currentCompany?.address || '',
    users: currentCompany?.users || [],
  };

  return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit User</h2>

        {currentCompany && users.length > 0 && (
            <CompanyForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                isLoading={isCompanyDataLoading}
                users={users}
            />
        )}
      </div>
  );
};

export default EditCompanyPage;

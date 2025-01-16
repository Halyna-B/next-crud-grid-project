"use client";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { deleteCompany, fetchCompanies} from '@/redux/companiesSlice';
import {AppDispatch, RootState} from '@/redux/store';

import DataTable from '../../components/DataTable';

import {toast} from "react-toastify";

type Company = {
    _id: string;
    name: string;
    address: string;
    users: string[];
};

const CompaniesPage = () => {

    const dispatch: AppDispatch = useDispatch();
    const {list: companies, status} = useSelector((state: RootState) => state.companies);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCompanies());
        }
    }, [dispatch, status]);

    const companyColumns = [
        { header: 'ID', accessor: '_id' as keyof Company },
        { header: 'Name', accessor: 'name' as keyof Company },
        { header: 'Address', accessor: 'address' as keyof Company },
        { header: 'Users', accessor: 'users' as keyof Company },
    ];

    const handleDelete = async (id: string) => {
        try {
            await dispatch(deleteCompany(id)).unwrap();
            toast.success("Company deleted successfully.");
            await dispatch(fetchCompanies());
        } catch (error) {
            toast.error(`Failed to delete company: ${error}`);
        }
    };

    const isCompanyListLoading = status === 'loading';

    return (
        <section>
            <DataTable<Company>
                title='Company Data Table'
                data={companies}
                isLoading={isCompanyListLoading}
                columns={companyColumns}
                basePath={'companies'}
                onDelete={handleDelete}
            />
        </section>
    );
};

export default CompaniesPage;

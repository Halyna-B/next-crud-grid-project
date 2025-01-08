"use client";
import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from '@/redux/userSlice';
import {AppDispatch, RootState} from '@/redux/store'

import DataTable from '../../components/DataTable';

type User = {
    _id: string;
    name: string;
    email: string;
    companies: string[];
};

const UsersPage = () => {

    const dispatch: AppDispatch = useDispatch();
    const {list: users, status} = useSelector((state: RootState) => state.users);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUsers());
        }
    }, [dispatch, status]);

    const userColumns = [
        {header: 'ID', accessor: '_id' as keyof User},
        {header: 'Name', accessor: 'name' as keyof User},
        {header: 'Email', accessor: 'email' as keyof User},
        {header: 'Companies', accessor: 'companies' as keyof User},
    ];

    const isUserListLoading = status === 'loading';

    return (
        <section className="mb-12">
            <DataTable<User>
                title='Users Data Table'
                data={users}
                isLoading={isUserListLoading}
                columns={userColumns}
                basePath={'users'}/>
        </section>
    )
}

export default UsersPage
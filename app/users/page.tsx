import DataTable from '../../components/DataTable';
import usersData from '../../assets/jsonData/users.json'

type User = {
    id: string;
    name: string;
    email: string;
    companies: string[];
};

const UsersPage = () => {

    const users: User[] = usersData;

    const userColumns = [
        { header: 'ID', accessor: 'id' as keyof User },
        { header: 'Name', accessor: 'name' as keyof User },
        { header: 'Email', accessor: 'email' as keyof User },
        { header: 'Companies', accessor: 'companies' as keyof User },
    ];

    return (
        <section className="mb-12">
            <DataTable<User> title='Users Data Table' data={users} columns={userColumns} basePath={'users'}/>
        </section>
    )
}

export default UsersPage
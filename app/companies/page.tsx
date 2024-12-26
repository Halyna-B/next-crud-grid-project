import DataTable from '../../components/DataTable';
import companiesData from '../../assets/jsonData/companies.json'

type Company = {
    id: string;
    name: string;
    address: string;
    users: string[];
};

const CompaniesPage = () => {

    const companies: Company[] = companiesData;

    const companyColumns = [
        { header: 'ID', accessor: 'id' as keyof Company },
        { header: 'Name', accessor: 'name' as keyof Company },
        { header: 'Address', accessor: 'address' as keyof Company },
        { header: 'Users', accessor: 'users' as keyof Company },
    ];

    return (
        <section>
            <DataTable<Company> title='Companies Data Table' data={companies} columns={companyColumns} basePath={'companies'}/>
        </section>
    );
};

export default CompaniesPage;
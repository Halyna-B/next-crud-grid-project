import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';

const HomePage = () => {
    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-semibold mb-6">Welcome to UserCoHub</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Overview</h2>
                        <BarChart />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Distribution</h2>
                        <PieChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

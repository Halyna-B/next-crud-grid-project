import Link from 'next/link';
import Image from 'next/image';
import notFoundImage from '../assets/images/notFound.png'

const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="text-center">
                <p className="mt-4 text-2xl text-gray-600">
                    Oops! The page you&#39;re looking for doesn&#39;t exist.
                </p>
                <p className="mt-2 text-gray-500">
                    It might have been moved or deleted.
                </p>
                <div className="mt-6">
                    <Link href="/" className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition duration-300">Home
                    </Link>
                </div>
                <div className="mt-8">
                    <Image
                        src={notFoundImage}
                        alt="Not Found Illustration"
                        className="mx-auto w-96"
                    />
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;

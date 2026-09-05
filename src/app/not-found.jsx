import Link from "next/link"

const NotFoundPage = () => {
    return (
        <div className='flex justify-center items-center flex-col gap-6 p-50'>
            <h2 className='text-blue-800 text-2xl'>
            Not found Page
            </h2>
            <Link href={"/"}>
            <button className='btn btn-primary'> Back to Home </button>
            </Link>
            
        </div>
    );
};

export default NotFoundPage;
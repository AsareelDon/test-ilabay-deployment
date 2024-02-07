import { useEffect } from "react";

const PaginationButton = ({ numOfData, numOfPages, setPage, page, numOfRowPerPage }) => {
    useEffect(() => {
        if (numOfRowPerPage.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [numOfRowPerPage, page, setPage]);

    const nextPage = () => {
        if (page < numOfPages.length){
            setPage(page + 1);   
        }
    };

    const prevPage = () => {
        if (page > 1){
            setPage(page - 1); 
        }
    };

    return (
        <div className='flex justify-between items-center h-16 py-2 px-6 border-t'>
            <p className="text-gray-700">Showing 1 to {numOfRowPerPage.length} of {numOfData} records</p>
            <div>
                <button onClick={() => prevPage()} 
                    className="border-2 px-2 h-10 mr-2 text-gray-700 shadow rounded-md px-2
                    focus:outline-none focus:ring-2 focus:ring-cgreen"
                >
                    Previous
                </button>
                <button onClick={() => nextPage()} 
                    className="border-2 px-2 h-10 mr-2 text-gray-700 shadow rounded-md px-2
                    focus:outline-none focus:ring-2 focus:ring-cgreen"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginationButton;
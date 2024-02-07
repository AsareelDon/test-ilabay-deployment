const CardPagination = ({ numOfPages, setPage, page }) => {

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
        <div className='flex items-top justify-end h-16 w-full'>
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
    );
};

export default CardPagination;
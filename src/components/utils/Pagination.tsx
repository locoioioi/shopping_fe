interface paginationInterface {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
export const Pagination: React.FC<paginationInterface> = ({currentPage,totalPages,onPageChange}) => {
    let pages: number[] = [];
    if (currentPage === 1) {
        pages.push(currentPage);
        if (totalPages >= currentPage + 1) {
            pages.push(currentPage + 1);
        }
        if (totalPages >= currentPage + 2) {
            pages.push(currentPage + 2);
        }
    } else if (currentPage > 1) {
        if (currentPage >= 3) {
            pages.push(currentPage - 2);
        }
        if (currentPage >= 2 ) { 
            pages.push(currentPage - 1);
        }
        pages.push(currentPage);
        if (totalPages >= currentPage + 1) {
            pages.push(currentPage + 1);
        }
        if (totalPages >= currentPage + 2) {
            pages.push(currentPage + 2);
        }
    }

    return (
        <div className="mt-4 flex flex-row gap-1">
            <div onClick={() => {
                onPageChange(1);
            }} className="text-darkBlue-100 border-darkBlue-100 text-base px-2 py-1 rounded border hover:cursor-pointer hover:bg-slate-100">
                First
            </div>
            {
                pages.map((page, index) => {
                    return (
                        <div key={index} onClick={() => {
                            onPageChange(page);
                        }} className={` border-darkBlue-100 text-base px-2 py-1 rounded border hover:cursor-pointer hover:bg-slate-100 hover:text-darkBlue-100 ${currentPage === page ? "bg-darkBlue-100 text-white " : "text-darkBlue-100"}`}>
                            {page}
                        </div>
                    )
                })
            }
            <div onClick={() => {
                onPageChange(totalPages);
            }} className="text-darkBlue-100 border-darkBlue-100 text-base px-2 py-1 rounded border hover:cursor-pointer hover:bg-slate-100">
                Last
            </div>
        </div>
    )
};
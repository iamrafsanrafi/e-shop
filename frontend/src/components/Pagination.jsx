import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const pagesToShowBeforeAfter = 1;
    const windowSize = pagesToShowBeforeAfter * 2 + 1;

    function generatePageNumbers() {
        const pages = [];

        if (totalPages <= windowSize + 2) {
            // Show all pages if small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage <= windowSize) {
                for (let i = 2; i <= windowSize + 1; i++) {
                    pages.push(i);
                }
                pages.push("...");
            } else if (currentPage >= totalPages - windowSize + 1) {
                pages.push("...");
                for (let i = totalPages - windowSize; i < totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push("...");
                for (let i = currentPage - pagesToShowBeforeAfter; i <= currentPage + pagesToShowBeforeAfter; i++) {
                    pages.push(i);
                }
                pages.push("...");
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    }

    

    const pageNumbers = generatePageNumbers();

    return (
        <div className="flex items-center justify-center mt-10">
            {/* Prev */}
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className="px-2 py-1 cursor-pointer disabled:opacity-50 disabled:hover:text-black hover:text-[#FF624C]"
                disabled={currentPage === 1}
            >
                <LiaAngleLeftSolid size={23} />
            </button>

            {/* Numbers */}
            <div className="flex sm:gap-6 gap-2 sm:mx-12">
                {pageNumbers.map((page, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            typeof page === "number" && onPageChange(page);
                        }}
                        className={`px-3 py-1 sm:px-5 sm:py-2 text-lg font-semibold rounded-md transition-colors
                        ${currentPage === page ? "bg-[#FF624C] text-white" : "hover:bg-gray-200"} 
                        ${page === "..." ? "cursor-default" : "cursor-pointer"}`}
                        disabled={page === "..."}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next */}
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                className="px-2 py-1 cursor-pointer disabled:opacity-50 disabled:hover:text-black hover:text-[#FF624C]"
                disabled={currentPage === totalPages}
            >
                <LiaAngleRightSolid size={23} />
            </button>
        </div>
    );
};

export default Pagination;

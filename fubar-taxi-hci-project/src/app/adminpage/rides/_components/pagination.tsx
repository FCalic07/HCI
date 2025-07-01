type PaginationProps = {
  currentPage: number;
  pagesCount: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  pagesCount,
  onPageChange,
}: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;

  const handlePreviousPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="justify-self-center mt-2 w-full max-w-2xl mb-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex justify-between items-center">
        <button
          onClick={handlePreviousPage}
          className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2 ${
            isFirstPage
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
          }`}
          disabled={isFirstPage}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Previous</span>
        </button>

        <div className="flex items-center space-x-2">
          <p className="text-gray-700">
            Page{" "}
            <span className="font-semibold text-blue-600">{currentPage}</span> of{" "}
            <span className="font-semibold text-gray-900">{pagesCount}</span>
          </p>
        </div>

        <button
          onClick={handleNextPage}
          className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2 ${
            isLastPage
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
          }`}
          disabled={isLastPage}
        >
          <span>Next</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

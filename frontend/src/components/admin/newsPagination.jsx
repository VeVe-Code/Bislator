import { Link } from 'react-router-dom';

export default function Pagination({ links, page }) {
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      
      {/* Mobile Previous/Next */}
      <div className="flex-1 flex justify-between sm:hidden">
        <Link
          to={`/admin/news/?page=${links.previousPage ? page - 1 : page}`}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </Link>
        <Link
          to={`/admin/news/?page=${links.nextPage ? page + 1 : page}`}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </Link>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          {/* Previous */}
          <Link
            to={`/admin/news/?page=${links.previousPage ? page - 1 : page}`}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
            </svg>
          </Link>

          {/* Page Numbers */}
          {links.loopLink?.map(link => (
            <Link
              key={link.number}
              to={`/admin/news/?page=${link.number}`}
              aria-current={link.number === page ? "page" : undefined}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                link.number === page
                  ? "z-10 bg-orange-400 text-white"
                  : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              }`}
            >
              {link.number}
            </Link>
          ))}

          {/* Next */}
          <Link
            to={`/admin/news/?page=${links.nextPage ? page + 1 : page}`}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </Link>
        </nav>
      </div>
    </div>
  );
}

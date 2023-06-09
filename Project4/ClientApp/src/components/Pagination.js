import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-4">
            <ul className="pagination justify-content-center">
                {currentPage > 1 ? (
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>
                            Previous
                        </a>
                    </li>
                ) : null}
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <a
                            href="#"
                            className={`page-link ${number === currentPage ? "active" : ""}`}
                            onClick={() => paginate(number)}
                        >
                            {number}
                        </a>
                    </li>
                ))}
                {currentPage < pageNumbers.length ? (
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>
                            Next
                        </a>
                    </li>
                ) : null}
            </ul>
        </nav>
    );
};

export default Pagination;
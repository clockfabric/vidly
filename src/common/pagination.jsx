import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = props => {
  const { pageCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(pageCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {pages.map(page => {
          return (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              style={{ cursor: "pointer" }}
            >
              <p onClick={() => onPageChange(page)} className="page-link">
                {page}
              </p>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;

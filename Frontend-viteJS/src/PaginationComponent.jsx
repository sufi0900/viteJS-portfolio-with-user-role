/* eslint-disable react/prop-types */

import { Pagination as MuiPagination } from "@mui/material";

const Pagination = ({
  setCurrentPage,
  currentPage,
  numberOfPages,
  dispatch,
}) => {
  const renderPagination = () => {
    if (currentPage === numberOfPages && currentPage === 1) return null;
    return (
      <MuiPagination
        count={numberOfPages}
        page={currentPage}
        onChange={(event, page) => dispatch(setCurrentPage(page))}
        shape="rounded"
        color="secondary"
        className="mb-0"
      />
    );
  };

  return <div className="mt-4">{renderPagination()}</div>;
};

export default Pagination;

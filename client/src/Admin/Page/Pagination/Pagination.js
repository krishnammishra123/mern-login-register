import React from 'react'
import Pagination from "react-bootstrap/Pagination";
import './pagination.css'

const Paginations = ({ handlePrevious, handleNext, page, pageCount, setPage }) => {
  return (
    <>
      {pageCount > 0 ? (
        <div className="pagination_div d-flex justify-content-end mx-5">
          <Pagination>
            <Pagination.Prev onClick={() => handlePrevious()} />
            {Array(pageCount)
              .fill(null)
              .map((element, index) => {
                return (
                  <>
                    <Pagination.Item
                      key={index}
                      active={page === index + 1 ? true : false}
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  </>
                );
              })}
            <Pagination.Next onClick={() => handleNext()} />
            &nbsp;
            <div className='page'>
              <span className="justify-content-center mx-5">
                {page}/{pageCount}
              </span>
            </div>
          </Pagination>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Paginations;
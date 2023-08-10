import "./styles/Pagination.css";

const Pagination = ({ quantyPage, currentPage, setCurrentPage }) => {
  
  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button
        className="page__btn prev "
        disabled={currentPage === 1 ? true : false}
        onClick={handlePrev}
      >
        <i className="bx bx-chevron-left page__icon"></i>
      </button>
      <ul className="page__list">
        <li className="page__item">
          <span className="page__current">{currentPage}</span> Of{" "}
          <span className="page__quanty">{quantyPage}</span>
        </li>
      </ul>
      <button
        className="page__btn next"
        disabled={currentPage >= quantyPage ? true : false}
        onClick={handleNext}
      >
        <i className="bx bx-chevron-right page__icon"></i>
      </button>
    </div>
  );
};

export default Pagination;

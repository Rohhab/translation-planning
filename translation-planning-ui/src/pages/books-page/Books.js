import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Books.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Books = () => {
  const [books, setBooks] = useState([]);
  const itemsPerPage = 5;

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // Fetch data from your NestJS API
    fetch('https://your-api-url.com/books')
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const changePage = (value) => {
    setCurrentPage(value);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentBooks = books.slice(firstIndex, lastIndex);

  const handleAddBook = (title, pageCount, translatedPages) => {
    setBooks([
      ...books,
      { title, pageCount, progress: translatedPages / pageCount },
    ]);
    closeModal();
  };

  const totalPages = Math.ceil(books.length / itemsPerPage);

  return (
    <div className="Books">
      <div className="Books__background"></div>
      <div className="Books__content">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Page Count</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book, index) => (
              <tr key={book.id}>
                <td>{firstIndex + index + 1}</td>
                <td>{book.title}</td>
                <td>{book.pageCount}</td>
                <td>
                  <progress value={book.progress * 100} max="100">
                    {book.progress * 100}%
                  </progress>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          &lt;
        </button>
        <span>{currentPage}</span>
        <button
          disabled={totalPages === 0 ? true : currentPage === totalPages}
          onClick={() => changePage(currentPage + 1)}
        >
          &gt;
        </button>
        <div className="Books__addBook">
          <button onClick={openModal}>Add Book</button>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Add Book Modal"
          >
            <h2>Add Book</h2>

            <form>
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name="title" required />
              <label htmlFor="pageCount">Page Count:</label>
              <input type="number" id="pageCount" name="pageCount" required />
              <label htmlFor="translatedPages">Translated Pages:</label>

              <input
                type="number"
                id="translatedPages"
                name="translatedPages"
                required
              />

              <button
                type="button"
                onClick={() =>
                  handleAddBook(
                    document.getElementById('title').value,
                    document.getElementById('pageCount').value,
                    document.getElementById('translatedPages').value
                  )
                }
              >
                Add Book
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Books;

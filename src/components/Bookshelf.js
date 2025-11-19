import React from 'react';

function Bookshelf({ books, onBookSelect, onDeleteBook, onOpenBook }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="bookshelf">
      {books.length === 0 ? (
        <div className="empty-state">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
          <h2>Your library is empty</h2>
          <p>Click the + button to add your first book</p>
          <button className="btn btn-primary" onClick={onOpenBook}>
            Add Book
          </button>
        </div>
      ) : (
        <div className="book-grid">
          {books.map(book => (
            <div key={book.id} className="book-card">
              <div className="book-cover" onClick={() => onBookSelect(book)}>
                <div className="book-cover-content">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                  <div className="book-type-badge">{book.type.replace('.', '').toUpperCase()}</div>
                </div>
              </div>
              
              <div className="book-info">
                <h3 className="book-title" title={book.name}>{book.name}</h3>
                <p className="book-meta">Added {formatDate(book.addedDate)}</p>
                {book.progress > 0 && (
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${book.progress}%` }}></div>
                  </div>
                )}
              </div>
              
              <div className="book-actions">
                <button 
                  className="btn btn-small btn-primary"
                  onClick={() => onBookSelect(book)}
                >
                  Read
                </button>
                <button 
                  className="btn btn-small btn-danger"
                  onClick={() => onDeleteBook(book.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookshelf;

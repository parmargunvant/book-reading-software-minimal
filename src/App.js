import React, { useState, useEffect } from 'react';
import Bookshelf from './components/Bookshelf';
import PDFViewer from './components/PDFViewer';
import EPUBViewer from './components/EPUBViewer';
import Header from './components/Header';

const { ipcRenderer } = window.require('electron');

function App() {
  const [theme, setTheme] = useState('light');
  const [currentView, setCurrentView] = useState('bookshelf');
  const [currentBook, setCurrentBook] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const loadBooks = async () => {
    try {
      const data = await ipcRenderer.invoke('load-book-data');
      setBooks(data.books || []);
    } catch (error) {
      console.error('Error loading books:', error);
    }
  };

  const saveBooks = async (updatedBooks) => {
    try {
      await ipcRenderer.invoke('save-book-data', { books: updatedBooks });
      setBooks(updatedBooks);
    } catch (error) {
      console.error('Error saving books:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleOpenBook = async () => {
    try {
      const fileData = await ipcRenderer.invoke('open-file-dialog');
      if (fileData) {
        const newBook = {
          id: Date.now().toString(),
          name: fileData.name,
          path: fileData.path,
          type: fileData.type,
          data: fileData.data,
          progress: 0,
          highlights: [],
          notes: [],
          addedDate: new Date().toISOString()
        };
        
        const updatedBooks = [...books, newBook];
        await saveBooks(updatedBooks);
        setCurrentBook(newBook);
        setCurrentView('reader');
      }
    } catch (error) {
      console.error('Error opening book:', error);
    }
  };

  const handleBookSelect = (book) => {
    setCurrentBook(book);
    setCurrentView('reader');
  };

  const handleBackToShelf = () => {
    setCurrentView('bookshelf');
    setCurrentBook(null);
  };

  const handleUpdateBook = async (updatedBook) => {
    const updatedBooks = books.map(b => 
      b.id === updatedBook.id ? updatedBook : b
    );
    await saveBooks(updatedBooks);
    setCurrentBook(updatedBook);
  };

  const handleDeleteBook = async (bookId) => {
    const updatedBooks = books.filter(b => b.id !== bookId);
    await saveBooks(updatedBooks);
  };

  return (
    <div className="app">
      <Header 
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenBook={handleOpenBook}
        onBackToShelf={currentView === 'reader' ? handleBackToShelf : null}
        currentView={currentView}
      />
      
      <main className="main-content">
        {currentView === 'bookshelf' ? (
          <Bookshelf 
            books={books}
            onBookSelect={handleBookSelect}
            onDeleteBook={handleDeleteBook}
            onOpenBook={handleOpenBook}
          />
        ) : (
          currentBook && (
            currentBook.type === '.pdf' ? (
              <PDFViewer 
                book={currentBook}
                theme={theme}
                onUpdateBook={handleUpdateBook}
              />
            ) : (
              <EPUBViewer 
                book={currentBook}
                theme={theme}
                onUpdateBook={handleUpdateBook}
              />
            )
          )
        )}
      </main>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useRef } from 'react';
import ePub from 'epubjs';

function EPUBViewer({ book, theme, onUpdateBook }) {
  const [rendition, setRendition] = useState(null);
  const [epubBook, setEpubBook] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const viewerRef = useRef(null);

  useEffect(() => {
    if (viewerRef.current) {
      loadEPUB();
    }
    
    return () => {
      if (rendition) {
        rendition.destroy();
      }
      if (isSpeaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [book]);

  useEffect(() => {
    if (rendition) {
      const themeColors = theme === 'dark' 
        ? { body: { background: '#1a1a1a', color: '#e0e0e0' } }
        : { body: { background: '#ffffff', color: '#333333' } };
      
      rendition.themes.default(themeColors);
    }
  }, [theme, rendition]);

  const loadEPUB = async () => {
    try {
      const data = atob(book.data);
      const bytes = new Uint8Array(data.length);
      for (let i = 0; i < data.length; i++) {
        bytes[i] = data.charCodeAt(i);
      }
      
      const epubBook = ePub();
      await epubBook.open(bytes);
      setEpubBook(epubBook);
      
      const rendition = epubBook.renderTo(viewerRef.current, {
        width: '100%',
        height: '100%',
        spread: 'none'
      });
      
      setRendition(rendition);
      
      // Apply theme
      const themeColors = theme === 'dark' 
        ? { body: { background: '#1a1a1a', color: '#e0e0e0' } }
        : { body: { background: '#ffffff', color: '#333333' } };
      
      rendition.themes.default(themeColors);
      
      // Restore progress or start from beginning
      if (book.progress > 0) {
        const locations = await epubBook.locations.generate(1024);
        const location = Math.floor((book.progress / 100) * locations.length);
        await rendition.display(locations[location]);
      } else {
        await rendition.display();
      }
      
      rendition.on('relocated', (location) => {
        setCurrentLocation(location);
        updateProgress(location);
      });
      
    } catch (error) {
      console.error('Error loading EPUB:', error);
    }
  };

  const updateProgress = (location) => {
    if (!location || !epubBook) return;
    
    const progress = Math.round((location.start.percentage || 0) * 100);
    if (progress !== book.progress) {
      onUpdateBook({ ...book, progress });
    }
  };

  const handlePrevPage = () => {
    if (rendition) {
      rendition.prev();
    }
  };

  const handleNextPage = () => {
    if (rendition) {
      rendition.next();
    }
  };

  const handleTextToSpeech = async () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    try {
      if (rendition) {
        const range = await rendition.currentLocation();
        const cfi = range.start.cfi;
        const section = epubBook.spine.get(cfi);
        
        if (section) {
          const doc = await section.load(epubBook.load.bind(epubBook));
          const text = doc.body.textContent;
          
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.onend = () => setIsSpeaking(false);
          
          window.speechSynthesis.speak(utterance);
          setIsSpeaking(true);
        }
      }
    } catch (error) {
      console.error('Error with text-to-speech:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm || !epubBook) return;
    
    try {
      const results = await epubBook.spine.each(async (section) => {
        const doc = await section.load(epubBook.load.bind(epubBook));
        const text = doc.body.textContent;
        return text.toLowerCase().includes(searchTerm.toLowerCase());
      });
      
      if (results.some(r => r)) {
        alert(`Found "${searchTerm}" in the book`);
      } else {
        alert(`"${searchTerm}" not found`);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleAddNote = () => {
    const note = prompt('Enter your note:');
    if (note && currentLocation) {
      const updatedNotes = [...(book.notes || []), {
        id: Date.now(),
        location: currentLocation.start.cfi,
        text: note,
        date: new Date().toISOString()
      }];
      onUpdateBook({ ...book, notes: updatedNotes });
    }
  };

  return (
    <div className="epub-viewer">
      <div className="viewer-toolbar">
        <div className="toolbar-group">
          <button className="btn btn-icon" onClick={handlePrevPage}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          
          <span className="page-info">
            {currentLocation ? `${Math.round(currentLocation.start.percentage * 100)}%` : 'Loading...'}
          </span>
          
          <button className="btn btn-icon" onClick={handleNextPage}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
        
        <div className="toolbar-group">
          <button 
            className={`btn btn-icon ${isSpeaking ? 'active' : ''}`} 
            onClick={handleTextToSpeech}
            title="Text-to-Speech"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          </button>
          
          <button 
            className="btn btn-icon" 
            onClick={() => setShowSearch(!showSearch)}
            title="Search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
          
          <button 
            className="btn btn-icon" 
            onClick={handleAddNote}
            title="Add Note"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          
          <button 
            className="btn btn-icon" 
            onClick={() => setShowNotes(!showNotes)}
            title="View Notes"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </button>
        </div>
      </div>
      
      {showSearch && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search in book..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
      )}
      
      <div className="viewer-content">
        <div className="epub-container" ref={viewerRef}></div>
        
        {showNotes && (
          <div className="notes-panel">
            <h3>Notes</h3>
            {book.notes && book.notes.length > 0 ? (
              <div className="notes-list">
                {book.notes.map(note => (
                  <div key={note.id} className="note-item">
                    <div className="note-header">
                      <span className="note-date">{new Date(note.date).toLocaleDateString()}</span>
                    </div>
                    <p className="note-text">{note.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-notes">No notes yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default EPUBViewer;

import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Set worker path
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function PDFViewer({ book, theme, onUpdateBook }) {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.5);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const canvasRef = useRef(null);
  const textLayerRef = useRef(null);

  useEffect(() => {
    loadPDF();
    return () => {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [book]);

  useEffect(() => {
    if (pdfDoc && pageNum) {
      renderPage(pageNum);
    }
  }, [pdfDoc, pageNum, scale]);

  const loadPDF = async () => {
    try {
      const data = atob(book.data);
      const bytes = new Uint8Array(data.length);
      for (let i = 0; i < data.length; i++) {
        bytes[i] = data.charCodeAt(i);
      }
      
      const loadingTask = pdfjsLib.getDocument({ data: bytes });
      const pdf = await loadingTask.promise;
      setPdfDoc(pdf);
      setNumPages(pdf.numPages);
      setPageNum(Math.floor((book.progress / 100) * pdf.numPages) || 1);
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  };

  const renderPage = async (num) => {
    if (!pdfDoc) return;
    
    const page = await pdfDoc.getPage(num);
    const viewport = page.getViewport({ scale });
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    
    await page.render(renderContext).promise;
    
    // Update progress
    const progress = Math.round((num / numPages) * 100);
    if (progress !== book.progress) {
      onUpdateBook({ ...book, progress });
    }
  };

  const handlePrevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNum < numPages) {
      setPageNum(pageNum + 1);
    }
  };

  const handleZoomIn = () => {
    setScale(Math.min(scale + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(Math.max(scale - 0.25, 0.5));
  };

  const handleTextToSpeech = async () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    try {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const text = textContent.items.map(item => item.str).join(' ');
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } catch (error) {
      console.error('Error with text-to-speech:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm || !pdfDoc) return;
    
    // Simple search implementation - find in current page
    const page = await pdfDoc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const text = textContent.items.map(item => item.str).join(' ');
    
    if (text.toLowerCase().includes(searchTerm.toLowerCase())) {
      alert(`Found "${searchTerm}" on page ${pageNum}`);
    } else {
      // Search in other pages
      for (let i = 1; i <= numPages; i++) {
        if (i === pageNum) continue;
        const p = await pdfDoc.getPage(i);
        const tc = await p.getTextContent();
        const t = tc.items.map(item => item.str).join(' ');
        if (t.toLowerCase().includes(searchTerm.toLowerCase())) {
          setPageNum(i);
          alert(`Found "${searchTerm}" on page ${i}`);
          return;
        }
      }
      alert(`"${searchTerm}" not found`);
    }
  };

  const handleAddNote = () => {
    const note = prompt('Enter your note:');
    if (note) {
      const updatedNotes = [...(book.notes || []), {
        id: Date.now(),
        page: pageNum,
        text: note,
        date: new Date().toISOString()
      }];
      onUpdateBook({ ...book, notes: updatedNotes });
    }
  };

  return (
    <div className="pdf-viewer">
      <div className="viewer-toolbar">
        <div className="toolbar-group">
          <button className="btn btn-icon" onClick={handlePrevPage} disabled={pageNum <= 1}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          
          <span className="page-info">
            Page {pageNum} of {numPages}
          </span>
          
          <button className="btn btn-icon" onClick={handleNextPage} disabled={pageNum >= numPages}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
        
        <div className="toolbar-group">
          <button className="btn btn-icon" onClick={handleZoomOut}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
          
          <span className="zoom-level">{Math.round(scale * 100)}%</span>
          
          <button className="btn btn-icon" onClick={handleZoomIn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
              <line x1="11" y1="8" x2="11" y2="14"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
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
        <div className="pdf-canvas-container">
          <canvas ref={canvasRef}></canvas>
        </div>
        
        {showNotes && (
          <div className="notes-panel">
            <h3>Notes</h3>
            {book.notes && book.notes.length > 0 ? (
              <div className="notes-list">
                {book.notes.map(note => (
                  <div key={note.id} className="note-item">
                    <div className="note-header">
                      <span className="note-page">Page {note.page}</span>
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

export default PDFViewer;

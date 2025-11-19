# Features Overview

## Book Reading Software - Minimal

### 1. Multi-Format Support
- **PDF Files**: High-quality rendering with PDF.js
- **EPUB Files**: Reflowable text with ePub.js
- Automatic format detection
- Support for both formats in one application

### 2. Text-to-Speech (TTS)
- Browser-native Web Speech API integration
- One-click TTS activation
- Read current page/section
- Visual indicator when TTS is active
- Play/pause functionality

### 3. Search Functionality
- Full-text search within books
- Search across all pages
- Case-insensitive matching
- Navigate to search results
- Works with both PDF and EPUB formats

### 4. Notes & Highlights
- Add notes at any location in the book
- Notes include:
  - Page number (PDF)
  - Location reference (EPUB)
  - Timestamp
  - Custom text
- View all notes in dedicated panel
- Persistent storage across sessions

### 5. Dark/Light Mode
- Toggle between light and dark themes
- System-wide theme application
- Persists across sessions
- Optimized for both modes:
  - Light mode: High contrast, easy on eyes in bright environments
  - Dark mode: Reduced eye strain in low-light conditions

### 6. Reading Progress Tracking
- Automatic progress tracking
- Visual progress bar on bookshelf
- Resume reading from last position
- Percentage-based for EPUB
- Page-based for PDF

### 7. Bookshelf/Library
- Grid-based layout
- Book metadata display
- Quick access to all books
- Delete unwanted books
- Visual book cards with:
  - Format badge (PDF/EPUB)
  - Progress indicator
  - Added date

### 8. PDF-Specific Features
- Zoom in/out controls (50% - 300%)
- High-quality rendering
- Page navigation
- Canvas-based display

### 9. EPUB-Specific Features
- Reflowable text
- Responsive layout
- Theme integration
- Chapter navigation

### 10. User Interface
- Clean, minimal design
- Distraction-free reading
- Intuitive controls
- Responsive layout
- Icon-based navigation
- Smooth transitions and animations

### 11. Performance
- Fast startup time
- Efficient rendering
- Minimal memory footprint
- Responsive UI even with large books

### 12. Cross-Platform
- Built with Electron for desktop
- Windows support
- Potential for Linux and macOS
- Foundation for Android port

### 13. Data Persistence
- Books stored in user data directory
- Reading progress auto-saved
- Notes and highlights preserved
- Theme preference saved
- Library state maintained

## Technical Highlights

### Architecture
- **Electron**: Main process for system integration
- **React**: UI components and state management
- **Webpack**: Module bundling and build process
- **PDF.js**: PDF rendering engine
- **ePub.js**: EPUB rendering engine

### Design Patterns
- Component-based architecture
- State management with React hooks
- IPC communication between main and renderer
- File-based data persistence

### User Experience
- Keyboard shortcuts support
- Mouse/trackpad navigation
- Touch-friendly controls (for future touch screens)
- Accessible UI elements

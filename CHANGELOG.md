# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-11-19

### Initial Release

#### Features
- **Multi-Format Support**
  - PDF file reading with PDF.js
  - EPUB file reading with ePub.js
  - Automatic format detection

- **Text-to-Speech**
  - Browser-native Web Speech API integration
  - One-click TTS activation for current page/section
  - Visual indicator when TTS is active

- **Search Functionality**
  - Full-text search within books
  - Search across all pages
  - Case-insensitive matching
  - Navigate to search results

- **Notes & Highlights**
  - Add notes at any location
  - Page/location reference tracking
  - Timestamp for each note
  - View all notes in dedicated panel

- **Dark/Light Mode**
  - Toggle between themes
  - System-wide theme application
  - Persistent theme preference
  - Optimized colors for both modes

- **Reading Progress**
  - Automatic progress tracking
  - Visual progress bar
  - Resume from last position
  - Percentage-based for EPUB, page-based for PDF

- **Bookshelf/Library**
  - Grid-based book layout
  - Book metadata display
  - Quick access to all books
  - Delete unwanted books
  - Format badges and progress indicators

- **PDF Features**
  - Zoom controls (50% - 300%)
  - High-quality rendering
  - Page navigation

- **EPUB Features**
  - Reflowable text
  - Responsive layout
  - Theme integration

- **User Interface**
  - Clean, minimal design
  - Distraction-free reading
  - Intuitive controls
  - Smooth transitions

#### Technical
- Electron for cross-platform desktop support
- React for UI components
- PDF.js for PDF rendering
- ePub.js for EPUB rendering
- Webpack for bundling
- Custom CSS with theme variables

#### Security
- Context isolation enabled
- Node integration disabled
- Secure IPC communication via preload script
- Local PDF.js worker (no CDN dependencies)

#### Documentation
- Comprehensive README
- Quick Start Guide
- Features documentation
- Contributing guidelines

### Known Limitations
- Android support not yet implemented (desktop only)
- Search results don't highlight text in document
- No cloud sync functionality
- Limited to one window at a time

### Future Considerations
- Mobile/Android version
- Cloud synchronization
- Enhanced search with result highlighting
- Annotation export
- Reading statistics
- Multiple windows support
- Custom themes
- Font customization

# Book Reading Software - Minimal

A clean, minimal, cross-platform book reader for Windows and Android. Built with Electron and React for a smooth, distraction-free reading experience.

## Features

### Core Features
- **Multi-Format Support**: Read PDF and EPUB files
- **Text-to-Speech**: Auto Text-to-Speech functionality for hands-free reading
- **Search**: Full-text search across your books
- **Highlights & Notes**: Add highlights and notes to remember important passages
- **Dark/Light Mode**: Switch between dark and light themes for comfortable reading
- **Simple Bookshelf**: Organize your books in a clean, minimal library

### Design Principles
- **Clean & Minimal**: Distraction-free interface focused on reading
- **Fast Performance**: Lightweight and responsive
- **Cross-Platform**: Works on Windows (with potential for Android)
- **Essential Features Only**: No bloat, just what you need

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/parmargunvant/book-reading-software-minimal.git
cd book-reading-software-minimal

# Install dependencies
npm install

# Run in development mode
npm start

# Build for production
npm run build

# Package the application
npm run package
```

## Usage

### Opening Books
1. Click the **+** button in the header to open a book
2. Select a PDF or EPUB file from your computer
3. The book will be added to your library

### Reading
- Use **arrow buttons** or **keyboard arrows** to navigate pages
- **Zoom in/out** using the zoom controls (PDF only)
- Click **speaker icon** to start Text-to-Speech
- Click **search icon** to search within the book
- Click **note icon** to add a note at the current location

### Managing Your Library
- Click on any book in the bookshelf to start reading
- Delete books you no longer need using the Delete button
- Your reading progress is automatically saved

### Keyboard Shortcuts
- `←` / `→`: Previous/Next page
- `Ctrl/Cmd + F`: Search (when implemented)
- `Ctrl/Cmd + T`: Toggle theme

## Technology Stack

- **Electron**: Cross-platform desktop application framework
- **React**: UI library for building the interface
- **PDF.js**: PDF rendering
- **ePub.js**: EPUB rendering
- **Web Speech API**: Text-to-Speech functionality

## Project Structure

```
book-reading-software-minimal/
├── main.js                 # Electron main process
├── src/
│   ├── App.js             # Main React component
│   ├── index.js           # React entry point
│   ├── components/
│   │   ├── Header.js      # App header with controls
│   │   ├── Bookshelf.js   # Library view
│   │   ├── PDFViewer.js   # PDF reader component
│   │   └── EPUBViewer.js  # EPUB reader component
│   └── styles/
│       └── main.css       # Application styles
├── public/
│   └── index.html         # HTML template
├── webpack.config.js      # Webpack configuration
└── package.json           # Project dependencies

```

## Building for Distribution

### Windows
```bash
npm run make
```

This will create distributable packages in the `out` directory.

### Android
For Android support, the application would need to be rebuilt using React Native or Capacitor. The current implementation is optimized for desktop use.

## Features in Detail

### PDF Support
- High-quality rendering using PDF.js
- Zoom controls
- Page navigation
- Text extraction for search and TTS

### EPUB Support
- Reflowable text layout
- Theme support (dark/light)
- Page navigation
- Text extraction for search and TTS

### Text-to-Speech
- Browser-native Web Speech API
- Read current page content
- Play/pause controls

### Search
- Full-text search within books
- Navigate to search results
- Case-insensitive matching

### Highlights & Notes
- Add notes at any location
- View all notes in a dedicated panel
- Date stamps for reference

### Dark/Light Mode
- System-wide theme switching
- Persists across sessions
- Comfortable reading in any lighting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

Created with ❤️ for book lovers everywhere

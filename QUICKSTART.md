# Quick Start Guide

## Getting Started with Book Reading Software

### Installation

1. **Prerequisites**
   - Install Node.js (v14 or higher) from [nodejs.org](https://nodejs.org/)
   - Ensure npm is installed (comes with Node.js)

2. **Clone and Install**
   ```bash
   git clone https://github.com/parmargunvant/book-reading-software-minimal.git
   cd book-reading-software-minimal
   npm install
   ```

3. **Run the Application**
   ```bash
   npm start
   ```
   
   This will:
   - Start the webpack dev server on port 8080
   - Launch the Electron application
   - Open the Book Reader window

### First Use

1. **Add Your First Book**
   - Click the **+** button in the top-right corner
   - Browse and select a PDF or EPUB file
   - The book will appear in your library

2. **Start Reading**
   - Click on the book card to open it
   - Use navigation controls at the top
   - Enjoy your reading!

### Basic Controls

#### Navigation
- **Previous Page**: Click ← button or press Left Arrow
- **Next Page**: Click → button or press Right Arrow
- **Back to Library**: Click ← back button in header

#### PDF Controls
- **Zoom In**: Click + magnifier icon
- **Zoom Out**: Click - magnifier icon
- **Current Zoom**: Displayed between zoom buttons (e.g., 150%)

#### Reading Features
- **Text-to-Speech**: Click speaker icon to start/stop
- **Search**: Click search icon, type your query, press Enter
- **Add Note**: Click note icon, enter your note
- **View Notes**: Click notes icon to open notes panel

#### Settings
- **Theme Toggle**: Click sun/moon icon to switch between light and dark mode

### Tips & Tricks

1. **Organize Your Library**
   - Keep your books organized by deleting finished or unwanted books
   - Progress bars show which books you're currently reading

2. **Take Notes While Reading**
   - Add notes to remember important passages
   - Notes are saved with page/location references
   - Access all notes anytime via the notes panel

3. **Use Text-to-Speech**
   - Perfect for listening while doing other tasks
   - Great for proofreading or learning
   - Works with both PDF and EPUB formats

4. **Search Efficiently**
   - Use the search feature to find specific topics
   - Searches through the entire book
   - Case-insensitive matching

5. **Choose Your Theme**
   - Light mode for bright environments
   - Dark mode for low-light reading
   - Theme preference is saved automatically

### Building for Distribution

#### Development Build
```bash
npm run build
```

#### Package the Application
```bash
npm run package
```

This creates a packaged version in the `out` directory.

#### Create Installers
```bash
npm run make
```

This creates platform-specific installers:
- Windows: `.exe` installer
- Linux: `.deb` and `.rpm` packages
- macOS: `.dmg` (if built on macOS)

### Troubleshooting

#### Application Won't Start
- Ensure Node.js is installed: `node --version`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for port conflicts (port 8080 should be free)

#### Books Won't Open
- Ensure the file is a valid PDF or EPUB
- Check file permissions
- Try a different book to isolate the issue

#### Text-to-Speech Not Working
- Check browser/system audio settings
- Ensure Web Speech API is supported
- Try a different voice in system settings

#### Search Not Finding Results
- Check spelling of search term
- Try different keywords
- Some PDFs may have text as images (not searchable)

### Support

For issues, questions, or feature requests:
- Open an issue on GitHub
- Check the FEATURES.md for detailed feature documentation
- Review the README.md for technical details

### Next Steps

- Explore all features in the FEATURES.md document
- Customize the theme colors in `src/styles/main.css`
- Add keyboard shortcuts in the components
- Contribute improvements via pull requests

Happy Reading! 📚

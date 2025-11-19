# Troubleshooting Guide

Common issues and their solutions for Book Reading Software.

## Installation Issues

### "npm install" fails
**Problem**: Dependencies fail to install

**Solutions**:
1. Update Node.js to latest LTS version
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and `package-lock.json`, then reinstall
4. Check internet connection

### Native module compilation errors
**Problem**: Error compiling native modules

**Solutions**:
1. Install build tools for your platform:
   - Windows: `npm install --global windows-build-tools`
   - macOS: Install Xcode Command Line Tools
   - Linux: Install `build-essential`
2. Update node-gyp: `npm install -g node-gyp`

## Runtime Issues

### Application won't start
**Problem**: Electron window doesn't open

**Solutions**:
1. Check if port 8080 is already in use
2. Verify all dependencies are installed: `npm install`
3. Try running webpack dev server separately: `npm run dev-server`
4. Check console for error messages
5. Delete `dist` folder and rebuild: `npm run build`

### Black/blank screen
**Problem**: Application opens but shows nothing

**Solutions**:
1. Check browser console (View → Toggle Developer Tools)
2. Verify `dist` folder has `index.html` and `bundle.js`
3. Rebuild the application: `npm run build && npm start`
4. Check for JavaScript errors in dev tools

### High CPU usage
**Problem**: Application uses too much CPU

**Solutions**:
1. Close unused books
2. Disable Text-to-Speech if running
3. Reduce PDF zoom level
4. Close and reopen the application
5. Check for infinite loops in dev tools

## File Opening Issues

### Can't open PDF files
**Problem**: PDF files fail to load

**Solutions**:
1. Verify the PDF file is not corrupted
2. Check if the PDF is password-protected (not supported)
3. Ensure the file size is reasonable (< 100MB)
4. Check browser console for errors
5. Verify PDF.js worker is loaded: check `dist/pdfjs-dist/build/`

### Can't open EPUB files
**Problem**: EPUB files fail to load

**Solutions**:
1. Verify the EPUB file is valid
2. Try opening in another EPUB reader to confirm it's not corrupted
3. Check file permissions
4. Look for errors in developer console
5. Try a different EPUB file to isolate the issue

### "File not found" error
**Problem**: Error when trying to open a book

**Solutions**:
1. Ensure the file still exists at its original location
2. Check file permissions
3. Re-import the book
4. Clear application data and re-add books

## Feature Issues

### Text-to-Speech not working
**Problem**: TTS doesn't speak when activated

**Solutions**:
1. Check system audio settings
2. Verify speakers/headphones are connected
3. Test in browser (Web Speech API support required)
4. Try a different voice in system settings
5. Restart the application
6. Check if TTS is supported in your language

### Search not finding results
**Problem**: Search returns no results

**Solutions**:
1. Verify spelling of search term
2. Try different keywords
3. Some PDFs have text as images (not searchable)
4. EPUB files must have extractable text
5. Check if the text is in a different language

### Notes not saving
**Problem**: Notes disappear after closing the app

**Solutions**:
1. Check file permissions for userData directory
2. Verify disk space is available
3. Look for errors in console
4. Try adding a note to a different book
5. Check `userData/books/library.json` exists

### Theme not persisting
**Problem**: Theme resets to light mode

**Solutions**:
1. Check browser localStorage is enabled
2. Clear browser cache and try again
3. Verify no errors in console
4. Try toggling theme multiple times

### Reading progress not saved
**Problem**: Progress resets when reopening a book

**Solutions**:
1. Ensure you're navigating away from the book properly
2. Check file write permissions
3. Look for errors when closing the book
4. Verify `library.json` is being updated

## Performance Issues

### Slow PDF rendering
**Problem**: PDFs take too long to render

**Solutions**:
1. Reduce zoom level
2. Close other applications
3. Try a smaller PDF file
4. Increase available RAM
5. Update graphics drivers

### Slow EPUB loading
**Problem**: EPUB books load slowly

**Solutions**:
1. Check file size (large EPUBs take longer)
2. Ensure adequate RAM is available
3. Close other books/applications
4. Try a different EPUB file

### UI lag/stuttering
**Problem**: Interface is slow or unresponsive

**Solutions**:
1. Close unused books
2. Restart the application
3. Clear browser cache
4. Check for memory leaks in dev tools
5. Update Electron/dependencies

## Build Issues

### "npm run build" fails
**Problem**: Build process throws errors

**Solutions**:
1. Delete `node_modules` and reinstall
2. Delete `dist` folder
3. Check for JavaScript syntax errors
4. Verify webpack.config.js is correct
5. Update webpack and related packages

### "npm run package" fails
**Problem**: Can't create distributable

**Solutions**:
1. Run `npm run build` first
2. Check Electron Forge configuration
3. Verify all dependencies are installed
4. Check available disk space
5. Look for platform-specific errors

## Data Issues

### Lost all books
**Problem**: Bookshelf is empty after restart

**Solutions**:
1. Check `userData/books/library.json`
2. Look for backup files
3. Re-import books from original files
4. Check if app data was cleared
5. Verify file permissions

### Corrupted data
**Problem**: App crashes or shows errors

**Solutions**:
1. Backup `userData/books/library.json`
2. Try manually editing the JSON file
3. Delete corrupt entries
4. Restart with fresh data if needed
5. Re-import books

## Platform-Specific Issues

### Windows: Won't install
**Problem**: Installer fails on Windows

**Solutions**:
1. Run as administrator
2. Disable antivirus temporarily
3. Check Windows version compatibility
4. Verify .NET Framework is installed
5. Try portable version instead

### macOS: "Unidentified Developer"
**Problem**: macOS blocks the app

**Solutions**:
1. Right-click and select "Open"
2. Go to System Preferences → Security & Privacy
3. Click "Open Anyway"
4. Sign the app for distribution

### Linux: Permission denied
**Problem**: Can't run on Linux

**Solutions**:
1. Make executable: `chmod +x book-reader`
2. Install required dependencies
3. Check AppImage/deb/rpm compatibility
4. Run with sudo if needed

## Getting Help

If none of these solutions work:

1. **Check the logs**: Look in developer console for errors
2. **Search issues**: Check GitHub issues for similar problems
3. **Create an issue**: Provide:
   - Operating system and version
   - Node.js and npm versions
   - Steps to reproduce
   - Error messages
   - Screenshots if applicable
4. **Ask the community**: Join discussions in GitHub

## Emergency Reset

If nothing works, reset the application:

```bash
# Backup your data first!
# Then delete application data:
# Windows: %APPDATA%/book-reading-software-minimal
# macOS: ~/Library/Application Support/book-reading-software-minimal
# Linux: ~/.config/book-reading-software-minimal

# Reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
npm start
```

## Reporting Bugs

When reporting bugs, include:
- Operating system and version
- Node.js version: `node --version`
- npm version: `npm --version`
- Electron version (from package.json)
- Steps to reproduce
- Expected vs. actual behavior
- Error messages and screenshots
- Console logs (if available)

This helps maintainers diagnose and fix issues quickly.

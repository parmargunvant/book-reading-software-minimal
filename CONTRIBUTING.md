# Contributing to Book Reading Software

Thank you for your interest in contributing to this project! This document provides guidelines for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/book-reading-software-minimal.git`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## Development Workflow

### Running in Development Mode
```bash
npm start
```
This starts the webpack dev server and launches Electron in development mode.

### Building for Production
```bash
npm run build
```

### Code Style
- Use ES6+ JavaScript features
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable and function names

### Project Structure
- `main.js` - Electron main process
- `preload.js` - Secure IPC bridge
- `src/App.js` - Main React application
- `src/components/` - React components
- `src/styles/` - CSS stylesheets
- `public/` - Static assets

## Making Changes

### Adding Features
1. Create a new component in `src/components/` if needed
2. Update relevant components to integrate the feature
3. Test thoroughly in both light and dark modes
4. Update documentation

### Fixing Bugs
1. Identify the root cause
2. Write a test to reproduce the bug (if applicable)
3. Fix the bug
4. Verify the fix works
5. Update documentation if needed

### Improving Performance
- Profile the application to identify bottlenecks
- Optimize rendering performance
- Reduce bundle size where possible
- Test on lower-end hardware

## Testing

### Manual Testing Checklist
- [ ] Open and read PDF files
- [ ] Open and read EPUB files
- [ ] Test Text-to-Speech functionality
- [ ] Search within books
- [ ] Add and view notes
- [ ] Toggle between light and dark modes
- [ ] Verify reading progress is saved
- [ ] Test bookshelf operations (add/delete books)
- [ ] Test zoom controls (PDF only)

### Security Testing
Before submitting, run:
```bash
npm audit
```
Address any security vulnerabilities.

## Submitting Changes

### Pull Request Process
1. Update the README.md with details of changes if needed
2. Update FEATURES.md if you've added new features
3. Ensure your code follows the project's code style
4. Test your changes thoroughly
5. Create a pull request with a clear description

### Pull Request Guidelines
- Use a clear and descriptive title
- Include a detailed description of changes
- Reference any related issues
- Include screenshots for UI changes
- Ensure all tests pass (when tests are available)

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove, etc.)
- Keep the first line under 50 characters
- Add detailed description if needed

Examples:
- `Add bookmark functionality`
- `Fix PDF zoom rendering issue`
- `Update dark mode colors for better contrast`

## Feature Requests

To request a new feature:
1. Check if the feature has already been requested
2. Open an issue with the "feature request" label
3. Clearly describe the feature and its benefits
4. Explain how it fits with the "minimal" philosophy

## Bug Reports

To report a bug:
1. Check if the bug has already been reported
2. Open an issue with the "bug" label
3. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable
   - System information (OS, Electron version, etc.)

## Design Philosophy

This project follows a "minimal" design philosophy:
- **Essential features only**: No feature bloat
- **Clean interface**: Distraction-free reading experience
- **Fast performance**: Lightweight and responsive
- **Simple codebase**: Easy to understand and maintain

When contributing, keep these principles in mind.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the project
- Show empathy towards others

## Questions?

If you have questions about contributing, feel free to:
- Open an issue for discussion
- Contact the maintainers
- Join discussions in existing issues

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉

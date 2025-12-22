# Contributing

Thank you for your interest in contributing to room-ui!

## How to Contribute

### Reporting Issues

- Use GitHub Issues to report bugs or request features
- Include reproduction steps for bugs
- Describe expected vs actual behavior

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run tests and type checking: `npm run type-check && npm run lint`
5. Commit with a descriptive message
6. Push to your fork
7. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/room-ui.git
cd room-ui

# Install dependencies
npm install

# Start development
npm run storybook
```

## Commit Messages

Use conventional commit format:

```
type(scope): description

[optional body]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

Examples:
```
feat(button): add outline variant
fix(datatable): fix sorting on nested columns
docs(readme): update installation instructions
```

## Code Style

- TypeScript strict mode
- Functional components with hooks
- forwardRef for DOM components
- JSDoc comments for public APIs
- Tailwind CSS for styling

## Testing Checklist

Before submitting a PR:

- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] Storybook stories work correctly
- [ ] Component works in dark theme

## Questions?

Open an issue or discussion on GitHub.

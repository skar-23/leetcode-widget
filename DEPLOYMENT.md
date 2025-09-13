# Deployment Guide

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy on pushes to the `main` branch

2. **Automatic Deployment**:
   - The `.github/workflows/nextjs.yml` workflow handles the build and deployment
   - Pushes to `main` branch trigger automatic builds
   - Static files are generated in the `/out` directory
   - Site is deployed to `https://<username>.github.io/<repository-name>`

### Build Process

The application uses Next.js static export:

```bash
# Install dependencies
npm ci

# Build for production (static export)
npm run build

# Output files are generated in ./out/ directory
```

### Development

```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Run type checking
npm run typecheck
```

### Project Structure

- **Static Export**: Configured in `next.config.ts` with `output: 'export'`
- **LeetCode Integration**: Fetches user data from LeetCode GraphQL API
- **Responsive Design**: Built with Tailwind CSS and Radix UI components
- **Error Handling**: Gracefully handles API failures during static generation

### Troubleshooting

- **Build Failures**: Ensure no server actions are used (incompatible with static export)
- **API Errors**: LeetCode API calls may fail during static generation - this is expected and handled gracefully
- **Images**: All images are configured with `unoptimized: true` for static export

### Features

- 📊 LeetCode profile statistics dashboard
- 🔥 Submission heatmap visualization
- 🏆 Contest performance tracking
- 🎯 Daily challenge progress
- 💡 Progress insights and motivation
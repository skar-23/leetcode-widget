# LeetCode Progress Tracker

A beautiful, responsive dashboard to track your LeetCode progress with visual analytics and motivational insights.

## 🚀 Features

- 📊 **Progress Dashboard**: View your LeetCode statistics at a glance
- 🔥 **Submission Heatmap**: Visualize your coding activity over time
- 🏆 **Contest Performance**: Track your contest ratings and rankings
- 🎯 **Daily Challenges**: Monitor your daily problem-solving streak
- 💡 **Progress Insights**: Get motivational messages based on your achievements
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices

## 🛠️ Tech Stack

- **Next.js 15** - React framework with static export
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component library
- **Recharts** - Data visualization
- **LeetCode GraphQL API** - Real-time data fetching

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/skar-23/leetcode-widget.git
cd leetcode-widget
```

2. Install dependencies:
```bash
npm install
```

3. Update the username in `src/app/page.tsx`:
```typescript
const username = 'your-leetcode-username'; // Replace with your username
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:9002](http://localhost:9002) in your browser.

## 📦 Build & Deploy

### Static Export

```bash
# Build for production
npm run build

# Files will be generated in ./out directory
```

### GitHub Pages Deployment

This project is configured for automatic GitHub Pages deployment:

1. Fork this repository
2. Enable GitHub Pages in Settings → Pages → Source: "GitHub Actions"
3. Push to the `main` branch to trigger automatic deployment
4. Your site will be available at `https://username.github.io/leetcode-widget`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🧪 Development

```bash
# Run development server
npm run dev

# Run linting
npm run lint

# Type checking
npm run typecheck

# Build for production
npm run build
```

## 🎨 Customization

- **Username**: Update in `src/app/page.tsx`
- **Styling**: Modify Tailwind classes or update `tailwind.config.ts`
- **Components**: Customize dashboard components in `src/components/dashboard/`
- **Data**: The app fetches real-time data from LeetCode's public GraphQL API

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

To get started, take a look at src/app/page.tsx.

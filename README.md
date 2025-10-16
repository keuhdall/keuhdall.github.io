# Leonard Marques - Software Engineer Portfolio

An interactive terminal-style portfolio website showcasing my skills. Built with React, TypeScript, and Vite, designed to look and feel like a real command-line interface.

## 🚀 Features

- **Interactive CLI Interface**: Type commands to explore my portfolio
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern Terminal Styling**: Authentic terminal appearance with animations
- **Comprehensive Portfolio**: Skills, projects, experience, and contact information
- **GitHub Pages Ready**: Optimized for deployment on GitHub Pages

## 🛠️ Available Commands

- `help` - Show available commands
- `about` - Learn about me and my background
- `skills` - View my technical skills and expertise
- `projects` - See examples of my work
- `experience` - Professional experience and education
- `contact` - Get in touch with me
- `clear` - Clear the terminal
- `whoami` - Display current user
- `date` - Show current date and time
- `ls` - List available files
- `cat resume.txt` - View my resume
- `echo` - Echo back your input
- `2048` - Play a text-based 2048 game (easter egg!)

## 🏗️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: CSS3 with modern features (gradients, animations, responsive design)
- **Package Manager**: Bun (fast, modern JavaScript runtime)
- **Deployment**: GitHub Pages
- **Build Tool**: Vite with optimized configuration

## ⚡ Why Bun?

This project uses Bun for package management while maintaining Vite compatibility:

- **🚀 Speed**: 3-5x faster than npm/yarn for package installation
- **📦 Package Management**: Uses `bun install` for faster dependency resolution
- **🔧 CI/CD**: GitHub Actions use Bun for faster builds in production
- **🛠️ Compatibility**: Scripts use npm for Vite compatibility, but Bun handles package management

## 🚀 Getting Started

### Prerequisites

- Bun (latest version)
- Node.js (v18 or higher) - for compatibility

### Installation

1. Clone the repository:
```bash
git clone https://github.com/keuhdall/keuhdall.github.io.git
cd keuhdall.github.io
```

2. Install dependencies:
```bash
bun install
# or alternatively: npm install
```

3. Start the development server:
```bash
npm run dev
# Note: Using npm for scripts due to Vite compatibility
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📦 Deployment

### GitHub Actions (Automated - Recommended)

The project is configured with GitHub Actions for automatic deployment:

1. **Automatic Deployment**: 
   - Push to `main` or `master` branch triggers automatic deployment
   - Pull requests trigger build tests
   - No manual intervention required

2. **GitHub Pages Setup**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"
   - Your site will be available at `https://keuhdall.github.io/`

3. **Workflow Files**:
   - `.github/workflows/deploy.yml` - Main deployment workflow
   - `.github/workflows/test.yml` - Build testing for PRs

4. **Troubleshooting**:
   - If you get MIME type errors, ensure GitHub Pages is set to "GitHub Actions" source
   - The `_headers` file ensures proper MIME types for JavaScript modules
   - The `.nojekyll` file prevents Jekyll processing conflicts

### Manual Deployment (Fallback)

If you need to deploy manually:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy:manual
   ```

3. **Alternative**: Copy the contents of the `dist` folder to your web server

## 🎨 Customization

### Adding New Commands

To add new commands, edit the `commands` object in `src/App.tsx`:

```typescript
const commands = {
  // ... existing commands
  newcommand: () => 'This is a new command!',
}
```

### Styling

The terminal styling is defined in `src/App.css`. Key classes:
- `.terminal` - Main terminal container
- `.terminal-header` - Terminal title bar
- `.terminal-body` - Terminal content area
- `.command-input` - Command input styling
- `.command-output` - Command output styling

### Content

All content is now stored in separate text files in `src/content/` for easy editing:

- **src/content/about.txt** - Your background and expertise
- **src/content/skills.txt** - Your technical skills
- **src/content/projects.txt** - Your project showcase
- **src/content/experience.txt** - Your professional experience
- **src/content/contact.txt** - Your contact information
- **src/content/welcome.txt** - ASCII art welcome message
- **src/content/help.txt** - Help command content
- **src/content/resume.txt** - Resume content

**To update content:**
1. Edit any `.txt` file in `src/content/`
2. Save the file
3. Changes are reflected immediately (no code changes needed)

**Content helper script:**
```bash
node scripts/edit-content.js about    # View about content
node scripts/edit-content.js contact  # View contact content
```

## 📱 Responsive Design

The terminal interface is fully responsive and adapts to different screen sizes:
- Desktop: Full terminal experience
- Tablet: Optimized layout with adjusted font sizes
- Mobile: Stacked layout for better readability

## 🔧 Configuration

### Vite Configuration

The project is configured for GitHub Pages deployment in `vite.config.ts`:
- Base path set to `/` for root domain deployment
- Optimized build settings
- Asset optimization

### Package.json Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Build and deploy to GitHub Pages
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## 📞 Contact

- **Email**: leonard@example.com
- **LinkedIn**: [https://www.linkedin.com/in/léonard-marques-693b55135/]https://www.linkedin.com/in/l%C3%A9onard-marques-693b55135/)
- **GitHub**: [github.com/keuhdall](https://github.com/keuhdall)

---

Built with ❤️ by Leonard Marques
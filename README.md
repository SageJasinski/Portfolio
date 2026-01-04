# Sage Jasinski - Film Editor Portfolio

A cinematic portfolio website featuring animated intro, spotlight cursor, movie poster gallery, and immersive sound design.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Features

- 🎬 **Cinematic Intro Animation** - Studio-style intro with your name
- ✨ **Spotlight Cursor** - Soft light follows your cursor
- 🎞️ **Movie Poster Gallery** - Projects displayed as film posters
- 🔊 **Sound Design** - Immersive audio for interactions
- 🎨 **Dark Theme** - Elegant black & gold aesthetic

## Adding New Projects

Edit `src/data/projects.js` to add your projects:

```javascript
{
  id: 7, // Unique number
  title: 'Your Project',
  category: 'short film', // Options: 'short film', 'commercial', 'music video', 'documentary'
  year: '2024',
  poster: '/posters/your-project.jpg', // Place in public/posters/
  description: 'Description of your project',
  role: 'Lead Editor',
  duration: '10 minutes',
  client: 'Client Name',
  tools: ['Premiere Pro', 'DaVinci Resolve'],
  videoUrl: 'https://vimeo.com/...' // Optional
}
```

### Poster Images

1. Create folder: `public/posters/`
2. Add images in 2:3 aspect ratio (movie poster style)
3. Reference as: `/posters/filename.jpg`

## Adding Sounds

Place sound files in `public/sounds/`:
- `projector-start.mp3`
- `projector-loop.mp3`
- `film-flicker.mp3`
- `reel-load.mp3`
- `whoosh.mp3`
- `click.mp3`
- `hover.mp3`

## Customizing

### Social Links
Edit `src/components/Layout.jsx` - update the `href` attributes in the footer social links.

### Contact Info
Edit `src/pages/Contact.jsx` - update email and location.

### Colors
Edit `src/index.css` - modify the CSS custom properties in `:root`.

## Tech Stack

- React 18
- Vite
- Framer Motion
- React Router DOM

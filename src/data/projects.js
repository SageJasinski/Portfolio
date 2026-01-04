// Project data - Easy to add new projects
// Just add a new object to this array with the project details
// For poster images, place them in /public/posters/

export const projects = [
    {
        id: 1,
        title: 'Project One',
        category: 'short film',
        year: '2024',
        poster: null, // Add poster path: '/posters/project-one.jpg'
        description: 'A compelling short film exploring themes of identity and belonging.',
        role: 'Lead Editor',
        duration: '12 minutes',
        client: 'Independent Production',
        tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
        videoUrl: null, // Add video URL for embedding
    },
    {
        id: 2,
        title: 'Project Two',
        category: 'commercial',
        year: '2024',
        poster: null,
        description: 'Dynamic commercial showcasing product innovation and brand story.',
        role: 'Editor',
        duration: '60 seconds',
        client: 'Brand Name',
        tools: ['Premiere Pro', 'After Effects'],
        videoUrl: null,
    },
    {
        id: 3,
        title: 'Project Three',
        category: 'music video',
        year: '2023',
        poster: null,
        description: 'High-energy music video with creative visual storytelling.',
        role: 'Lead Editor',
        duration: '4 minutes',
        client: 'Artist Name',
        tools: ['Premiere Pro', 'DaVinci Resolve'],
        videoUrl: null,
    },
    {
        id: 4,
        title: 'Project Four',
        category: 'documentary',
        year: '2023',
        poster: null,
        description: 'Documentary exploring untold stories and human experiences.',
        role: 'Editor',
        duration: '45 minutes',
        client: 'Documentary Studios',
        tools: ['Premiere Pro', 'DaVinci Resolve', 'Pro Tools'],
        videoUrl: null,
    },
    {
        id: 5,
        title: 'Project Five',
        category: 'short film',
        year: '2023',
        poster: null,
        description: 'Award-winning narrative short with emotional depth.',
        role: 'Lead Editor',
        duration: '18 minutes',
        client: 'Film Collective',
        tools: ['Premiere Pro', 'After Effects'],
        videoUrl: null,
    },
    {
        id: 6,
        title: 'Project Six',
        category: 'commercial',
        year: '2022',
        poster: null,
        description: 'Brand campaign highlighting sustainability and innovation.',
        role: 'Editor',
        duration: '30 seconds',
        client: 'Corporate Client',
        tools: ['Premiere Pro', 'After Effects'],
        videoUrl: null,
    },
]

/*
 * HOW TO ADD A NEW PROJECT:
 * 
 * 1. Add a new object to the projects array above
 * 2. Include the following fields:
 *    - id: Unique number
 *    - title: Project name
 *    - category: 'short film', 'commercial', 'music video', 'documentary', etc.
 *    - year: Year completed
 *    - poster: Path to poster image (place in /public/posters/)
 *    - description: Brief project description
 *    - role: Your role on the project
 *    - duration: Length of the final piece
 *    - client: Client or production company name
 *    - tools: Array of software/tools used
 *    - videoUrl: Optional URL for video embed (Vimeo, YouTube, etc.)
 * 
 * 3. For poster images:
 *    - Create a /public/posters/ folder
 *    - Add poster images in 2:3 aspect ratio (movie poster style)
 *    - Reference them as '/posters/your-image.jpg'
 */

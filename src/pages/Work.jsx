import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '../context/AudioContext'
import ProjectModal from '../components/ProjectModal'
import { projects } from '../data/projects'
import './Work.css'

function Work() {
    const [selectedProject, setSelectedProject] = useState(null)
    const [filter, setFilter] = useState('all')
    const { playSound } = useAudio()

    const categories = ['all', ...new Set(projects.map(p => p.category))]

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter)

    const handleProjectClick = (project) => {
        playSound('reelLoad', { volume: 0.3 })
        setSelectedProject(project)
    }

    const handleCloseModal = () => {
        setSelectedProject(null)
    }

    return (
        <div className="work page">
            {/* Hero Section */}
            <section className="work-hero section">
                <div className="container">
                    <motion.div
                        className="work-hero-content"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="work-label">Portfolio</span>
                        <h1 className="work-title">
                            Selected
                            <br />
                            <span className="text-gold-gradient">Projects</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Filter */}
            <section className="work-filter">
                <div className="container">
                    <motion.div
                        className="filter-buttons"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`filter-btn ${filter === category ? 'active' : ''}`}
                                onClick={() => {
                                    setFilter(category)
                                    playSound('click', { volume: 0.15 })
                                }}
                                onMouseEnter={() => playSound('hover', { volume: 0.05 })}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Project Gallery - Movie Poster Style */}
            <section className="work-gallery section">
                <div className="container">
                    <motion.div
                        className="poster-grid"
                        layout
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    className="poster-card"
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    onClick={() => handleProjectClick(project)}
                                    onMouseEnter={() => playSound('filmFlicker', { volume: 0.05 })}
                                    data-spotlight-hover
                                >
                                    {/* Poster Image */}
                                    <div className="poster-image">
                                        {project.poster ? (
                                            <img src={project.poster} alt={project.title} />
                                        ) : (
                                            <div className="poster-placeholder">
                                                <svg viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
                                                </svg>
                                                <span>{project.title}</span>
                                            </div>
                                        )}

                                        {/* Spotlight overlay on hover */}
                                        <div className="poster-spotlight" />

                                        {/* Hover overlay */}
                                        <div className="poster-overlay">
                                            <div className="poster-overlay-content">
                                                <span className="poster-category">{project.category}</span>
                                                <h3 className="poster-title">{project.title}</h3>
                                                <span className="poster-year">{project.year}</span>
                                                <div className="poster-cta">
                                                    <span>View Project</span>
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Film sprocket holes decoration */}
                                    <div className="poster-sprockets left" />
                                    <div className="poster-sprockets right" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Project Modal with Reel Loading Animation */}
            <ProjectModal
                project={selectedProject}
                onClose={handleCloseModal}
            />
        </div>
    )
}

export default Work

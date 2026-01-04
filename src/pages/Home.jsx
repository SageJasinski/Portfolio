import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAudio } from '../context/AudioContext'
import './Home.css'

function Home() {
    const { playSound } = useAudio()

    const handleButtonHover = () => {
        playSound('hover', { volume: 0.1 })
    }

    return (
        <div className="home page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background">
                    {/* Animated gradient orbs */}
                    <div className="orb orb-1" />
                    <div className="orb orb-2" />
                    <div className="orb orb-3" />
                </div>

                <div className="container hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <span className="hero-label">FILM EDITOR</span>
                    </motion.div>

                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    >
                        Crafting Stories
                        <br />
                        <span className="text-gold-gradient">Frame by Frame</span>
                    </motion.h1>

                    <motion.p
                        className="hero-description"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                        Transforming raw footage into compelling narratives that captivate audiences
                        and bring creative visions to life.
                    </motion.p>

                    <motion.div
                        className="hero-actions"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <Link
                            to="/work"
                            className="btn btn-primary"
                            onMouseEnter={handleButtonHover}
                        >
                            View My Work
                        </Link>
                        <Link
                            to="/contact"
                            className="btn btn-outline"
                            onMouseEnter={handleButtonHover}
                        >
                            Get in Touch
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="scroll-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <span>Scroll</span>
                    <div className="scroll-line">
                        <div className="scroll-dot" />
                    </div>
                </motion.div>
            </section>

            {/* Featured Work Preview */}
            <section className="featured section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="section-title">Featured Work</h2>
                    </motion.div>

                    <div className="featured-grid">
                        {/* Placeholder cards - will be replaced with actual projects */}
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                className="featured-card"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.8, delay: i * 0.15 }}
                                onMouseEnter={() => playSound('hover', { volume: 0.05 })}
                            >
                                <div className="featured-card-image">
                                    <div className="featured-card-placeholder">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
                                        </svg>
                                    </div>
                                    <div className="featured-card-overlay">
                                        <span className="featured-card-cta">View Project</span>
                                    </div>
                                </div>
                                <div className="featured-card-content">
                                    <span className="featured-card-category">Project Category</span>
                                    <h3 className="featured-card-title">Project Title {i}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="featured-cta"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Link
                            to="/work"
                            className="btn btn-outline"
                            onMouseEnter={handleButtonHover}
                        >
                            View All Work
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Brief About Section */}
            <section className="home-about section">
                <div className="container">
                    <div className="home-about-content">
                        <motion.div
                            className="home-about-text"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="section-title">The Art of Editing</h2>
                            <p>
                                Every cut tells a story. Every transition evokes emotion. As a film editor,
                                I believe that the magic of cinema lives in the space between frames—where
                                rhythm, pacing, and visual poetry come together to create something greater
                                than the sum of its parts.
                            </p>
                            <Link
                                to="/about"
                                className="btn btn-outline"
                                onMouseEnter={handleButtonHover}
                            >
                                Learn More About Me
                            </Link>
                        </motion.div>

                        <motion.div
                            className="home-about-visual"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="film-strip">
                                <div className="film-frame" />
                                <div className="film-frame" />
                                <div className="film-frame" />
                                <div className="film-frame" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '../context/AudioContext'
import './ProjectModal.css'

function ProjectModal({ project, onClose }) {
    const [phase, setPhase] = useState(0) // 0: closed, 1: reel loading, 2: content visible
    const { playSound, stopSound } = useAudio()

    useEffect(() => {
        if (project) {
            // Start reel loading animation
            setPhase(1)
            const reelSound = playSound('reelLoad', { volume: 0.3 })

            // Transition to content after animation
            const timer = setTimeout(() => {
                setPhase(2)
                stopSound(reelSound)
            }, 2000)

            return () => {
                clearTimeout(timer)
                stopSound(reelSound)
            }
        } else {
            setPhase(0)
        }
    }, [project, playSound, stopSound])

    const handleClose = () => {
        playSound('click', { volume: 0.2 })
        setPhase(0)
        setTimeout(onClose, 300)
    }

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && project) {
                handleClose()
            }
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [project])

    if (!project && phase === 0) return null

    return (
        <AnimatePresence>
            {(project || phase > 0) && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleClose}
                >
                    {/* Reel Loading Animation */}
                    <AnimatePresence>
                        {phase === 1 && (
                            <motion.div
                                className="reel-loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="projector">
                                    {/* Film reel spinning */}
                                    <motion.div
                                        className="reel reel-top"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    >
                                        <svg viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
                                            <circle cx="50" cy="20" r="8" fill="currentColor" />
                                            <circle cx="50" cy="80" r="8" fill="currentColor" />
                                            <circle cx="20" cy="50" r="8" fill="currentColor" />
                                            <circle cx="80" cy="50" r="8" fill="currentColor" />
                                            <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    </motion.div>

                                    {/* Film strip feeding through */}
                                    <motion.div
                                        className="film-feed"
                                        initial={{ height: 0 }}
                                        animate={{ height: '100%' }}
                                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                                    />

                                    {/* Bottom reel */}
                                    <motion.div
                                        className="reel reel-bottom"
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                                    >
                                        <svg viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
                                            <circle cx="50" cy="20" r="8" fill="currentColor" />
                                            <circle cx="50" cy="80" r="8" fill="currentColor" />
                                            <circle cx="20" cy="50" r="8" fill="currentColor" />
                                            <circle cx="80" cy="50" r="8" fill="currentColor" />
                                            <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    </motion.div>
                                </div>

                                <motion.p
                                    className="loading-text"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Loading Reel...
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Project Content */}
                    <AnimatePresence>
                        {phase === 2 && project && (
                            <motion.div
                                className="modal-content"
                                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close button */}
                                <button className="modal-close" onClick={handleClose}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>

                                <div className="modal-grid">
                                    {/* Poster */}
                                    <div className="modal-poster">
                                        {project.poster ? (
                                            <img src={project.poster} alt={project.title} />
                                        ) : (
                                            <div className="poster-placeholder-large">
                                                <svg viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="modal-details">
                                        <span className="modal-category">{project.category}</span>
                                        <h2 className="modal-title">{project.title}</h2>
                                        <span className="modal-year">{project.year}</span>

                                        <p className="modal-description">{project.description}</p>

                                        <div className="modal-meta">
                                            <div className="meta-item">
                                                <span className="meta-label">Role</span>
                                                <span className="meta-value">{project.role}</span>
                                            </div>
                                            <div className="meta-item">
                                                <span className="meta-label">Duration</span>
                                                <span className="meta-value">{project.duration}</span>
                                            </div>
                                            <div className="meta-item">
                                                <span className="meta-label">Client</span>
                                                <span className="meta-value">{project.client}</span>
                                            </div>
                                        </div>

                                        <div className="modal-tools">
                                            <span className="meta-label">Tools Used</span>
                                            <div className="tools-list">
                                                {project.tools?.map((tool, i) => (
                                                    <span key={i} className="tool-tag">{tool}</span>
                                                ))}
                                            </div>
                                        </div>

                                        {project.videoUrl && (
                                            <a
                                                href={project.videoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary watch-btn"
                                            >
                                                Watch Project
                                                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ProjectModal

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '../context/AudioContext'
import './IntroAnimation.css'

function IntroAnimation({ onComplete, isComplete }) {
    const [phase, setPhase] = useState(0)
    const { playSound, initAudio } = useAudio()
    const hasStarted = useRef(false)

    useEffect(() => {
        if (hasStarted.current) return
        hasStarted.current = true

        // Initialize audio on first interaction
        const handleInteraction = () => {
            initAudio()
            document.removeEventListener('click', handleInteraction)
        }
        document.addEventListener('click', handleInteraction)

        // Phase timing
        const timings = [
            { delay: 500, phase: 1 },   // Start film flicker
            { delay: 1500, phase: 2 },  // Show film reel
            { delay: 2500, phase: 3 },  // Show name
            { delay: 4000, phase: 4 },  // Show tagline
            { delay: 5500, phase: 5 },  // Fade out
            { delay: 6500, complete: true }, // Complete
        ]

        timings.forEach(({ delay, phase: p, complete }) => {
            setTimeout(() => {
                if (complete) {
                    onComplete()
                } else {
                    setPhase(p)
                    // Play sounds at appropriate phases
                    if (p === 1) playSound('projectorStart', { volume: 0.3 })
                    if (p === 3) playSound('filmFlicker', { volume: 0.2 })
                }
            }, delay)
        })

        return () => {
            document.removeEventListener('click', handleInteraction)
        }
    }, [onComplete, playSound, initAudio])

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="intro-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                    {/* Film grain effect */}
                    <div className="intro-grain" />

                    {/* Vignette */}
                    <div className="intro-vignette" />

                    {/* Film flicker effect */}
                    <motion.div
                        className="film-flicker"
                        animate={{
                            opacity: phase >= 1 ? [0.02, 0.05, 0.02, 0.04, 0.02] : 0,
                        }}
                        transition={{
                            duration: 0.2,
                            repeat: phase >= 1 && phase < 5 ? Infinity : 0,
                            repeatType: 'loop',
                        }}
                    />

                    {/* Projector light beam */}
                    {phase >= 1 && phase < 5 && (
                        <motion.div
                            className="projector-beam"
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{ opacity: 0.1, scaleY: 1 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    )}

                    {/* Film reel icon */}
                    <AnimatePresence>
                        {phase >= 2 && phase < 5 && (
                            <motion.div
                                className="film-reel"
                                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                            >
                                <svg viewBox="0 0 100 100" className="reel-svg">
                                    <defs>
                                        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#ffd700" />
                                            <stop offset="50%" stopColor="#d4af37" />
                                            <stop offset="100%" stopColor="#ffd700" />
                                        </linearGradient>
                                    </defs>
                                    <motion.circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="url(#goldGradient)"
                                        strokeWidth="3"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                        style={{ transformOrigin: 'center' }}
                                    />
                                    <circle cx="50" cy="20" r="8" fill="url(#goldGradient)" />
                                    <circle cx="50" cy="80" r="8" fill="url(#goldGradient)" />
                                    <circle cx="20" cy="50" r="8" fill="url(#goldGradient)" />
                                    <circle cx="80" cy="50" r="8" fill="url(#goldGradient)" />
                                    <circle cx="50" cy="50" r="15" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
                                </svg>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Name reveal */}
                    <div className="intro-content">
                        <AnimatePresence>
                            {phase >= 3 && (
                                <motion.div
                                    className="name-container"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <motion.h1 className="intro-name">
                                        {'SAGE JASINSKI'.split('').map((char, i) => (
                                            <motion.span
                                                key={i}
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: i * 0.08,
                                                    ease: [0.2, 0.8, 0.2, 1],
                                                }}
                                            >
                                                {char === ' ' ? '\u00A0' : char}
                                            </motion.span>
                                        ))}
                                    </motion.h1>

                                    {/* Decorative line */}
                                    <motion.div
                                        className="intro-line"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                                    />

                                    {/* Tagline */}
                                    {phase >= 4 && (
                                        <motion.p
                                            className="intro-tagline"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            FILM EDITOR
                                        </motion.p>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Skip button */}
                    <motion.button
                        className="skip-intro"
                        onClick={onComplete}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        Skip Intro
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default IntroAnimation

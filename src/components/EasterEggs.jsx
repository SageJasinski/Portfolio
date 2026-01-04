import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './EasterEggs.css'

// Konami Code: up, up, down, down, left, right, left, right, b, a
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']

// Film quote easter egg - triggered by typing "action"
const ACTION_CODE = ['KeyA', 'KeyC', 'KeyT', 'KeyI', 'KeyO', 'KeyN']

function EasterEggs() {
    const [konamiIndex, setKonamiIndex] = useState(0)
    const [actionIndex, setActionIndex] = useState(0)
    const [showDirectorMode, setShowDirectorMode] = useState(false)
    const [showAction, setShowAction] = useState(false)
    const [clickCount, setClickCount] = useState(0)
    const [showFilmBurn, setShowFilmBurn] = useState(false)

    // Keyboard easter eggs
    const handleKeyDown = useCallback((e) => {
        // Konami code detection
        if (e.code === KONAMI_CODE[konamiIndex]) {
            const nextIndex = konamiIndex + 1
            if (nextIndex === KONAMI_CODE.length) {
                setShowDirectorMode(true)
                setKonamiIndex(0)
                setTimeout(() => setShowDirectorMode(false), 5000)
            } else {
                setKonamiIndex(nextIndex)
            }
        } else {
            setKonamiIndex(0)
        }

        // "Action" code detection
        if (e.code === ACTION_CODE[actionIndex]) {
            const nextIndex = actionIndex + 1
            if (nextIndex === ACTION_CODE.length) {
                setShowAction(true)
                setActionIndex(0)
                setTimeout(() => setShowAction(false), 3000)
            } else {
                setActionIndex(nextIndex)
            }
        } else {
            setActionIndex(0)
        }
    }, [konamiIndex, actionIndex])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    // Logo click easter egg - rapid clicks trigger film burn effect
    useEffect(() => {
        const handleLogoClick = (e) => {
            if (e.target.closest('.logo')) {
                setClickCount(prev => prev + 1)
            }
        }

        const resetClickCount = setInterval(() => {
            setClickCount(0)
        }, 2000)

        document.addEventListener('click', handleLogoClick)

        return () => {
            document.removeEventListener('click', handleLogoClick)
            clearInterval(resetClickCount)
        }
    }, [])

    // Trigger film burn on 5 rapid clicks
    useEffect(() => {
        if (clickCount >= 5) {
            setShowFilmBurn(true)
            setClickCount(0)
            setTimeout(() => setShowFilmBurn(false), 2000)
        }
    }, [clickCount])

    return (
        <>
            {/* Director Mode Overlay - Konami Code Easter Egg */}
            <AnimatePresence>
                {showDirectorMode && (
                    <motion.div
                        className="easter-egg director-mode"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="director-frame">
                            <div className="frame-corner top-left" />
                            <div className="frame-corner top-right" />
                            <div className="frame-corner bottom-left" />
                            <div className="frame-corner bottom-right" />
                            <div className="frame-label">
                                <span className="rec-dot" />
                                REC
                            </div>
                            <div className="timecode">00:00:00:00</div>
                        </div>
                        <div className="director-text">
                            🎬 DIRECTOR MODE ACTIVATED
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Action! Overlay - Type "action" Easter Egg */}
            <AnimatePresence>
                {showAction && (
                    <motion.div
                        className="easter-egg action-overlay"
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <div className="clapperboard">
                            <motion.div
                                className="clapper-stick"
                                initial={{ rotate: -30 }}
                                animate={{ rotate: 0 }}
                                transition={{ delay: 0.1, type: 'spring', stiffness: 500 }}
                            />
                            <div className="clapper-board">
                                <span>ACTION!</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Film Burn Effect - 5 rapid logo clicks */}
            <AnimatePresence>
                {showFilmBurn && (
                    <motion.div
                        className="easter-egg film-burn-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 2, times: [0, 0.1, 0.8, 1] }}
                    >
                        <div className="film-burn" />
                        <div className="film-burn burn-2" />
                        <div className="film-burn burn-3" />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default EasterEggs

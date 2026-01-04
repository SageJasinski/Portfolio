import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Components
import IntroAnimation from './components/IntroAnimation'
import Layout from './components/Layout'
import SpotlightCursor from './components/SpotlightCursor'
import EasterEggs from './components/EasterEggs'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import Contact from './pages/Contact'

// Context
import { AudioProvider } from './context/AudioContext'

import './App.css'

function AnimatedRoutes() {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="work" element={<Work />} />
                    <Route path="contact" element={<Contact />} />
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

function App() {
    const [introComplete, setIntroComplete] = useState(false)
    const [showIntro, setShowIntro] = useState(true)

    useEffect(() => {
        // Check if user has seen intro this session
        const hasSeenIntro = sessionStorage.getItem('introSeen')
        if (hasSeenIntro) {
            setShowIntro(false)
            setIntroComplete(true)
        }
    }, [])

    const handleIntroComplete = () => {
        setIntroComplete(true)
        sessionStorage.setItem('introSeen', 'true')
        // Small delay before hiding intro to allow fade out
        setTimeout(() => setShowIntro(false), 500)
    }

    return (
        <AudioProvider>
            <Router>
                {showIntro && (
                    <IntroAnimation
                        onComplete={handleIntroComplete}
                        isComplete={introComplete}
                    />
                )}

                {introComplete && (
                    <>
                        <SpotlightCursor />
                        <EasterEggs />
                        <div className="film-grain" aria-hidden="true" />
                        <AnimatedRoutes />
                    </>
                )}
            </Router>
        </AudioProvider>
    )
}

export default App

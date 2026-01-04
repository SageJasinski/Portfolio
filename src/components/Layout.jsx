import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAudio } from '../context/AudioContext'
import MuteButton from './MuteButton'
import './Layout.css'

const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/work', label: 'Work' },
    { path: '/contact', label: 'Contact' },
]

function Layout() {
    const location = useLocation()
    const { playSound } = useAudio()

    const handleNavHover = () => {
        playSound('hover', { volume: 0.1 })
    }

    const handleNavClick = () => {
        playSound('click', { volume: 0.2 })
    }

    return (
        <div className="layout">
            {/* Header */}
            <header className="header">
                <div className="header-container">
                    <NavLink to="/" className="logo" onClick={handleNavClick}>
                        <span className="logo-text">SJ</span>
                    </NavLink>

                    <nav className="nav">
                        <ul className="nav-list">
                            {navItems.map(({ path, label }) => (
                                <li key={path} className="nav-item">
                                    <NavLink
                                        to={path}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? 'active' : ''}`
                                        }
                                        onMouseEnter={handleNavHover}
                                        onClick={handleNavClick}
                                    >
                                        {label}
                                        <span className="nav-underline" />
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <MuteButton />
                </div>
            </header>

            {/* Main Content with Page Transitions */}
            <main className="main">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                        duration: 0.4,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                >
                    <Outlet />
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-left">
                        <span className="footer-logo">SAGE JASINSKI</span>
                        <span className="footer-tagline">Film Editor</span>
                    </div>

                    <div className="footer-social">
                        <a
                            href="#"
                            className="social-link"
                            aria-label="Instagram"
                            onMouseEnter={handleNavHover}
                            data-spotlight-hover
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="social-link"
                            aria-label="Vimeo"
                            onMouseEnter={handleNavHover}
                            data-spotlight-hover
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="social-link"
                            aria-label="LinkedIn"
                            onMouseEnter={handleNavHover}
                            data-spotlight-hover
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="social-link"
                            aria-label="IMDb"
                            onMouseEnter={handleNavHover}
                            data-spotlight-hover
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M14.31 9.588v.005c-.077-.048-.227-.07-.42-.07v4.815c.27 0 .44-.06.5-.165.062-.104.095-.405.095-.9v-2.74c0-.36-.017-.6-.05-.72-.03-.12-.08-.19-.126-.225zM22.416 0H1.62C.742.06.06.744 0 1.596V22.38c.06.876.768 1.56 1.596 1.62h20.82c.852-.06 1.536-.744 1.596-1.62V1.62C23.952.744 23.268.06 22.416 0zM4.14 17.82H2.04V6.18h2.1v11.64zm6.18 0H8.58v-5.1c-.036-.072-.12-.12-.252-.144s-.18.012-.24.18v5.064H6.36V9.18h1.728v.936c.264-.36.504-.588.684-.684.18-.096.456-.144.828-.12.24.024.432.084.576.18s.252.216.324.36c.072.144.12.3.144.468s.036.48.036.936v6.564zm5.076-4.488c0 .72-.012 1.224-.036 1.512s-.08.532-.164.728c-.084.196-.204.352-.36.468s-.372.204-.66.252c-.288.048-.54.072-.756.072H11.4V6.18h2.16c.864 0 1.44.036 1.728.108.288.072.54.228.756.468s.36.444.432.612.108.564.108 1.188v4.776h.012zm5.112.552c0 .624-.012 1.08-.036 1.368s-.084.528-.18.72c-.096.192-.24.348-.432.468s-.468.192-.828.228c-.36.036-.6.048-.72.036-.12-.012-.324-.036-.612-.072-.288-.036-.492-.084-.612-.144l.072-1.584c.168.024.372.048.612.072.24.024.42.036.54.036.124 0 .276-.036.432-.108s.24-.24.276-.504c.036-.264.06-.696.06-1.296V9.156h1.428v4.728z" />
                            </svg>
                        </a>
                    </div>

                    <div className="footer-right">
                        <span className="footer-copyright">© 2024 All Rights Reserved</span>
                    </div>
                </div>

                {/* Red carpet accent */}
                <div className="red-carpet-line" />
            </footer>
        </div>
    )
}

export default Layout

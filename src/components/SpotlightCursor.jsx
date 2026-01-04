import { useEffect, useState, useCallback } from 'react'
import './SpotlightCursor.css'

function SpotlightCursor() {
    const [position, setPosition] = useState({ x: -1000, y: -1000 })
    const [isVisible, setIsVisible] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)

    const updatePosition = useCallback((e) => {
        setPosition({ x: e.clientX, y: e.clientY })
    }, [])

    const handleMouseEnter = useCallback(() => {
        setIsVisible(true)
        document.body.classList.add('spotlight-active')
    }, [])

    const handleMouseLeave = useCallback(() => {
        setIsVisible(false)
        document.body.classList.remove('spotlight-active')
    }, [])

    const handleMouseDown = useCallback(() => {
        setIsClicking(true)
    }, [])

    const handleMouseUp = useCallback(() => {
        setIsClicking(false)
    }, [])

    useEffect(() => {
        // Check for touch device
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        if (isTouchDevice) return

        window.addEventListener('mousemove', updatePosition)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        document.documentElement.addEventListener('mouseenter', handleMouseEnter)
        document.documentElement.addEventListener('mouseleave', handleMouseLeave)

        // Track when hovering over interactive elements
        const handleHoverStart = (e) => {
            if (e.target.matches('a, button, [role="button"], input, textarea, [data-spotlight-hover]')) {
                setIsHovering(true)
            }
        }

        const handleHoverEnd = () => {
            setIsHovering(false)
        }

        document.addEventListener('mouseover', handleHoverStart)
        document.addEventListener('mouseout', handleHoverEnd)

        return () => {
            window.removeEventListener('mousemove', updatePosition)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('mouseover', handleHoverStart)
            document.removeEventListener('mouseout', handleHoverEnd)
            document.body.classList.remove('spotlight-active')
        }
    }, [updatePosition, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp])

    // Don't render on touch devices
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        return null
    }

    return (
        <>
            {/* Main spotlight */}
            <div
                className={`spotlight-cursor ${!isVisible ? 'hidden' : ''} ${isHovering ? 'hovering' : ''}`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
            />

            {/* Custom film cursor - Film slate/clapperboard */}
            <div
                className={`custom-cursor ${!isVisible ? 'hidden' : ''} ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
            >
                <svg viewBox="0 0 32 32" className="cursor-icon">
                    {/* Film clapperboard */}
                    <defs>
                        <linearGradient id="cursorGold" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffd700" />
                            <stop offset="50%" stopColor="#d4af37" />
                            <stop offset="100%" stopColor="#ffd700" />
                        </linearGradient>
                    </defs>
                    {/* Clapper top */}
                    <path
                        d="M4 6 L28 6 L26 12 L6 12 Z"
                        fill="url(#cursorGold)"
                        className="clapper-top"
                    />
                    {/* Stripes on clapper */}
                    <path d="M6 6 L8 12" stroke="#0a0a0a" strokeWidth="2" />
                    <path d="M12 6 L14 12" stroke="#0a0a0a" strokeWidth="2" />
                    <path d="M18 6 L20 12" stroke="#0a0a0a" strokeWidth="2" />
                    <path d="M24 6 L26 12" stroke="#0a0a0a" strokeWidth="2" />
                    {/* Board body */}
                    <rect x="6" y="12" width="20" height="14" rx="1" fill="url(#cursorGold)" />
                    {/* Board lines */}
                    <line x1="8" y1="16" x2="24" y2="16" stroke="#0a0a0a" strokeWidth="1" opacity="0.3" />
                    <line x1="8" y1="20" x2="24" y2="20" stroke="#0a0a0a" strokeWidth="1" opacity="0.3" />
                    <line x1="8" y1="24" x2="24" y2="24" stroke="#0a0a0a" strokeWidth="1" opacity="0.3" />
                </svg>
            </div>
        </>
    )
}

export default SpotlightCursor

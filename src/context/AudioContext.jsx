import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'

const AudioContext = createContext()

// Sound effect URLs - using placeholder paths, you can replace with your own sounds
const SOUNDS = {
    projectorStart: '/sounds/projector-start.mp3',
    projectorLoop: '/sounds/projector-loop.mp3',
    filmFlicker: '/sounds/film-flicker.mp3',
    reelLoad: '/sounds/reel-load.mp3',
    whoosh: '/sounds/whoosh.mp3',
    click: '/sounds/click.mp3',
    hover: '/sounds/hover.mp3',
}

export function AudioProvider({ children }) {
    const [isMuted, setIsMuted] = useState(() => {
        // Check localStorage for user preference
        const saved = localStorage.getItem('audioMuted')
        return saved ? JSON.parse(saved) : false
    })
    const [isReady, setIsReady] = useState(false)
    const audioCache = useRef({})

    // Save mute preference
    useEffect(() => {
        localStorage.setItem('audioMuted', JSON.stringify(isMuted))
    }, [isMuted])

    // Preload audio files
    const preloadAudio = useCallback((soundKey) => {
        if (audioCache.current[soundKey]) return audioCache.current[soundKey]

        const audio = new Audio(SOUNDS[soundKey])
        audio.preload = 'auto'
        audio.volume = 0.5
        audioCache.current[soundKey] = audio
        return audio
    }, [])

    // Play a sound effect
    const playSound = useCallback((soundKey, options = {}) => {
        if (isMuted) return null

        try {
            const { volume = 0.5, loop = false } = options

            // Create new audio instance for overlapping sounds
            const audio = new Audio(SOUNDS[soundKey])
            audio.volume = volume
            audio.loop = loop

            const playPromise = audio.play()
            if (playPromise) {
                playPromise.catch(() => {
                    // Audio play failed, likely due to autoplay restrictions
                    console.log('Audio autoplay restricted')
                })
            }

            return audio
        } catch (error) {
            console.log('Audio not available:', soundKey)
            return null
        }
    }, [isMuted])

    // Stop a specific audio instance
    const stopSound = useCallback((audio) => {
        if (audio) {
            audio.pause()
            audio.currentTime = 0
        }
    }, [])

    // Toggle mute
    const toggleMute = useCallback(() => {
        setIsMuted(prev => !prev)
    }, [])

    // Initialize audio on first user interaction
    const initAudio = useCallback(() => {
        if (!isReady) {
            // Preload common sounds
            Object.keys(SOUNDS).forEach(key => preloadAudio(key))
            setIsReady(true)
        }
    }, [isReady, preloadAudio])

    const value = {
        isMuted,
        isReady,
        toggleMute,
        playSound,
        stopSound,
        initAudio,
        SOUNDS,
    }

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    )
}

export function useAudio() {
    const context = useContext(AudioContext)
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider')
    }
    return context
}

export default AudioContext

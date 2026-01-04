import { useAudio } from '../context/AudioContext'
import './MuteButton.css'

function MuteButton() {
    const { isMuted, toggleMute, playSound } = useAudio()

    const handleClick = () => {
        toggleMute()
        if (isMuted) {
            // Play a click sound when unmuting to confirm audio works
            setTimeout(() => playSound('click', { volume: 0.3 }), 50)
        }
    }

    return (
        <button
            className={`mute-button ${isMuted ? 'muted' : ''}`}
            onClick={handleClick}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        >
            {isMuted ? (
                // Muted icon
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
            ) : (
                // Unmuted icon
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
            )}
        </button>
    )
}

export default MuteButton

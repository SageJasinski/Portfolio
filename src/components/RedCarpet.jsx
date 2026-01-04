import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import './RedCarpet.css'

function RedCarpet({ children }) {
    const containerRef = useRef(null)
    const [isInView, setIsInView] = useState(false)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'start center']
    })

    // Smooth spring animation for the carpet unroll
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Transform scroll progress to carpet width
    const carpetWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%'])
    const carpetOpacity = useTransform(smoothProgress, [0, 0.3], [0, 1])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting)
            },
            { threshold: 0.1 }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div ref={containerRef} className="red-carpet-container">
            {/* Red carpet rolling out */}
            <motion.div
                className="red-carpet"
                style={{
                    width: carpetWidth,
                    opacity: carpetOpacity
                }}
            >
                {/* Carpet texture */}
                <div className="carpet-texture" />

                {/* Gold trim edges */}
                <div className="carpet-trim carpet-trim-top" />
                <div className="carpet-trim carpet-trim-bottom" />

                {/* Carpet roll at the end */}
                <motion.div
                    className="carpet-roll"
                    style={{
                        opacity: useTransform(smoothProgress, [0.8, 1], [1, 0])
                    }}
                >
                    <div className="roll-spiral" />
                </motion.div>
            </motion.div>

            {/* Velvet rope stanchions */}
            <motion.div
                className="stanchion stanchion-left"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <div className="stanchion-post" />
                <div className="stanchion-top" />
            </motion.div>

            <motion.div
                className="stanchion stanchion-right"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <div className="stanchion-post" />
                <div className="stanchion-top" />
            </motion.div>

            {/* Content on top of carpet */}
            <div className="carpet-content">
                {children}
            </div>
        </div>
    )
}

export default RedCarpet

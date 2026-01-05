import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAudio } from '../context/AudioContext'
import './About.css'

const skills = [
    { name: 'DaVinci Resolve', level: 90 },
    { name: 'After Effects', level: 80 },
    { name: 'Avid Media Composer', level: 75 },
    { name: 'Color Grading', level: 85 },
    { name: 'Sound Design', level: 80 },
    { name: 'Motion Graphics', level: 70 },
]

const timeline = [
    { year: '2025', title: 'Editor', description: 'Begging Path to Editor' },
]

function About() {
    const { playSound } = useAudio()

    return (
        <div className="about page">
            {/* Hero Section */}
            <section className="about-hero section">
                <div className="container">
                    <motion.div
                        className="about-hero-content"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="about-label">About Me</span>
                        <h1 className="about-title">
                            The Story Behind
                            <br />
                            <span className="text-gold-gradient">The Cuts</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Bio Section */}
            <section className="about-bio section">
                <div className="container">
                    <div className="about-bio-grid">
                        <motion.div
                            className="about-bio-image"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="bio-image-placeholder">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                                <span>Your Photo Here</span>
                            </div>
                            <div className="bio-image-frame" />
                        </motion.div>

                        <motion.div
                            className="about-bio-text"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 className="section-title">My Philosophy</h2>
                            <p>
                                I believe that great editing is invisible. Bringing a story to life and inspiring others can
                                take a lot of work.There are a lot of important choices that need to be made alnog the way. As an editor
                                It is my duty to stay true to the work that has been done while also adding my own personal touch in a way
                                that inspires the work to be even greater.
                            </p>
                            <p>
                                Growing up I would watch old kung foo movies with my dad. Over the years movies have been the life blood
                                of my connection with others. They have inspired me and changed me into the man i am today. There seems to be
                                an uncanny decline in the quality of movies over the years. With some exceptions of course. I belive that an accute
                                attention to detail and a strong work ethic is what sets an editor apart from the rest. At the end of the day,
                                If I can improve the quality of movies, if I can help just one person in the audience for a moment forget about their worries
                                and enjoy the art of storytelling, then I have done my job.
                            </p>
                            <div className="about-bio-cta">
                                <Link
                                    to="/work"
                                    className="btn btn-primary"
                                    onMouseEnter={() => playSound('hover', { volume: 0.1 })}
                                >
                                    View My Work
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="about-skills section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="section-title text-center">Skills & Tools</h2>
                    </motion.div>

                    <div className="skills-grid">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                className="skill-item"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="skill-header">
                                    <span className="skill-name">{skill.name}</span>
                                    <span className="skill-level">{skill.level}%</span>
                                </div>
                                <div className="skill-bar">
                                    <motion.div
                                        className="skill-fill"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="about-timeline section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="section-title text-center">My Journey</h2>
                    </motion.div>

                    <div className="timeline">
                        <div className="timeline-line" />
                        {timeline.map((item, index) => (
                            <motion.div
                                key={item.year}
                                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <div className="timeline-content">
                                    <span className="timeline-year">{item.year}</span>
                                    <h3 className="timeline-title">{item.title}</h3>
                                    <p className="timeline-description">{item.description}</p>
                                </div>
                                <div className="timeline-dot" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About

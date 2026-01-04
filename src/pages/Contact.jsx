import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAudio } from '../context/AudioContext'
import RedCarpet from '../components/RedCarpet'
import './Contact.css'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const { playSound } = useAudio()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        playSound('click', { volume: 0.2 })

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setSubmitted(true)
        playSound('whoosh', { volume: 0.3 })
    }

    return (
        <div className="contact page">
            {/* Hero Section */}
            <section className="contact-hero section">
                <div className="container">
                    <motion.div
                        className="contact-hero-content"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="contact-label">Get in Touch</span>
                        <h1 className="contact-title">
                            Let's Create
                            <br />
                            <span className="text-gold-gradient">Together</span>
                        </h1>
                        <p className="contact-description">
                            Have a project in mind? I'd love to hear about it. Whether it's a feature film,
                            commercial, or music video, let's bring your vision to life.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form Section - with Red Carpet */}
            <RedCarpet>
                <section className="contact-form-section section">
                    <div className="container">
                        <div className="contact-grid">
                            {/* Contact Info */}
                            <motion.div
                                className="contact-info"
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2>Contact Information</h2>

                                <div className="contact-info-item">
                                    <div className="contact-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="contact-info-label">Email</span>
                                        <a href="mailto:sagejasinski@gmail.com" className="contact-info-value">
                                            sagejasinski@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="contact-info-label">Location</span>
                                        <span className="contact-info-value">Seattle, WA</span>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="contact-info-label">Availability</span>
                                        <span className="contact-info-value">Open for new projects</span>
                                    </div>
                                </div>

                                {/* Response Time */}
                                <div className="response-note">
                                    <p>I typically try to respond within 24-48 hours.</p>
                                </div>
                            </motion.div>

                            {/* Form */}
                            <motion.div
                                className="contact-form-container"
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                {submitted ? (
                                    <div className="form-success">
                                        <div className="success-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                <polyline points="22 4 12 14.01 9 11.01" />
                                            </svg>
                                        </div>
                                        <h3>Message Sent!</h3>
                                        <p>Thank you for reaching out. I'll get back to you soon.</p>
                                        <button
                                            className="btn btn-outline"
                                            onClick={() => {
                                                setSubmitted(false)
                                                setFormData({ name: '', email: '', subject: '', message: '' })
                                            }}
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <form className="contact-form" onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="subject">Subject</label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                placeholder="Project inquiry, collaboration, etc."
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="message">Message</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                placeholder="Tell me about your project..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary submit-btn"
                                            disabled={isSubmitting}
                                            onMouseEnter={() => playSound('hover', { volume: 0.1 })}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner" />
                                                    Sending...
                                                </>
                                            ) : (
                                                'Send Message'
                                            )}
                                        </button>
                                    </form>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </section>
            </RedCarpet>
        </div>
    )
}

export default Contact

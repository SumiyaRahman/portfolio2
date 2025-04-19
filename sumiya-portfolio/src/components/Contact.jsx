import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const templateParams = {
            name: formRef.current.name.value,
            description: formRef.current.message.value,
            email: formRef.current.email.value
        };
        
        try {
            await emailjs.send(
                'service_j8nwhek',
                'template_woujkxj',
                templateParams,
                '7TFhA1yYWSh9_Su_s'
            );
            setSubmitStatus('success');
            formRef.current.reset();
        } catch (error) {
            console.error('Email error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(null), 3000);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div id="contact" className="min-h-screen py-20">
            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-16"
                    variants={itemVariants}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 playfair">
                        <span className="relative inline-block">
                            Contact
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-teal-500"></span>
                        </span>{" "}
                        <span className="text-teal-500">Me</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                        Have a project in mind? Let's collaborate and create something amazing together.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div 
                        variants={itemVariants}
                        className="space-y-8"
                    >
                        <div className="mb-12">
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Get in Touch</h3>
                            <p className="text-gray-600 dark:text-gray-300">I'm always open to new opportunities and interesting projects.</p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center space-x-6 group transform hover:scale-105 transition-transform duration-300">
                                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-lg bg-teal-500/10 border-2 border-teal-500 group-hover:border-teal-600 transition-all duration-300">
                                    <FaPhone className="text-teal-500 group-hover:text-teal-600 text-xl transition-colors duration-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                    <p className="text-gray-800 dark:text-gray-100 font-medium">+880 1739345183</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6 group transform hover:scale-105 transition-transform duration-300">
                                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-lg bg-teal-500/10 border-2 border-teal-500 group-hover:border-teal-600 transition-all duration-300">
                                    <FaEnvelope className="text-teal-500 group-hover:text-teal-600 text-xl transition-colors duration-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                    <p className="text-gray-800 dark:text-gray-100 font-medium break-all">sumiyabintearahman24@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6 group transform hover:scale-105 transition-transform duration-300">
                                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-lg bg-teal-500/10 border-2 border-teal-500 group-hover:border-teal-600 transition-all duration-300">
                                    <FaMapMarkerAlt className="text-teal-500 group-hover:text-teal-600 text-xl transition-colors duration-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                                    <p className="text-gray-800 dark:text-gray-100 font-medium">Jashore, Bangladesh</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        variants={itemVariants}
                        className="relative"
                    >
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="space-y-6 bg-gray-900/5 dark:bg-gray-800/20 p-8 rounded-2xl backdrop-blur-sm"
                        >
                            <div className="space-y-6">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    required
                                    className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 dark:border-gray-700
                                             text-gray-800 dark:text-gray-100 bg-transparent placeholder-gray-500 
                                             focus:outline-none focus:border-teal-500 transition-all duration-300"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    required
                                    className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 dark:border-gray-700
                                             text-gray-800 dark:text-gray-100 bg-transparent placeholder-gray-500 
                                             focus:outline-none focus:border-teal-500 transition-all duration-300"
                                />

                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    required
                                    rows={5}
                                    className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 dark:border-gray-700
                                             text-gray-800 dark:text-gray-100 bg-transparent placeholder-gray-500 
                                             focus:outline-none focus:border-teal-500 transition-all duration-300 resize-none"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 px-8 rounded-lg text-white font-medium
                                         bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700
                                         disabled:opacity-50 transition-all duration-300 shadow-lg shadow-teal-500/20"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </motion.button>

                            {submitStatus === 'success' && (
                                <p className="text-green-500 text-center font-medium mt-4">Message sent successfully!</p>
                            )}
                            {submitStatus === 'error' && (
                                <p className="text-red-500 text-center font-medium mt-4">Failed to send message. Please try again.</p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
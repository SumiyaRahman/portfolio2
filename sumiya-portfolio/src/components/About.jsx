import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// import coding from '../assets/coding.png'
// import Loading from './Loading';

const About = () => {
    const { data: aboutData } = useQuery({
        queryKey: ['aboutMe'],
        queryFn: async () => {
            const res = await axios.get('https://official-portfolio-server.vercel.app/about-me');
            return res.data;
        }
    });

    // if (isLoading) {
    //     return <Loading />;
    // }

    const fadeInUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div id="about" className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 -z-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"></div>

            <motion.div 
                className="container mx-auto max-w-7xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                {/* Section Title with floating elements */}
                <motion.div 
                    className="text-center mb-16 relative"
                    variants={fadeInUpVariants}
                >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-teal-500/20 rounded-full blur-xl"></div>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 playfair text-slate-800 dark:text-white relative">
                        About <span className="text-teal-500 dark:text-teal-400 relative">
                            Me
                            <svg className="absolute -top-6 -right-8 w-8 h-8 text-teal-500 animate-spin-slow" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L15 9L22 9L16 14L18 21L12 17L6 21L8 14L2 9L9 9L12 2Z" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-teal-500 dark:bg-teal-400 mx-auto relative">
                        <div className="absolute -right-3 -top-1 w-3 h-3 bg-teal-500 dark:bg-teal-400 rounded-full"></div>
                        <div className="absolute -left-3 -top-1 w-3 h-3 bg-teal-500 dark:bg-teal-400 rounded-full"></div>
                    </div>
                </motion.div>

                {/* Content Grid with enhanced styling */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <motion.div
                        variants={containerVariants}
                        className="space-y-6"
                    >
                        <motion.div 
                            variants={fadeInUpVariants}
                            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-500/20 group hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-teal-500/10 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                                    <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-teal-500 dark:text-teal-400">Who I Am</h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300">
                                {aboutData?.[0]?.description || 
                                "A passionate web developer with a keen eye for creating elegant solutions..."}
                            </p>
                        </motion.div>

                        <motion.div 
                            variants={fadeInUpVariants}
                            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-500/20 group hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-teal-500/10 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                                    <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-teal-500 dark:text-teal-400">My Programming Journey</h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300">
                                {aboutData?.[0]?.programmingJourney || 
                                "Started my journey in web development..."}
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right Column */}
                    <motion.div
                        variants={containerVariants}
                        className="space-y-6"
                    >
                        <motion.div 
                            variants={fadeInUpVariants}
                            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-500/20 group hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-teal-500/10 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                                    <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-teal-500 dark:text-teal-400">What I Love to Do</h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300">
                                {aboutData?.[0]?.workInterests || 
                                "Specializing in building responsive web applications..."}
                            </p>
                        </motion.div>

                        <motion.div 
                            variants={fadeInUpVariants}
                            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-500/20 group hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-teal-500/10 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                                    <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-teal-500 dark:text-teal-400">Beyond Coding</h3>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300">
                                {aboutData?.[0]?.hobbies || 
                                "When I'm not coding, you'll find me..."}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Enhanced Bottom Decorative Element */}
                <div className="mt-16 flex justify-center relative">
                    <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-teal-400 dark:from-teal-400 dark:to-teal-300 rounded-full">
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-teal-500 dark:bg-teal-400 rounded-full animate-bounce"></div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default About;
import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { FaGithub, FaExternalLinkAlt, FaTools, FaLightbulb, FaRocket } from 'react-icons/fa';

const ViewDetails = () => {
    const { id } = useParams();

    const { data: project } = useQuery({
        queryKey: ['project', id],
        queryFn: async () => {
            const res = await axios.get(`https://official-portfolio-server.vercel.app/project/${id}`);
            return res.data;
        }
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
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
        <div>
            <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden mt-16">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 -z-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"></div>

                <motion.div 
                    className="container mx-auto max-w-7xl"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Project Header */}
                    <motion.div variants={itemVariants} className="text-center mb-16 relative">
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-teal-500/20 rounded-full blur-xl"></div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4 playfair text-slate-800 dark:text-white relative">
                            <span className="text-teal-500 dark:text-teal-400 relative">
                                {project?.projectName}
                                <svg className="absolute -top-6 -right-8 w-8 h-8 text-teal-500 animate-spin-slow" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2L15 9L22 9L16 14L18 21L12 17L6 21L8 14L2 9L9 9L12 2Z" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                            </span>
                        </h1>
                        <div className="w-24 h-1 bg-teal-500 dark:bg-teal-400 mx-auto relative mb-8">
                            <div className="absolute -right-3 -top-1 w-3 h-3 bg-teal-500 dark:bg-teal-400 rounded-full"></div>
                            <div className="absolute -left-3 -top-1 w-3 h-3 bg-teal-500 dark:bg-teal-400 rounded-full"></div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            <a 
                                href={project?.liveLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 dark:bg-teal-400 dark:hover:bg-teal-500 text-white rounded-xl font-medium transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40"
                            >
                                <FaExternalLinkAlt className="text-lg" /> Live Demo
                            </a>
                            <a 
                                href={project?.githubLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-xl font-medium transform hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <FaGithub className="text-lg" /> Source Code
                            </a>
                        </div>
                    </motion.div>

                    {/* Project Image */}
                    <motion.div 
                        variants={itemVariants}
                        className="relative rounded-2xl overflow-hidden mb-16 group shadow-2xl shadow-teal-500/10"
                    >
                        <img 
                            src={project?.image} 
                            alt={project?.projectName}
                            className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                    </motion.div>

                    {/* Project Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <motion.div 
                            variants={itemVariants}
                            className="lg:col-span-2 space-y-8"
                        >
                            {/* Description */}
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-500/20 group hover:-translate-y-1">
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Project Overview</h2>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {project?.description}
                                </p>
                            </div>

                            {/* Challenges */}
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-500/20 group hover:-translate-y-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-teal-500/10 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                                        <FaTools className="w-6 h-6 text-teal-500" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-teal-500 dark:text-teal-400">Challenges & Solutions</h2>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {project?.challenges}
                                </p>
                            </div>

                            {/* Future Plans */}
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-500/20 group hover:-translate-y-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-teal-500/10 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                                        <FaRocket className="w-6 h-6 text-teal-500" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-teal-500 dark:text-teal-400">Future Improvements</h2>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {project?.improvements}
                                </p>
                            </div>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div 
                            variants={itemVariants}
                            className="space-y-8"
                        >
                            {/* Tech Stack */}
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-500/20 group hover:-translate-y-1 sticky top-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-teal-500/10 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                                        <FaLightbulb className="w-6 h-6 text-teal-500" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-teal-500 dark:text-teal-400">Tech Stack</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {project?.techStack?.split(',').map((tech, index) => (
                                        <span key={index} className="px-3 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-full text-sm">
                                            {tech.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ViewDetails;
import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaGraduationCap, FaCalendarAlt, FaUniversity } from 'react-icons/fa';
// import Achievement from './Achievement';
// import Loading from './Loading';

const Education = () => {
    const { data: educationData } = useQuery({
        queryKey: ['education'],
        queryFn: async () => {
            const res = await axios.get('https://official-portfolio-server.vercel.app/educational-qualification');
            return res.data;
        }
    });

    // if (isLoading) {
    //     return <Loading />;
    // }

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
        <div id="education" className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
                {/* Section Title */}
                <motion.div 
                    className="text-center mb-16 relative"
                    variants={itemVariants}
                >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-teal-500/20 rounded-full blur-xl"></div>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 playfair text-slate-800 dark:text-white relative">
                        Educational <span className="text-teal-500 dark:text-teal-400 relative">
                            Journey
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

                {/* Education Timeline */}
                <div className="relative">
                    <div className="absolute left-8 md:left-1/2 top-0 h-full w-0.5 bg-teal-500/30 dark:bg-teal-400/30"></div>

                    <div className="space-y-12">
                        {educationData?.map((edu, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`flex flex-col md:flex-row gap-8 relative ${
                                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}
                            >
                                {/* Timeline Node */}
                                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-teal-500 dark:bg-teal-400 border-4 border-white dark:border-slate-900 z-10"></div>

                                {/* Content Card */}
                                <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${
                                    index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
                                }`}>
                                    <motion.div 
                                        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl p-6
                                                shadow-lg hover:shadow-xl transition-all duration-300 
                                                border border-teal-500/20 hover:border-teal-500/40
                                                transform hover:-translate-y-1"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-teal-500/10 rounded-lg">
                                                <FaUniversity className="text-xl text-teal-500" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                                                {edu.instituteName}
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-3 mb-3 text-slate-600 dark:text-slate-300">
                                            <FaGraduationCap className="text-teal-500" />
                                            <span className="font-medium">{edu.degree}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-4">
                                            <FaCalendarAlt className="text-teal-500" />
                                            <span>{edu.yearRange}</span>
                                        </div>

                                        {edu.achievements && (
                                            <div className="mt-4 pt-4 border-t border-teal-500/20">
                                                <h5 className="text-teal-500 font-semibold mb-3">Key Achievements:</h5>
                                                <ul className="space-y-2">
                                                    {edu.achievements.map((achievement, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0"></span>
                                                            <span>{achievement}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Education;
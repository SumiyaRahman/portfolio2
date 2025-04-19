import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Marquee from 'react-fast-marquee';
// import Loading from './Loading';

const Skills = () => {
    const { data: skillsData } = useQuery({
        queryKey: ['skills'],
        queryFn: async () => {
            const res = await axios.get('https://official-portfolio-server.vercel.app/skills');
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
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const skillVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { 
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const logoVariants = {
        hidden: { scale: 0, rotate: -360 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        },
        hover: {
            rotate: 360,
            transition: {
                duration: 0.8,
                type: "spring"
            }
        }
    };

    return (
        <div id="skills" className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
                    variants={skillVariants}
                >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-teal-500/20 rounded-full blur-xl"></div>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 playfair text-slate-800 dark:text-white relative">
                        Technical <span className="text-teal-500 dark:text-teal-400 relative">
                            Skills
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

                {/* Marquee Section */}
                <div className="w-full overflow-hidden mb-16">
                    <Marquee 
                        speed={50} 
                        gradient={false}
                        className="py-4"
                    >
                        {skillsData?.map((skill, index) => (
                            <motion.div
                                key={index}
                                className="mx-4 sm:mx-8"
                                variants={logoVariants}
                                whileHover="hover"
                            >
                                <img 
                                    src={skill.logo} 
                                    alt={skill.name}
                                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain filter hover:drop-shadow-[0_0_15px_rgba(20,184,166,0.5)] transition-all duration-300"
                                />
                            </motion.div>
                        ))}
                    </Marquee>
                </div>

                {/* Skills Grid */}
                {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {skillsData?.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={skillVariants}
                            className="group"
                        >
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl p-4 
                                          shadow-lg hover:shadow-xl transition-all duration-300 
                                          border border-teal-500/20 hover:border-teal-500/40
                                          group-hover:-translate-y-1">
                                <div className="flex flex-col items-center space-y-3">
                                    <motion.div 
                                        className="p-3 bg-teal-500/10 rounded-lg group-hover:bg-teal-500/20 transition-colors"
                                        variants={logoVariants}
                                        whileHover="hover"
                                    >
                                        <img 
                                            src={skill.logo} 
                                            alt={skill.name}
                                            className="w-12 h-12 object-contain"
                                        />
                                    </motion.div>
                                    <span className="text-slate-700 dark:text-slate-200 font-medium text-sm sm:text-base">
                                        {skill.name}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div> */}

                {/* Bottom Decorative Element */}
                {/* <div className="mt-16 flex justify-center relative">
                    <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-teal-400 dark:from-teal-400 dark:to-teal-300 rounded-full">
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-teal-500 dark:bg-teal-400 rounded-full animate-bounce"></div>
                    </div>
                </div> */}
            </motion.div>
        </div>
    );
};

export default Skills;
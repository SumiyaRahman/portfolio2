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
        <div id="about" className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 about">
            <motion.div 
                className="container mx-auto max-w-7xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                {/* Section Title */}
                <motion.div 
                    className="text-center mb-8 sm:mb-12 md:mb-16"
                    variants={fadeInUpVariants}
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 playfair">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 text-transparent bg-clip-text">
                            About Me
                        </span>
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg">
                        Crafting digital experiences with cutting-edge technologies
                    </p>
                    <div className="w-24 sm:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 mx-auto mt-6 sm:mt-8 rounded-full"></div>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 sm:gap-10 lg:gap-12">
                    {/* Left Content - Text */}
                    <motion.div 
                        className="w-full lg:w-1/2 space-y-6 sm:space-y-8"
                        variants={containerVariants}
                    >
                        {/* Main Description */}
                        <motion.div 
                            className="bg-gray-900/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1"
                            variants={fadeInUpVariants}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <h3 className="text-lg sm:text-xl text-purple-400 font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">Who I Am</h3>
                            <p className="text-gray-300 text-sm sm:text-[15px] leading-[1.6rem] sm:leading-[1.8rem] tracking-[0.01rem]">
                                {aboutData?.[0]?.description || 
                                "A passionate web developer with a keen eye for creating elegant solutions..."}
                            </p>
                        </motion.div>

                        {/* Programming Journey */}
                        <motion.div 
                            className="bg-gray-900/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 transform hover:-translate-y-1"
                            variants={fadeInUpVariants}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <h3 className="text-lg sm:text-xl text-purple-400 font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">My Programming Journey</h3>
                            <p className="text-gray-300 text-sm sm:text-[15px] leading-[1.6rem] sm:leading-[1.8rem] tracking-[0.01rem]">
                                {aboutData?.[0]?.programmingJourney || 
                                "Started my journey in web development..."}
                            </p>
                        </motion.div>

                        {/* Work Interests */}
                        <motion.div 
                            className="bg-gray-900/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1"
                            variants={fadeInUpVariants}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <h3 className="text-lg sm:text-xl text-purple-400 font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">What I Love to Do</h3>
                            <p className="text-gray-300 text-sm sm:text-[15px] leading-[1.6rem] sm:leading-[1.8rem] tracking-[0.01rem]">
                                {aboutData?.[0]?.workInterests || 
                                "Specializing in building responsive web applications..."}
                            </p>
                        </motion.div>

                        {/* Hobbies & Personality */}
                        <motion.div 
                            className="bg-gray-900/50 p-4 sm:p-6 rounded-xl backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 transform hover:-translate-y-1"
                            variants={fadeInUpVariants}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <h3 className="text-lg sm:text-xl text-purple-400 font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">Beyond Coding</h3>
                            <div className="space-y-3 sm:space-y-4">
                                <p className="text-gray-300 text-sm sm:text-[15px] leading-[1.6rem] sm:leading-[1.8rem] tracking-[0.01rem]">
                                    <span className="font-semibold text-purple-300"></span>{' '}
                                    {aboutData?.[0]?.hobbies || 
                                    "When I'm not coding, you'll find me..."}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - GIF */}
                    <motion.div 
                        className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative w-full max-w-sm sm:max-w-md">
                            {/* Main GIF */}
                            {/* <img 
                                src={coding}
                                alt="Coding Animation"
                                className="w-full h-auto rounded-lg"
                            /> */}
                            
                            {/* Gradient Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 rounded-full blur-3xl -z-10"></div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default About;
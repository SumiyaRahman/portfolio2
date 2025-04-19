import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
// import Loading from "./Loading";
const Projects = () => {
  const { data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axios.get("https://official-portfolio-server.vercel.app/project");
      return res.data;
    },
  });

    // if (isLoading) {
    //     return <Loading />;
    // }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div id="projects" className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
          variants={cardVariants}
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-teal-500/20 rounded-full blur-xl"></div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 playfair text-slate-800 dark:text-white relative">
            Featured <span className="text-teal-500 dark:text-teal-400 relative">
              Projects
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projectsData?.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative"
            >
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl overflow-hidden
                            shadow-lg hover:shadow-xl transition-all duration-500
                            border border-teal-500/20 hover:border-teal-500/40">
                
                {/* Project Image with Overlay */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 flex gap-3">
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                         className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm text-white transition-all">
                        <FaGithub className="w-5 h-5" />
                      </a>
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                         className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm text-white transition-all">
                        <FaExternalLinkAlt className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                    {project.projectName}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-xs bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <Link
                    to={`/project/${project._id}`}
                    className="inline-flex items-center justify-center w-full py-3 px-4
                             bg-teal-500 hover:bg-teal-600 dark:bg-teal-400 dark:hover:bg-teal-500
                             text-white rounded-xl font-medium text-sm
                             transform hover:-translate-y-0.5 transition-all duration-300
                             shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40"
                  >
                    View Project Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;

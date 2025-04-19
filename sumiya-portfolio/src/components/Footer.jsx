import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 sm:py-12 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-4"
                    >
                        <span className="text-3xl text-teal-500">👋</span>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
                            Let's Connect!
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex gap-6"
                    >
                        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-500 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-500 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" />
                            </svg>
                        </a>
                    </motion.div>

                    <motion.p 
                        className="text-center text-gray-600 dark:text-gray-400 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        © {currentYear} All rights reserved by{' '}
                        <motion.span
                            whileHover={{ 
                                color: '#14B8A6',
                                scale: 1.05 
                            }}
                            className="font-semibold cursor-pointer text-teal-500"
                        >
                            Sumiya Binte A Rahman
                        </motion.span>
                    </motion.p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
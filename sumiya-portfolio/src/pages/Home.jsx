import React from 'react';
import Banner from '../components/Banner';
import About from '../components/About';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Skills></Skills>
            <Education></Education>
            <Projects></Projects>
            <Contact></Contact>
        </div>
    );
};

export default Home;
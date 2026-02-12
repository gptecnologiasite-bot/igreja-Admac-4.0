// import React from 'react'; // Removed unused import
import Hero from '../components/Hero';
import About from '../components/About';
import Ministries from '../components/Ministries';
import Agenda from '../components/Agenda';
import PodcastSection from '../components/PodcastSection';
import Magazines from '../components/Magazines';
import Media from '../components/Media';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <div className="w-full">
            <Hero />
            <div id="about"><About /></div>
            <div id="ministries"><Ministries /></div>
            <div id="agenda"><Agenda /></div>
            <PodcastSection />
            <div id="magazine"><Magazines /></div>
            <div id="media"><Media /></div>
            <div id="contact"><Contact /></div>
        </div>
    );
};

export default Home;

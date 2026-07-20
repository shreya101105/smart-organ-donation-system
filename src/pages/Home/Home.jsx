import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from './Hero';
import AboutSystem from './AboutSystem';
import DiseasePrediction from './DiseasePrediction';
import OrganDonation from './OrganDonation';
import HowItWorks from './HowItWorks';
import Features from './Features';
import Services from './Services';
import Statistics from './Statistics';
import OrganCompatibility from './OrganCompatibility';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import LatestNews from './LatestNews';
import Contact from './Contact';
import CallToAction from './CallToAction';
import Footer from '../../components/Footer/Footer';
import './Home.css';

export const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Hero />
      <AboutSystem />
      <DiseasePrediction />
      <OrganDonation />
      <HowItWorks />
      <Features />
      <Services />
      <Statistics />
      <OrganCompatibility />
      <Testimonials />
      <FAQ />
      <LatestNews />
      <Contact />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;

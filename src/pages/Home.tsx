import React from 'react';
import HeroSection from '../components/home/HeroSection';
import OfficesSection from '../components/home/OfficesSection';
import FAQSection from '../components/home/FAQSection';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedProperties from '../components/home/FeaturedProperties';
import FeaturedHighlight from '../components/home/FeaturedHighlight';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <div className="container">
        <OfficesSection />
        <FAQSection />
        <FeaturedCategories />
        <FeaturedProperties />
        <FeaturedHighlight />
      </div>
    </div>
  );
};

export default Home;

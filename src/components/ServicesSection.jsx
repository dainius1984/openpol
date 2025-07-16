import React from 'react';
import OpenPolChatSection from './OpenPolChatSection';
import StrategySection from './StrategySection';
import ImplementationSection from './ImplementationSection';
import TrainingSection from './TrainingSection';

export const ServicesSection = () => {
  return (
    <section id="services" className="mt-16 md:mt-28">
      <OpenPolChatSection />
      <div className="my-8" />
      <StrategySection />
      <div className="my-8" />
      <ImplementationSection />
      <div className="my-8" />
      <TrainingSection />
    </section>
  );
};

import React from 'react';
import OpenPolChatSection from './OpenPolChatSection';
import StrategySection from './StrategySection';
import ImplementationSection from './ImplementationSection';
import TrainingSection from './TrainingSection';

export const ServicesSection = ({ setModalOpen }) => {
  return (
    <section id="services" className="mt-16 md:mt-28">
      <OpenPolChatSection />
      <div className="my-8" />
      <StrategySection setModalOpen={setModalOpen} />
      <div className="my-8" />
      <ImplementationSection setModalOpen={setModalOpen} />
      <div className="my-8" />
      <TrainingSection setModalOpen={setModalOpen} />
    </section>
  );
};

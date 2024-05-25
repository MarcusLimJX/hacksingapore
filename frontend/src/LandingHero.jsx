import React from "react";

export const LandingHero = () => {
  return (
    <section className="hero">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
          Welcome to APEX
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl font-light mb-10">
          Use APEX to plan your health, finances, and everything more!
        </p>
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Learn More
        </button> */}
      </div>
    </section>
  );
};

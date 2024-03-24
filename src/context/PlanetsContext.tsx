import React, { createContext, useContext, useEffect, useState } from 'react';

export type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string;
  created: string;
  edited: string;
  url: string;
};

type PlanetContextType = {
  planets: Planet[];
};

const PlanetContext = createContext<PlanetContextType | undefined>(undefined);

export const usePlanetContext = () => {
  const context = useContext(PlanetContext);
  if (!context) {
    throw new Error('usePlanetContext must be used within a PlanetContextProvider');
  }
  return context;
};

function PlanetContextProvider({ children }: { children: React.ReactNode }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const url = await fetch('https://swapi.dev/api/planets');
        const data = await url.json();
        setPlanets(data.results);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, []);

  return (
    <PlanetContext.Provider value={ { planets } }>
      {children}
    </PlanetContext.Provider>
  );
}

export default PlanetContextProvider;

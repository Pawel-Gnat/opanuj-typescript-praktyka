import { useEffect, useState } from 'react';
import { PlanetsGrid } from './components/PlanetsGrid';
import SimpleCard from './components/SimpleCard';
import DetailedCard from './components/DetailedCard';
import { Planet, SWAPIResponse } from './types';
import axios from 'axios';

type TabType = 'simple' | 'detailed';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('simple');
  const [planets, setPlanets] = useState<Planet[]>([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const { data } = await axios.get<SWAPIResponse>('https://swapi.dev/api/planets/');
        setPlanets(data.results);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex gap-4 mb-8" data-testid="tabs">
        <button
          data-testid="simple-tab"
          onClick={() => setActiveTab('simple')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200
              ${
                activeTab === 'simple'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
        >
          Overview
        </button>
        <button
          data-testid="detailed-tab"
          onClick={() => setActiveTab('detailed')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200
              ${
                activeTab === 'detailed'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
        >
          Details
        </button>
      </div>

      <div data-testid="grid-container">
        {activeTab === 'simple' ? (
          <div data-testid="simple-grid">
            <PlanetsGrid
              as="section"
              columns={3}
              items={planets}
              renderItem={(planet) => (
                <div key={planet.url} className="h-full">
                  <SimpleCard planet={planet} />
                </div>
              )}
            />
          </div>
        ) : (
          <div data-testid="detailed-grid">
            <PlanetsGrid
              as="main"
              columns={2}
              items={planets}
              renderItem={(planet) => (
                <div key={planet.url} className="h-full">
                  <DetailedCard planet={planet} />
                </div>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}


import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import CryptoTable from '../components/CryptoTable';
import { cryptoSimulator } from '../services/cryptoUpdates';
import ThemeToggle from '../components/ThemeToggle';

const Index = () => {
  useEffect(() => {
    cryptoSimulator.start();
    return () => cryptoSimulator.stop();
  }, []);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from
-slate-950 to-slate-900 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-white p-4 md:p-8">
        <div className="max-w-[1400px] mx-auto space-y-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Crypto Market
            </h1>
            <ThemeToggle />
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-center mb-8">
            Track real-time cryptocurrency prices, market caps, and trading volumes. 
            Hover over the info icon to learn more about each cryptocurrency.
            Click the heart icon to add to favorites!
          </p>
          <CryptoTable />
        </div>
      </div>
    </Provider>
  );
};

export default Index;

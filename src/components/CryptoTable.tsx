import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { formatNumber, formatPrice, formatPercent, formatSupply } from '../utils/formatters';
import { TrendingUp, TrendingDown, Info, Heart } from 'lucide-react';
import SparklineChart from './SparklineChart';
import { toggleFavorite } from '../store/cryptoSlice';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CryptoTable: React.FC = () => {
  const assets = useSelector((state: RootState) => state.crypto.assets);
  const dispatch = useDispatch();

  const handleFavoriteClick = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <div className="w-full overflow-x-auto cursor-crosshair">
      <style>
        {`
          * {
            cursor: crosshair;
          }
        `}
      </style>
      <table className="min-w-full bg-white/5 dark:bg-slate-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
        <thead>
          <tr className="text-left text-slate-600 dark:text-slate-400 text-sm border-b border-slate-200 dark:border-slate-800">
            <th className="px-4 py-3">Favorite</th>
            <th className="sticky left-0 bg-white/5 dark:bg-slate-900/50 backdrop-blur-sm px-4 py-3">#</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">1h %</th>
            <th className="px-4 py-3">24h %</th>
            <th className="px-4 py-3">7d %</th>
            <th className="px-4 py-3">Market Cap</th>
            <th className="px-4 py-3">Volume (24h)</th>
            <th className="px-4 py-3">Circulating Supply</th>
            <th className="px-4 py-3">Last 7 Days</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {assets.map((asset) => (
            <tr key={asset.id} className="text-slate-700 dark:text-slate-300 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="px-4 py-4">
                <button
                  onClick={() => handleFavoriteClick(asset.id)}
                  className="focus:outline-none"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      asset.isFavorite
                        ? "fill-red-500 text-red-500"
                        : "text-slate-400 hover:text-red-500"
                    }`}
                  />
                </button>
              </td>
              <td className="sticky left-0 bg-white/5 dark:bg-slate-900/50 backdrop-blur-sm px-4 py-4">{asset.rank}</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <img src={asset.logo} alt={asset.name} className="w-6 h-6" />
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{asset.name}</span>
                    <span className="text-slate-500 text-sm">{asset.symbol}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-4 h-4 text-slate-400 hover:text-slate-300 transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs bg-slate-800 border-slate-700">
                          <p className="text-sm">{asset.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 font-medium">
                ${formatPrice(asset.currentPrice)}
              </td>
              <td className={`px-4 py-4 ${asset.priceChange1h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <div className="flex items-center gap-1">
                  {asset.priceChange1h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {formatPercent(asset.priceChange1h)}%
                </div>
              </td>
              <td className={`px-4 py-4 ${asset.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <div className="flex items-center gap-1">
                  {asset.priceChange24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {formatPercent(asset.priceChange24h)}%
                </div>
              </td>
              <td className={`px-4 py-4 ${asset.priceChange7d >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                <div className="flex items-center gap-1">
                  {asset.priceChange7d >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {formatPercent(asset.priceChange7d)}%
                </div>
              </td>
              <td className="px-4 py-4">{formatNumber(asset.marketCap)}</td>
              <td className="px-4 py-4">{formatNumber(asset.volume24h)}</td>
              <td className="px-4 py-4">
                <div>
                  {formatSupply(asset.circulatingSupply)} {asset.symbol}
                  {asset.maxSupply && (
                    <div className="text-slate-500 text-sm">
                      Max: {formatSupply(asset.maxSupply)}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-4">
                <SparklineChart data={asset.sparklineData} change={asset.priceChange7d} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;

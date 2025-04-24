
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sampleCryptoData } from '../data/sampleData';

export interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  logo: string;
  currentPrice: number;
  priceChange1h: number;
  priceChange24h: number;
  priceChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  sparklineData: number[];
  description: string;
  isFavorite: boolean;
}

interface CryptoState {
  assets: CryptoAsset[];
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  assets: sampleCryptoData.map(asset => ({
    ...asset,
    description: `${asset.name} (${asset.symbol}) is a digital currency that aims to revolutionize the crypto space.`,
    isFavorite: false
  })),
  loading: false,
  error: null,
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrices: (state, action: PayloadAction<{ 
      id: string; 
      newPrice: number;
      newChanges: {
        h1: number;
        h24: number;
        d7: number;
      };
      newVolume: number;
    }>) => {
      const asset = state.assets.find(a => a.id === action.payload.id);
      if (asset) {
        asset.currentPrice = action.payload.newPrice;
        asset.priceChange1h = action.payload.newChanges.h1;
        asset.priceChange24h = action.payload.newChanges.h24;
        asset.priceChange7d = action.payload.newChanges.d7;
        asset.volume24h = action.payload.newVolume;
      }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const asset = state.assets.find(a => a.id === action.payload);
      if (asset) {
        asset.isFavorite = !asset.isFavorite;
      }
    },
  },
});

export const { updatePrices, toggleFavorite } = cryptoSlice.actions;
export default cryptoSlice.reducer;

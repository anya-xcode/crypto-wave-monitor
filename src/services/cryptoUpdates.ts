
import { store } from '../store/store';
import { updatePrices } from '../store/cryptoSlice';

class CryptoWebSocketSimulator {
  private interval: NodeJS.Timeout | null = null;

  start() {
    this.interval = setInterval(() => {
      const assets = store.getState().crypto.assets;
      
      // Randomly select an asset to update
      const asset = assets[Math.floor(Math.random() * assets.length)];
      
      // Generate random price change (-2% to +2%)
      const priceChange = (Math.random() * 4 - 2) / 100;
      const newPrice = asset.currentPrice * (1 + priceChange);
      
      // Generate random changes for different timeframes
      const newChanges = {
        h1: asset.priceChange1h + (Math.random() * 2 - 1),
        h24: asset.priceChange24h + (Math.random() * 2 - 1),
        d7: asset.priceChange7d + (Math.random() * 2 - 1),
      };
      
      // Generate random volume change (-5% to +5%)
      const volumeChange = (Math.random() * 10 - 5) / 100;
      const newVolume = asset.volume24h * (1 + volumeChange);

      store.dispatch(updatePrices({
        id: asset.id,
        newPrice,
        newChanges,
        newVolume,
      }));
    }, 1500);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

export const cryptoSimulator = new CryptoWebSocketSimulator();

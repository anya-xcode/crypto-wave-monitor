
# Real-Time Crypto Price Tracker
##demo link: cryptoworldislive.netlify.app
A responsive React application that simulates real-time cryptocurrency price tracking using Redux Toolkit for state management.

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Recharts for sparkline visualization
- WebSocket simulation for real-time updates

## Features

- Real-time price updates (simulated)
- Responsive design
- Price change indicators
- 7-day sparkline charts
- Formatted numbers and percentages
- Sorted by market cap
- Color-coded positive/negative changes

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open [http://localhost:8080](http://localhost:8080)

## Architecture

The application uses Redux Toolkit for state management with the following structure:

- **Store**: Central state management
- **Slices**: Crypto assets slice for managing cryptocurrency data
- **Services**: WebSocket simulator for real-time updates
- **Components**: Reusable UI components
- **Utils**: Formatting and helper functions

## Implementation Details

- Uses simulated WebSocket updates with `setInterval`
- Implements proper TypeScript types
- Follows React best practices
- Uses Tailwind CSS for styling
- Implements responsive design

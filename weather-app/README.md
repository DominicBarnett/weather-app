# Weather App

A React-based weather application that allows users to check current weather conditions by entering a US zip code.

## Features

- Real-time weather data using OpenWeatherMap API
- Clean and responsive user interface
- Temperature display in Fahrenheit
- Weather description and icon display
- Error handling for invalid zip codes or API issues
- Loading states for better user experience

## Prerequisites

- Node.js (v18 or higher)
- npm (v10 or higher)
- An OpenWeatherMap API key (get one at [OpenWeatherMap](https://openweathermap.org/api))

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

## Running the Application

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:
```bash
npm run build
```

## Project Structure

- `src/WeatherApp.jsx` - Main weather application component
- `src/WeatherApp.css` - Styles for the weather application
- `src/App.jsx` - Root application component
- `src/App.css` - Global styles
- `.env` - Environment variables (not committed to version control)

## Technologies Used

- React
- Vite
- Axios
- OpenWeatherMap API
- CSS3

## License

MIT

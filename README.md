# OpenPol - AI Business Solutions

A modern React application for OpenPol's AI business solutions website.

## Features

- Modern React 19 with TypeScript support
- Responsive design with Tailwind CSS
- Google Analytics 4 integration
- Contact forms with EmailJS
- Smooth animations with Framer Motion
- Consultation modal system

## Analytics Setup

This project includes Google Analytics 4 tracking. To set up analytics:

1. Follow the instructions in `ANALYTICS_SETUP.md`
2. Create a `.env` file in the project root with your Google Analytics Measurement ID:
   ```
   REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## Analytics Tracking

The following events are automatically tracked:

- Page views
- Button clicks (consultation buttons, form submissions)
- Form submissions (contact form, consultation modal)
- Modal interactions (open, close)

## Environment Variables

Create a `.env` file in the project root with:

```
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Google Analytics Measurement ID.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your environment variables
4. Start the development server: `npm start`

## Technologies Used

- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- EmailJS
- Google Analytics 4

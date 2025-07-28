import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initGA = () => {
  // Your Google Analytics Measurement ID
  const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-N1VFME1WV9';
  
  ReactGA.initialize(GA_MEASUREMENT_ID);
  console.log('Google Analytics initialized with ID:', GA_MEASUREMENT_ID);
};

// Track page views
export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

// Track custom events
export const logEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

// Track button clicks
export const logButtonClick = (buttonName) => {
  ReactGA.event({
    category: 'Button Click',
    action: 'Click',
    label: buttonName,
  });
};

// Track form submissions
export const logFormSubmission = (formName) => {
  ReactGA.event({
    category: 'Form Submission',
    action: 'Submit',
    label: formName,
  });
};

// Track consultation modal interactions
export const logModalInteraction = (action) => {
  ReactGA.event({
    category: 'Modal Interaction',
    action: action,
    label: 'Consultation Modal',
  });
}; 
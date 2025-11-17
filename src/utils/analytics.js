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

// Track scroll depth (25%, 50%, 75%, 100%)
let scrollDepthTracked = { 25: false, 50: false, 75: false, 100: false };

export const trackScrollDepth = () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY;
  const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

  // Track milestones
  if (scrollPercent >= 25 && !scrollDepthTracked[25]) {
    logEvent('Engagement', 'Scroll', '25%');
    scrollDepthTracked[25] = true;
  }
  if (scrollPercent >= 50 && !scrollDepthTracked[50]) {
    logEvent('Engagement', 'Scroll', '50%');
    scrollDepthTracked[50] = true;
  }
  if (scrollPercent >= 75 && !scrollDepthTracked[75]) {
    logEvent('Engagement', 'Scroll', '75%');
    scrollDepthTracked[75] = true;
  }
  if (scrollPercent >= 100 && !scrollDepthTracked[100]) {
    logEvent('Engagement', 'Scroll', '100%');
    scrollDepthTracked[100] = true;
  }
};

// Track section views (when section enters viewport)
export const logSectionView = (sectionName) => {
  ReactGA.event({
    category: 'Section View',
    action: 'View',
    label: sectionName,
  });
};

// Track video interactions
export const logVideoPlay = (videoName) => {
  ReactGA.event({
    category: 'Video',
    action: 'Play',
    label: videoName,
  });
};

export const logVideoPause = (videoName) => {
  ReactGA.event({
    category: 'Video',
    action: 'Pause',
    label: videoName,
  });
};

export const logVideoComplete = (videoName) => {
  ReactGA.event({
    category: 'Video',
    action: 'Complete',
    label: videoName,
  });
};

// Track external link clicks
export const logExternalLink = (linkUrl, linkText) => {
  ReactGA.event({
    category: 'Outbound Link',
    action: 'Click',
    label: linkText || linkUrl,
  });
};

// Track service interest (when user views a specific service)
export const logServiceInterest = (serviceName) => {
  ReactGA.event({
    category: 'Service Interest',
    action: 'View',
    label: serviceName,
  });
};

// Track download events
export const logDownload = (fileType, fileName) => {
  ReactGA.event({
    category: 'Download',
    action: 'Download',
    label: `${fileType} - ${fileName}`,
  });
};

// Track chat interactions
export const logChatInteraction = (action, chatName = 'OpenPol Chat') => {
  ReactGA.event({
    category: 'Chat',
    action: action,
    label: chatName,
  });
};

// Track form errors
export const logFormError = (formName, errorType) => {
  ReactGA.event({
    category: 'Error',
    action: 'Form Validation',
    label: `${formName} - ${errorType}`,
  });
};

// Track navigation link clicks
export const logNavigationClick = (linkLabel, linkHref) => {
  ReactGA.event({
    category: 'Navigation',
    action: 'Click',
    label: `${linkLabel} (${linkHref})`,
  });
};

// Track testimonials carousel interactions
export const logTestimonialNavigation = (action, testimonialIndex) => {
  ReactGA.event({
    category: 'Testimonials',
    action: action,
    label: `Testimonial ${testimonialIndex + 1}`,
  });
};

// Track mobile menu interactions
export const logMobileMenuInteraction = (action) => {
  ReactGA.event({
    category: 'Mobile Menu',
    action: action,
    label: 'Navigation Menu',
  });
};

// Track logo/home clicks
export const logLogoClick = () => {
  ReactGA.event({
    category: 'Navigation',
    action: 'Logo Click',
    label: 'Home',
  });
}; 
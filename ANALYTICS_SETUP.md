# Google Analytics Setup Guide

## Step 1: Create a New Google Analytics Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your existing account
3. Click on the gear icon (Admin) in the bottom left
4. In the Property column, click "Create Property"
5. Enter your property name (e.g., "OpenPol Website")
6. Choose your reporting time zone and currency
7. Click "Next"
8. Fill in your business information and click "Create"

## Step 2: Set Up Data Stream

1. After creating the property, you'll be prompted to set up a data stream
2. Click "Web" to create a web stream
3. Enter your website URL (e.g., `https://yourdomain.com`)
4. Enter a stream name (e.g., "OpenPol Website")
5. Click "Create stream"

## Step 3: Get Your Measurement ID

1. After creating the stream, you'll see your Measurement ID (starts with "G-")
2. Copy this Measurement ID - you'll need it for the next step

## Step 4: Configure Your React App

✅ **Already configured!** Your Google Analytics Measurement ID `G-N1VFME1WV9` has been added to the project.

The analytics are now set up and ready to track:
- Page views
- Button clicks
- Form submissions
- Modal interactions

If you need to change the Measurement ID in the future, update it in:
- `src/utils/analytics.js` (line 5)
- `public/index.html` (Google Tag Manager script)

## Step 5: Test Your Analytics

1. Start your development server: `npm start`
2. Open your browser's developer tools
3. Check the console for "Google Analytics initialized" message
4. Visit your Google Analytics dashboard to see real-time data

## Available Analytics Functions

The following functions are available in your app:

- `logPageView()` - Tracks page views
- `logEvent(category, action, label)` - Tracks custom events
- `logButtonClick(buttonName)` - Tracks button clicks
- `logFormSubmission(formName)` - Tracks form submissions
- `logModalInteraction(action)` - Tracks modal interactions

## Example Usage

```javascript
import { logButtonClick, logFormSubmission } from './utils/analytics';

// Track a button click
logButtonClick('Contact Form Submit');

// Track a form submission
logFormSubmission('Contact Form');
```

## Important Notes

- Analytics will only work in production or when you have a valid Measurement ID
- Make sure to add `.env` to your `.gitignore` file to keep your Measurement ID private
- The analytics will automatically track page views when users navigate your site 
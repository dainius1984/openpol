# Google Analytics Setup Guide - Step by Step

## 📋 Overview

Your project already has Google Analytics partially configured. This guide will help you:
1. Set up a Google Analytics account (if you don't have one)
2. Get your Measurement ID
3. Configure it properly in your project
4. Test that it's working

---

## ✅ Current Status

**Already Configured:**
- ✅ `react-ga4` library installed
- ✅ Analytics utility functions created (`src/utils/analytics.js`)
- ✅ Google Tag (gtag.js) script added to HTML
- ✅ Hardcoded Measurement ID: `G-N1VFME1WV9`

**What You Need to Do:**
- Get your own Google Analytics Measurement ID (or verify the existing one)
- Set up environment variable (recommended)
- Test the connection

---

## 🚀 Step-by-Step Setup

### Step 1: Create Google Analytics Account (If You Don't Have One)

1. **Go to Google Analytics**
   - Visit: https://analytics.google.com/
   - Sign in with your Google account

2. **Create an Account**
   - Click "Start measuring" or "Admin" → "Create Account"
   - Enter Account Name: `OpenPol` (or your preferred name)
   - Configure account settings (timezone, currency)
   - Click "Next"

3. **Create a Property**
   - Property Name: `OpenPol Website`
   - Reporting Time Zone: `(GMT+01:00) Warsaw`
   - Currency: `PLN` (Polish Zloty)
   - Click "Next"

4. **Set Up Data Stream**
   - Select "Web" platform
   - Website URL: `https://openpol.pl` (or your domain)
   - Stream Name: `OpenPol Website`
   - Click "Create stream"

### Step 2: Get Your Measurement ID

1. **After creating the stream**, you'll see your **Measurement ID**
   - Format: `G-XXXXXXXXXX` (starts with "G-")
   - Example: `G-N1VFME1WV9`
   - **Copy this ID** - you'll need it in the next step

2. **Verify the Measurement ID**
   - Go to Admin → Data Streams
   - Click on your web stream
   - Your Measurement ID is displayed at the top

---

## ⚙️ Step 3: Configure Your Project

### Option A: Using Environment Variable (Recommended)

This is the **best practice** as it keeps your Measurement ID secure and allows different IDs for development/production.

1. **Create `.env` file** in the project root:
   ```bash
   # In your project root directory
   touch .env
   ```

2. **Add your Measurement ID** to `.env`:
   ```env
   REACT_APP_GA_MEASUREMENT_ID=G-N1VFME1WV9
   ```
   *(Replace `G-N1VFME1WV9` with your actual Measurement ID)*

3. **Verify `.env` is in `.gitignore`**:
   ```bash
   # Check if .gitignore exists and contains .env
   cat .gitignore | grep .env
   ```
   
   If not, add `.env` to `.gitignore`:
   ```gitignore
   # Environment variables
   .env
   .env.local
   .env.development.local
   .env.test.local
   .env.production.local
   ```

4. **The code is already set up!** 
   - `src/utils/analytics.js` already reads from `process.env.REACT_APP_GA_MEASUREMENT_ID`
   - It falls back to `G-N1VFME1WV9` if the env variable is not set

### Option B: Update Hardcoded ID (Quick but Not Recommended)

If you want to use a different Measurement ID without environment variables:

1. **Update `src/utils/analytics.js`**:
   ```javascript
   const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || 'YOUR-NEW-ID-HERE';
   ```

2. **Update `public/index.html`** (line 76 and 82):
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-NEW-ID-HERE"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'YOUR-NEW-ID-HERE');
   </script>
   ```

---

## 🧪 Step 4: Test Your Setup

### Test 1: Check Console Logs

1. **Start your development server**:
   ```bash
   npm start
   ```

2. **Open browser console** (F12 → Console tab)

3. **Look for this message**:
   ```
   Google Analytics initialized with ID: G-N1VFME1WV9
   ```
   *(Should show your Measurement ID)*

### Test 2: Check Network Requests

1. **Open browser DevTools** (F12)
2. **Go to Network tab**
3. **Filter by "collect" or "gtag"**
4. **Reload the page**
5. **You should see requests to**:
   - `https://www.googletagmanager.com/gtag/js?id=G-...`
   - `https://www.google-analytics.com/g/collect?...`

### Test 3: Real-Time Reports in Google Analytics

1. **Go to Google Analytics Dashboard**
2. **Navigate to**: Reports → Real-time
3. **Visit your website** (localhost or production)
4. **You should see yourself as an active user** within 30 seconds

### Test 4: Test Event Tracking

1. **Click any button** on your site (e.g., "Bezpłatna Konsultacja")
2. **Check Google Analytics**:
   - Go to: Reports → Real-time → Events
   - You should see "Button Click" events

---

## 📊 What's Being Tracked

Your project is already configured to track:

### ✅ Automatic Tracking
- **Page Views** - Every page navigation
- **Page Load** - Initial page load

### ✅ Custom Events (Already Implemented)
- **Button Clicks** - All consultation buttons
- **Form Submissions** - Contact form and consultation modal
- **Modal Interactions** - Opening/closing consultation modal

### 📍 Event Categories Currently Tracked:
- `Button Click` - All CTA buttons
- `Form Submission` - Contact forms
- `Modal Interaction` - Consultation modal

---

## 🔧 Advanced Configuration

### Add More Event Tracking

You can add custom events anywhere in your components:

```javascript
import { logEvent, logButtonClick } from '../utils/analytics';

// Track custom event
logEvent('Video', 'Play', 'Hero Video');

// Track button click
logButtonClick('Download Brochure');
```

### Track Page Views on Route Changes

If you add React Router later, track page views:

```javascript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logPageView } from '../utils/analytics';

function App() {
  const location = useLocation();
  
  useEffect(() => {
    logPageView();
  }, [location]);
  
  // ... rest of your app
}
```

---

## 🐛 Troubleshooting

### Problem: "Google Analytics initialized" message not showing

**Solutions:**
1. Check browser console for errors
2. Verify Measurement ID is correct
3. Check if `.env` file exists and has correct variable name
4. Restart development server after creating `.env`

### Problem: No data in Google Analytics

**Solutions:**
1. Wait 24-48 hours for data to appear (Real-time should work immediately)
2. Check if ad blockers are enabled (they block GA)
3. Verify Measurement ID matches in both places:
   - `src/utils/analytics.js`
   - `public/index.html`
4. Check browser console for GA errors

### Problem: Events not tracking

**Solutions:**
1. Verify `react-ga4` is installed: `npm list react-ga4`
2. Check if analytics functions are imported correctly
3. Verify events are being called (add console.log before GA calls)
4. Check Google Analytics DebugView (requires GA Debugger extension)

---

## 📝 Checklist

- [ ] Google Analytics account created
- [ ] Property created for your website
- [ ] Data stream configured (Web)
- [ ] Measurement ID copied
- [ ] `.env` file created with `REACT_APP_GA_MEASUREMENT_ID`
- [ ] `.env` added to `.gitignore`
- [ ] Development server restarted
- [ ] Console shows "Google Analytics initialized"
- [ ] Real-time reports show activity
- [ ] Button clicks tracked in events

---

## 🔒 Security Best Practices

1. ✅ **Use Environment Variables** - Never commit `.env` files
2. ✅ **Keep Measurement ID Private** - It's public anyway, but good practice
3. ✅ **Use Different IDs** - Separate IDs for dev/staging/production
4. ✅ **Review Data Retention** - Set appropriate retention in GA settings
5. ✅ **Enable IP Anonymization** - Already handled by react-ga4

---

## 📚 Additional Resources

- [Google Analytics Documentation](https://support.google.com/analytics)
- [react-ga4 Documentation](https://github.com/codler/react-ga4)
- [Google Analytics Debugger Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)

---

## ✅ Quick Start Summary

**If you already have a Measurement ID:**

1. Create `.env` file in project root
2. Add: `REACT_APP_GA_MEASUREMENT_ID=G-YOUR-ID-HERE`
3. Restart dev server: `npm start`
4. Check console for "Google Analytics initialized"
5. Visit Google Analytics Real-time reports to verify

**That's it!** Your analytics are now tracking. 🎉

---

*Last Updated: Based on current project setup*



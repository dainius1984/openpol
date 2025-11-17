# Custom Events Implementation Guide

## ✅ What Has Been Implemented

Your Google Analytics setup now includes enhanced tracking capabilities! Here's what's been added:

### 📊 New Tracking Functions Available

1. **Scroll Depth Tracking** - Automatically tracks when users scroll 25%, 50%, 75%, and 100% of the page
2. **Section View Tracking** - Tracks when users view specific sections (Hero, About, Contact, etc.)
3. **Video Interaction Tracking** - Tracks video play, pause, and completion events
4. **Form Error Tracking** - Tracks form validation errors and submission failures
5. **Service Interest Tracking** - Track which services users are interested in
6. **External Link Tracking** - Track clicks on external links
7. **Download Tracking** - Track file downloads
8. **Chat Interaction Tracking** - Track chat widget interactions

### 🎯 Currently Active Tracking

- ✅ **Scroll Depth** - Tracks 25%, 50%, 75%, 100% scroll milestones
- ✅ **Section Views** - Hero Section, About Section, Contact Section
- ✅ **Video Interactions** - Hero background video play/pause/complete
- ✅ **Form Errors** - Contact form validation and submission errors
- ✅ **Button Clicks** - All consultation buttons (already existed)
- ✅ **Form Submissions** - Contact form and consultation modal (already existed)
- ✅ **Modal Interactions** - Consultation modal open/close (already existed)

---

## 🔧 How to Add More Custom Events

### Step 1: Import the Function

In any component, import the tracking function you need:

```javascript
import { 
  logEvent,           // Generic custom event
  logSectionView,     // Track section views
  logVideoPlay,       // Track video plays
  logServiceInterest, // Track service interest
  logExternalLink,    // Track external links
  logDownload,        // Track downloads
  logChatInteraction, // Track chat interactions
  logFormError        // Track form errors
} from '../utils/analytics';
```

### Step 2: Add Tracking to Your Component

#### Example 1: Track Section View

```javascript
import React, { useRef, useEffect } from 'react';
import { logSectionView } from '../utils/analytics';

export const MySection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            logSectionView('My Section Name');
            observer.disconnect(); // Only track once
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef}>
      {/* Your content */}
    </section>
  );
};
```

#### Example 2: Track Service Interest

```javascript
import { logServiceInterest } from '../utils/analytics';

// When user clicks on a service card
const handleServiceClick = (serviceName) => {
  logServiceInterest(serviceName);
  // ... rest of your logic
};
```

#### Example 3: Track External Links

```javascript
import { logExternalLink } from '../utils/analytics';

<a 
  href="https://external-site.com"
  onClick={() => logExternalLink('https://external-site.com', 'Partner Website')}
  target="_blank"
  rel="noopener noreferrer"
>
  Visit Partner Site
</a>
```

#### Example 4: Track Downloads

```javascript
import { logDownload } from '../utils/analytics';

<a 
  href="/documents/brochure.pdf"
  download
  onClick={() => logDownload('PDF', 'Training Brochure')}
>
  Download Brochure
</a>
```

#### Example 5: Track Video Interactions

```javascript
import { logVideoPlay, logVideoPause, logVideoComplete } from '../utils/analytics';

useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  const handlePlay = () => logVideoPlay('My Video Name');
  const handlePause = () => logVideoPause('My Video Name');
  const handleEnded = () => logVideoComplete('My Video Name');

  video.addEventListener('play', handlePlay);
  video.addEventListener('pause', handlePause);
  video.addEventListener('ended', handleEnded);

  return () => {
    video.removeEventListener('play', handlePlay);
    video.removeEventListener('pause', handlePause);
    video.removeEventListener('ended', handleEnded);
  };
}, []);
```

#### Example 6: Track Chat Interactions

```javascript
import { logChatInteraction } from '../utils/analytics';

// When chat opens
const handleChatOpen = () => {
  logChatInteraction('Open', 'OpenPol Chat');
  // ... rest of logic
};

// When user sends a message
const handleChatMessage = () => {
  logChatInteraction('Message Sent', 'OpenPol Chat');
  // ... rest of logic
};
```

#### Example 7: Generic Custom Event

```javascript
import { logEvent } from '../utils/analytics';

// Track any custom event
logEvent('Category', 'Action', 'Label');

// Examples:
logEvent('Newsletter', 'Subscribe', 'Footer Form');
logEvent('Testimonial', 'View', 'Client Testimonial 1');
logEvent('Case Study', 'Download', 'Success Story PDF');
```

---

## 📈 What to Configure in Google Analytics

### Good News: **Almost Nothing!** 🎉

Google Analytics 4 (GA4) automatically collects custom events. You don't need to configure anything in GA4 for basic event tracking to work.

### Optional: Create Custom Reports

While events are automatically tracked, you can create custom reports to better visualize your data:

#### Step 1: View Events in Real-Time

1. Go to your Google Analytics dashboard
2. Navigate to: **Reports → Real-time → Events**
3. You'll see all your custom events appearing in real-time

#### Step 2: Create Custom Event Reports

1. Go to: **Reports → Engagement → Events**
2. You'll see all tracked events listed
3. Click on any event to see detailed metrics

#### Step 3: Create Custom Dimensions (Optional)

If you want to create custom reports with better organization:

1. Go to: **Admin → Custom Definitions → Custom Dimensions**
2. Click **Create custom dimension**
3. Add dimensions like:
   - **Section Name** (for section views)
   - **Video Name** (for video tracking)
   - **Service Name** (for service interest)

#### Step 4: Set Up Conversions (Important!)

Mark important events as conversions:

1. Go to: **Admin → Events**
2. Find events you want to track as conversions (e.g., "Form Submission", "Button Click")
3. Toggle the **Mark as conversion** switch
4. This helps you track your most important user actions

**Recommended Conversions:**
- ✅ Form Submission
- ✅ Button Click (consultation buttons)
- ✅ Modal Interaction (when consultation modal opens)

#### Step 5: Create Custom Reports (Optional)

1. Go to: **Explore → Free Form**
2. Create a report with:
   - **Dimensions**: Event name, Event category
   - **Metrics**: Event count, Users
3. Save the report for easy access

---

## 🧪 Testing Your Events

### Method 1: Real-Time Reports

1. Open your website in a browser
2. Go to Google Analytics: **Reports → Real-time → Events**
3. Perform actions on your site (scroll, click buttons, etc.)
4. You should see events appear within 30 seconds

### Method 2: Browser Console

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Filter by "collect" or "gtag"
4. Perform actions on your site
5. You'll see requests being sent to Google Analytics

### Method 3: Google Analytics DebugView

1. Install [Google Analytics Debugger Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
2. Enable the extension
3. Go to Google Analytics: **Admin → DebugView**
4. Perform actions on your site
5. See detailed event information in real-time

---

## 📊 Event Categories Reference

Here's a quick reference of event categories being tracked:

| Category | Purpose | Examples |
|----------|---------|----------|
| `Button Click` | Track button interactions | Consultation buttons, CTA buttons |
| `Form Submission` | Track form submissions | Contact form, Consultation modal |
| `Modal Interaction` | Track modal open/close | Consultation modal |
| `Engagement` | Track user engagement | Scroll depth (25%, 50%, 75%, 100%) |
| `Section View` | Track section visibility | Hero, About, Contact sections |
| `Video` | Track video interactions | Play, Pause, Complete |
| `Service Interest` | Track service views | Strategy, Implementation, Training |
| `Outbound Link` | Track external links | Partner websites, social media |
| `Download` | Track file downloads | PDFs, documents |
| `Chat` | Track chat interactions | Open, Message Sent |
| `Error` | Track errors | Form validation errors |

---

## 🎯 Recommended Next Steps

### High Priority Events to Add:

1. **Service Section Views** - Track when users view each service (Strategy, Implementation, Training, OpenPol Chat)
2. **Testimonials Interaction** - Track when users view/expand testimonials
3. **Newsletter Signup** - If you add a newsletter form
4. **Document Downloads** - If you add downloadable resources

### Example: Add Service Section Tracking

```javascript
// In StrategySection.jsx, ImplementationSection.jsx, TrainingSection.jsx
import { logServiceInterest } from '../utils/analytics';

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          logServiceInterest('Strategy Consulting'); // or 'Implementation', 'Training'
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => observer.disconnect();
}, []);
```

---

## 🔍 Viewing Your Data

### Where to Find Your Events:

1. **Real-Time Events**: Reports → Real-time → Events
2. **All Events**: Reports → Engagement → Events
3. **Event Details**: Click on any event name to see:
   - Total count
   - Users who triggered it
   - Event parameters (category, action, label)

### Key Metrics to Monitor:

- **Form Submissions** - How many leads are generated
- **Button Clicks** - Which CTAs are most effective
- **Scroll Depth** - How engaged users are with your content
- **Section Views** - Which sections get the most attention
- **Service Interest** - Which services users are most interested in

---

## 🐛 Troubleshooting

### Events Not Appearing?

1. **Check Browser Console** - Look for errors
2. **Verify Analytics Initialization** - Should see "Google Analytics initialized" message
3. **Check Network Tab** - Should see requests to `google-analytics.com/g/collect`
4. **Disable Ad Blockers** - They can block GA requests
5. **Wait 24-48 Hours** - Some reports take time to populate (Real-time should work immediately)

### Events Appearing But Wrong Data?

1. **Check Event Names** - Make sure you're using consistent naming
2. **Verify Parameters** - Category, Action, Label should be strings
3. **Check Real-Time Reports** - Verify events are being sent correctly

---

## 📝 Summary

✅ **Code Changes**: Already implemented! Your site now tracks:
- Scroll depth
- Section views
- Video interactions
- Form errors
- All existing button clicks and form submissions

✅ **Google Analytics**: No configuration needed! Events are automatically tracked.

🎯 **Optional**: Create custom reports and mark important events as conversions for better insights.

---

*Last Updated: Based on current implementation*


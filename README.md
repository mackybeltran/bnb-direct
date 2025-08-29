# Direct Booking BnB Framework

A Firebase Functions-based framework that enables hosts to bypass Airbnb fees by providing direct booking capabilities. This framework fetches availability data from Airbnb's iCal feed and manages direct bookings.

## 🚀 Quick Start

### Prerequisites
- Node.js 22 or higher
- Firebase CLI installed globally: `npm install -g firebase-tools`
- A Firebase project

### 1. Firebase Project Setup

1. **Create a new Firebase project:**
   ```bash
   firebase login
   firebase projects:create your-project-name
   ```

2. **Initialize Firebase in your project:**
   ```bash
   firebase init functions
   ```
   - Select your project
   - Choose TypeScript
   - Use ESLint
   - Install dependencies with npm

3. **Enable required Firebase services:**
   ```bash
   firebase init firestore
   firebase init hosting  # Optional, for web interface
   ```

### 2. Environment Configuration

1. **Copy the environment template:**
   ```bash
   cd functions
   cp .env.example .env
   ```

2. **Configure your environment variables in `.env`:**
   ```env
   # Airbnb iCal URLs for fetching availability data
   # Get these from your Airbnb listings' calendar export
   # Separate multiple URLs with commas
   AIRBNB_ICAL_URLS=https://www.airbnb.com/calendar/ical/YOUR_LISTING_ID.ics,https://www.airbnb.com/calendar/ical/YOUR_LISTING_ID2.ics

   # API Configuration
   API_BASE_URL=http://localhost:5001/your-project-id/us-central1

   # Firebase configuration (if using service account)
   # FIREBASE_PROJECT_ID=your-project-id
   # FIREBASE_PRIVATE_KEY=your-private-key
   # FIREBASE_CLIENT_EMAIL=your-client-email
   ```

### 3. Get Your Airbnb iCal URLs

1. Go to each of your Airbnb listings
2. Navigate to Calendar → Export Calendar
3. Copy the iCal URL provided for each listing
4. Add all URLs to the `AIRBNB_ICAL_URLS` variable, separated by commas
5. Replace `YOUR_LISTING_ID` with your actual listing IDs

### 4. Install Dependencies

```bash
cd functions
npm install
```

### 5. Local Development

```bash
# Start Firebase emulators
firebase emulators:start

# Or start functions only
npm run serve
```

### 6. Deploy to Production

```bash
# Deploy functions only
firebase deploy --only functions

# Deploy everything
firebase deploy
```

## 📁 Project Structure

```
bnbdirect/
├── functions/
│   ├── src/
│   │   └── index.ts          # Main Firebase Functions
│   ├── .env.example          # Environment template
│   ├── .env                  # Your environment variables (not in git)
│   └── package.json
├── firebase.json             # Firebase configuration
└── README.md
```

## 🔧 Available Functions

- `testEnv` - Test endpoint to verify environment variables are loaded correctly
- `getIcalUrls` - Get all configured iCal URLs for your listings

## 🛠️ Development

### Adding New Functions

1. Add your function to `functions/src/index.ts`
2. Export it using Firebase Functions v2 syntax
3. Test locally with `npm run serve`
4. Deploy with `firebase deploy --only functions`

### Environment Variables

All client-specific information should be stored in environment variables:

- **`AIRBNB_ICAL_URLS`** - Required: Your Airbnb iCal feed URLs (comma-separated for multiple listings)
- **`API_BASE_URL`** - Required: Your Firebase Functions base URL
- **Firebase config** - Optional: Service account details if needed

## 🔒 Security

- `.env` files are automatically excluded from git
- Never commit sensitive information
- Use Firebase Security Rules for database access
- Validate all inputs in your functions

## 🚀 Forking for Multiple Clients

1. **Fork this repository** for each client
2. **Update the `.env` file** with client-specific information
3. **Customize branding** and business logic as needed
4. **Deploy to separate Firebase projects**

## 📝 TODO

- [ ] Implement iCal parsing functionality
- [ ] Add booking management system
- [ ] Create web interface for hosts
- [ ] Add payment processing
- [ ] Implement availability sync
- [ ] Add email notifications
- [ ] Create admin dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

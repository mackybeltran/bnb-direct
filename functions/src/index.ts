/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions";
import {onRequest} from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

// Load environment variables
import * as dotenv from "dotenv";
dotenv.config();

// Environment variables
const AIRBNB_ICAL_URLS = process.env.AIRBNB_ICAL_URLS;
const API_BASE_URL = process.env.API_BASE_URL;

// Parse multiple iCal URLs from comma-separated string
const parseIcalUrls = (urlsString: string | undefined): string[] => {
  if (!urlsString) return [];
  return urlsString.split(',').map(url => url.trim()).filter(url => url.length > 0);
};

const icalUrls = parseIcalUrls(AIRBNB_ICAL_URLS);

// Validate required environment variables
if (!AIRBNB_ICAL_URLS || icalUrls.length === 0) {
  logger.error("AIRBNB_ICAL_URLS environment variable is required with at least one URL");
  throw new Error("AIRBNB_ICAL_URLS environment variable is required with at least one URL");
}

if (!API_BASE_URL) {
  logger.error("API_BASE_URL environment variable is required");
  throw new Error("API_BASE_URL environment variable is required");
}

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Example function to test environment variables
export const testEnv = onRequest((request, response) => {
  logger.info("Testing environment variables", {structuredData: true});
  response.json({
    message: "Environment variables loaded successfully",
    icalUrlsCount: icalUrls.length,
    icalUrls: icalUrls,
    apiBaseUrl: API_BASE_URL
  });
});

// Function to get all iCal URLs
export const getIcalUrls = onRequest((request, response) => {
  logger.info("Getting iCal URLs", {structuredData: true});
  response.json({
    urls: icalUrls,
    count: icalUrls.length
  });
});

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

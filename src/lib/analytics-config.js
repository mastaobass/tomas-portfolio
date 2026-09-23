// Public PostHog project API key (Project settings → Project API key).
// Same class of token as a GA measurement ID. Override with PUBLIC_POSTHOG_KEY
// at build time. Do not replace this with a personal or private API key.
// Ingest goes through the first-party proxy at e.tomas-stonehouse.com
// (CNAME → PostHog's managed US proxy). ui_host stays us.posthog.com.
export const POSTHOG_KEY = "phc_szB8krkpVmGCnqgGgcyWN4jvLcrbGspd4aAJ4PyPxrFZ";
export const POSTHOG_HOST = "https://e.tomas-stonehouse.com";

// Google Analytics 4 Measurement ID for www.tomas-stonehouse.com
export const GA_MEASUREMENT_ID = "G-38GJ87BDW6";

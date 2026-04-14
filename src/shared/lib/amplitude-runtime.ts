import type { AuthUser } from '../types/auth';

type AmplitudeAnalyticsModule = typeof import('@amplitude/analytics-browser');
type AmplitudeSessionReplayPluginModule = typeof import('@amplitude/plugin-session-replay-browser');

let amplitudeAnalyticsModulePromise: Promise<AmplitudeAnalyticsModule> | null = null;
let amplitudeSessionReplayPluginModulePromise: Promise<AmplitudeSessionReplayPluginModule> | null =
  null;
let isAmplitudeInitialized = false;
let isSessionReplayAdded = false;

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

async function getAmplitudeAnalytics() {
  if (!amplitudeAnalyticsModulePromise) {
    amplitudeAnalyticsModulePromise = import('@amplitude/analytics-browser');
  }

  return amplitudeAnalyticsModulePromise;
}

async function getSessionReplayPlugin() {
  if (!amplitudeSessionReplayPluginModulePromise) {
    amplitudeSessionReplayPluginModulePromise = import('@amplitude/plugin-session-replay-browser');
  }

  return amplitudeSessionReplayPluginModulePromise;
}

function isAmplitudeEnabled() {
  return typeof window !== 'undefined' && !!AMPLITUDE_API_KEY;
}

async function addSessionReplayPlugin() {
  if (isSessionReplayAdded) {
    return;
  }

  const [amplitude, sessionReplay] = await Promise.all([
    getAmplitudeAnalytics(),
    getSessionReplayPlugin(),
  ]);

  await amplitude.add(
    sessionReplay.sessionReplayPlugin({
      sampleRate: 1,
    })
  ).promise;

  isSessionReplayAdded = true;
}

export async function initAmplitudeRuntime() {
  if (!isAmplitudeEnabled() || isAmplitudeInitialized) {
    return;
  }

  const apiKey = AMPLITUDE_API_KEY;

  if (!apiKey) {
    return;
  }

  isAmplitudeInitialized = true;

  try {
    const amplitude = await getAmplitudeAnalytics();
    await amplitude.init(apiKey, {
      autocapture: {
        attribution: true,
        fileDownloads: true,
        formInteractions: true,
        pageViews: true,
        sessions: true,
        elementInteractions: true,
        networkTracking: true,
        webVitals: true,
        frustrationInteractions: {
          thrashedCursor: true,
          errorClicks: true,
          deadClicks: true,
          rageClicks: true,
        },
      },
    }).promise;

    void addSessionReplayPlugin();
  } catch (error) {
    isAmplitudeInitialized = false;

    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to initialize Amplitude.', error);
    }
  }
}

export async function trackEventRuntime(
  eventName: string,
  eventProperties?: Record<string, unknown>
) {
  if (!isAmplitudeEnabled()) {
    return;
  }

  const amplitude = await getAmplitudeAnalytics();
  amplitude.track(eventName, eventProperties);
}

export async function syncAmplitudeUserRuntime(user: AuthUser | null) {
  if (!isAmplitudeEnabled()) {
    return;
  }

  await initAmplitudeRuntime();
  const amplitude = await getAmplitudeAnalytics();

  if (!user) {
    amplitude.reset();
    return;
  }

  amplitude.setUserId(String(user.id) + '-' + user.email);

  const identify = new amplitude.Identify();

  identify.set('email', user.email);
  identify.set('name', user.name);

  if (user.teamId) {
    identify.set('teamId', user.teamId);
    amplitude.setGroup('teamId', user.teamId);
  }

  if (user.companyName) {
    identify.set('companyName', user.companyName);
  }

  amplitude.identify(identify);
}

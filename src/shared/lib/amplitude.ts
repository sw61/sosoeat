import * as amplitude from '@amplitude/unified';

import type { AuthUser } from '../types/auth';

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

let isAmplitudeInitialized = false;

function isAmplitudeEnabled() {
  return typeof window !== 'undefined' && !!AMPLITUDE_API_KEY;
}

export async function initAmplitude() {
  if (!isAmplitudeEnabled() || isAmplitudeInitialized) {
    return;
  }

  const apiKey = AMPLITUDE_API_KEY;

  if (!apiKey) {
    return;
  }

  isAmplitudeInitialized = true;

  try {
    await amplitude.initAll(apiKey, {
      analytics: {
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
      },
      sessionReplay: {
        sampleRate: 1,
      },
    });
  } catch (error) {
    isAmplitudeInitialized = false;

    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to initialize Amplitude.', error);
    }
  }
}

export async function trackEvent(eventName: string, eventProperties?: Record<string, unknown>) {
  if (!isAmplitudeEnabled()) {
    return;
  }
  await initAmplitude();
  amplitude.track(eventName, eventProperties);
}

export function syncAmplitudeUser(user: AuthUser | null) {
  if (!isAmplitudeEnabled()) {
    return;
  }

  if (!user) {
    amplitude.reset();
    return;
  }

  amplitude.setUserId(String(user.id) + '-' + user.name);
  console.log(`Amplitude user set: ${user.id} - ${user.name}`);
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

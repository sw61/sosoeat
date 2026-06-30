import type { AuthUser } from '../types/auth';

interface AmplitudeIdentify {
  set(key: string, value: string): this;
}

interface AmplitudeInstance {
  track(eventName: string, eventProperties?: Record<string, unknown>): void;
  reset(): void;
  setUserId(userId: string): void;
  setGroup(groupType: string, groupName: string): void;
  identify(identify: AmplitudeIdentify): void;
  Identify: new () => AmplitudeIdentify;
}

declare global {
  interface Window {
    amplitude?: AmplitudeInstance;
  }
}

export function initAmplitudeRuntime() {
  // CDN script auto-initializes
}

export function trackEventRuntime(eventName: string, eventProperties?: Record<string, unknown>) {
  if (window.amplitude) {
    window.amplitude.track(eventName, eventProperties);
  }
}

export function syncAmplitudeUserRuntime(user: AuthUser | null) {
  if (!window.amplitude) {
    return;
  }

  if (!user) {
    window.amplitude.reset();
    return;
  }

  window.amplitude.setUserId(String(user.id) + '-' + user.email);

  const identify = new window.amplitude.Identify();

  identify.set('email', user.email);
  identify.set('name', user.name);

  if (user.teamId) {
    identify.set('teamId', user.teamId);
    window.amplitude.setGroup('teamId', user.teamId);
  }

  if (user.companyName) {
    identify.set('companyName', user.companyName);
  }

  window.amplitude.identify(identify);
}

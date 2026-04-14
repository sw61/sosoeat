import type { AuthUser } from '../types/auth';

type AmplitudeRuntimeModule = typeof import('./amplitude-runtime');

let amplitudeRuntimePromise: Promise<AmplitudeRuntimeModule> | null = null;

async function getAmplitudeRuntime() {
  if (!amplitudeRuntimePromise) {
    amplitudeRuntimePromise = import('./amplitude-runtime');
  }

  return amplitudeRuntimePromise;
}

export async function initAmplitude() {
  const runtime = await getAmplitudeRuntime();
  await runtime.initAmplitudeRuntime();
}

export async function trackEvent(eventName: string, eventProperties?: Record<string, unknown>) {
  const runtime = await getAmplitudeRuntime();
  await runtime.trackEventRuntime(eventName, eventProperties);
}

export async function syncAmplitudeUser(user: AuthUser | null) {
  const runtime = await getAmplitudeRuntime();
  await runtime.syncAmplitudeUserRuntime(user);
}

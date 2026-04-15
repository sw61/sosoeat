import { startOfMinute } from 'date-fns';

export const getDefaultSearchDateStart = (now = new Date()) => startOfMinute(now);

export const getDefaultSearchDateStartIso = (now = new Date()) =>
  getDefaultSearchDateStart(now).toISOString();

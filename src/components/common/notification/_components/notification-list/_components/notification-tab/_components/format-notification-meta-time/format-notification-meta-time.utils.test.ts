import { formatNotificationMetaRelativeTime } from './format-notification-meta-time.utils';

describe('formatNotificationMetaRelativeTime', () => {
  const now = new Date('2025-06-15T12:00:00.000Z');

  it('1분 미만은 방금 전', () => {
    expect(formatNotificationMetaRelativeTime(new Date('2025-06-15T11:59:30.000Z'), now)).toBe(
      '방금 전'
    );
  });

  it('1시간 미만은 N분 전 (정확히 60분은 1시간 전)', () => {
    expect(formatNotificationMetaRelativeTime(new Date('2025-06-15T11:00:00.000Z'), now)).toBe(
      '1시간 전'
    );
    expect(formatNotificationMetaRelativeTime(new Date('2025-06-15T11:50:00.000Z'), now)).toBe(
      '10분 전'
    );
    expect(formatNotificationMetaRelativeTime(new Date('2025-06-15T11:59:00.000Z'), now)).toBe(
      '1분 전'
    );
  });

  it('24시간 미만은 N시간 전', () => {
    expect(formatNotificationMetaRelativeTime(new Date('2025-06-15T00:00:00.000Z'), now)).toBe(
      '12시간 전'
    );
    expect(formatNotificationMetaRelativeTime(new Date('2025-06-14T13:00:00.000Z'), now)).toBe(
      '23시간 전'
    );
    expect(formatNotificationMetaRelativeTime(new Date('2025-06-14T12:01:00.000Z'), now)).toBe(
      '23시간 전'
    );
  });

  it('1일 이상은 N일 전', () => {
    expect(formatNotificationMetaRelativeTime(new Date('2025-06-14T12:00:00.000Z'), now)).toBe(
      '1일 전'
    );
    expect(formatNotificationMetaRelativeTime(new Date('2025-06-11T12:00:00.000Z'), now)).toBe(
      '4일 전'
    );
  });

  it('미래 시각은 방금 전', () => {
    expect(formatNotificationMetaRelativeTime(new Date('2025-06-15T13:00:00.000Z'), now)).toBe(
      '방금 전'
    );
  });
});

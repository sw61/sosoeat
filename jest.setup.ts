import '@testing-library/jest-dom';

Object.defineProperty(navigator, 'clipboard', {
  value: { writeText: jest.fn() },
  writable: true,
  configurable: true,
});

jest.mock('isomorphic-dompurify', () => ({
  __esModule: true,
  default: {
    sanitize: (html: string) => html,
  },
}));

process.env.TZ = 'Asia/Seoul';

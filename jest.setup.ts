import '@testing-library/jest-dom';

jest.mock('isomorphic-dompurify', () => ({
  __esModule: true,
  default: {
    sanitize: (html: string) => html,
  },
}));

process.env.TZ = 'Asia/Seoul';

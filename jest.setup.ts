import '@testing-library/jest-dom';

import { TextDecoder, TextEncoder } from 'node:util';

// jsdom 은 TextEncoder/TextDecoder 를 제공하지 않는다 (jose 가 요구)
Object.assign(globalThis, { TextEncoder, TextDecoder });

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

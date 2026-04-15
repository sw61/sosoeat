import { toAbsoluteImageUrl, toKakaoShareUrl } from './sosotalk-share-modal';

describe('sosotalk-share-modal helpers', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/sosotalk/123?tab=comments#reply');
  });

  it('normalizes current page links to the public site domain for Kakao share', () => {
    expect(toKakaoShareUrl(window.location.href)).toBe(
      'https://sosoeat.com/sosotalk/123?tab=comments#reply'
    );
  });

  it('keeps external absolute image urls unchanged', () => {
    expect(toAbsoluteImageUrl('https://example.com/post-image.jpg')).toBe(
      'https://example.com/post-image.jpg'
    );
  });

  it('normalizes relative image paths to the public site domain', () => {
    expect(toAbsoluteImageUrl('/images/logo.svg')).toBe('https://sosoeat.com/images/logo.svg');
  });
});

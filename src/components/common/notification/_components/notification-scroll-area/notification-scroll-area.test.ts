import { scrollAreaDesktopClass, scrollAreaMobileClass } from './notification-scroll-area';

describe('notification-scroll-area', () => {
  it('scrollAreaDesktopClass에 레이아웃·스크롤 유틸이 포함된다', () => {
    expect(scrollAreaDesktopClass).toContain('overflow-y-auto');
    expect(scrollAreaDesktopClass).toContain('h-[360px]');
  });

  it('scrollAreaMobileClass에 레이아웃·스크롤 유틸이 포함된다', () => {
    expect(scrollAreaMobileClass).toContain('flex-1');
    expect(scrollAreaMobileClass).toContain('overflow-y-auto');
  });
});

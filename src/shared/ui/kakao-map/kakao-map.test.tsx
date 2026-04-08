import { render } from '@testing-library/react';

import { KakaoMap } from './kakao-map';

const mockCustomOverlay = jest.fn();
const mockMap = jest.fn();
const mockLatLng = jest.fn();

const mockKakao = {
  maps: {
    load: (cb: () => void) => cb(),
    LatLng: mockLatLng,
    Map: mockMap,
    CustomOverlay: mockCustomOverlay,
  },
};

beforeEach(() => {
  mockCustomOverlay.mockImplementation(() => ({
    setMap: jest.fn(),
  }));
  window.kakao = mockKakao as unknown as typeof kakao;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('KakaoMap', () => {
  it('지도 컨테이너를 렌더링한다', () => {
    const { container } = render(<KakaoMap latitude={37.5697} longitude={126.9822} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('latitude, longitude로 지도를 초기화한다', () => {
    render(<KakaoMap latitude={37.5697} longitude={126.9822} />);
    expect(mockLatLng).toHaveBeenCalledWith(37.5697, 126.9822);
    expect(mockMap).toHaveBeenCalled();
  });

  it('브랜드 라벨이 있는 커스텀 오버레이를 생성한다', () => {
    render(<KakaoMap latitude={37.5697} longitude={126.9822} />);
    expect(mockCustomOverlay).toHaveBeenCalledWith(
      expect.objectContaining({
        yAnchor: 1,
        xAnchor: 0.5,
        content: expect.stringContaining('소소잇'),
      })
    );
    expect(mockCustomOverlay.mock.results[0]?.value.setMap).toHaveBeenCalled();
  });
});

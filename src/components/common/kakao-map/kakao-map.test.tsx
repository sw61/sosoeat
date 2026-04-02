import { render } from '@testing-library/react';

import { KakaoMap } from './kakao-map';

const mockMarker = jest.fn();
const mockMap = jest.fn();
const mockLatLng = jest.fn();
const mockSize = jest.fn();
const mockPoint = jest.fn();
const mockMarkerImage = jest.fn();

const mockKakao = {
  maps: {
    load: (cb: () => void) => cb(),
    LatLng: mockLatLng,
    Size: mockSize,
    Point: mockPoint,
    Map: mockMap,
    MarkerImage: mockMarkerImage,
    Marker: mockMarker,
  },
};

beforeEach(() => {
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

  it('로고 마커 이미지를 생성한다', () => {
    render(<KakaoMap latitude={37.5697} longitude={126.9822} />);
    expect(mockMarkerImage).toHaveBeenCalledWith(
      '/images/logo.svg',
      expect.any(Object),
      expect.objectContaining({ offset: expect.any(Object) })
    );
    expect(mockMarker).toHaveBeenCalled();
  });
});

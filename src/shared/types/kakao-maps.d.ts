declare namespace kakao.maps {
  class LatLng {
    constructor(lat: number, lng: number);
  }

  class Size {
    constructor(width: number, height: number);
  }

  class Point {
    constructor(x: number, y: number);
  }

  class Map {
    constructor(container: HTMLElement, options: { center: LatLng; level: number });
  }

  class MarkerImage {
    constructor(src: string, size: Size, options?: { offset?: Point });
  }

  class Marker {
    constructor(options: { map: Map; position: LatLng; image?: MarkerImage });
  }

  class InfoWindow {
    constructor(options: { content: string });
    open(map: Map, marker: Marker): void;
  }

  class CustomOverlay {
    constructor(options: { position: LatLng; content: string; yAnchor?: number; xAnchor?: number });
    setMap(map: Map | null): void;
  }

  function load(callback: () => void): void;
}

interface Window {
  kakao: typeof kakao;
}

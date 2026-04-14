export interface LocationSearchResult {
  placeName: string;
  addressName: string;
  /** 위도 (Kakao API의 y 값) */
  latitude: number;
  /** 경도 (Kakao API의 x 값) */
  longitude: number;
  /** 시/도 */
  region1: string;
  /** 시/군/구 */
  region2: string;
}

import { KakaoMapLoader } from './_components/kakao-map-loader';

function hasValidMapCoords(latitude: number | null, longitude: number | null): boolean {
  if (latitude == null || longitude == null) return false;
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return false;
  return latitude !== 0 && longitude !== 0;
}

interface MeetingLocationSectionProps {
  address: string;
  latitude: number | null;
  longitude: number | null;
}

export function MeetingLocationSection({
  address,
  latitude,
  longitude,
}: MeetingLocationSectionProps) {
  const kakaoMapAppKey =
    process.env.KAKAO_MAP_APP_KEY ?? process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY ?? '';

  const mapCoords =
    hasValidMapCoords(latitude, longitude) && latitude != null && longitude != null
      ? { latitude, longitude }
      : null;

  const showMap = mapCoords != null && kakaoMapAppKey !== '';

  return (
    <section>
      <h2 className="text-sosoeat-gray-900 mb-3 text-2xl font-semibold">모임 장소</h2>
      <div className="border-sosoeat-gray-200 mt-5 overflow-hidden rounded-[16px] border">
        {showMap ? (
          <KakaoMapLoader
            appKey={kakaoMapAppKey}
            latitude={mapCoords.latitude}
            longitude={mapCoords.longitude}
          />
        ) : null}
        <div className="px-5 py-4">
          <p className="text-sosoeat-gray-900 text-sm font-medium">{address}</p>
        </div>
      </div>
    </section>
  );
}

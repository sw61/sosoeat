import { KakaoMapLoader } from './_components/kakao-map-loader';

interface MeetingLocationSectionProps {
  address: string;
  latitude: number;
  longitude: number;
}

export function MeetingLocationSection({
  address,
  latitude,
  longitude,
}: MeetingLocationSectionProps) {
  const isValidCoords = latitude !== 0 && longitude !== 0;
  const kakaoMapAppKey =
    process.env.KAKAO_MAP_APP_KEY ?? process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY ?? '';

  return (
    <section>
      <h2 className="text-sosoeat-gray-900 mb-3 text-2xl font-semibold">모임 장소</h2>
      <div className="border-sosoeat-gray-200 mt-5 overflow-hidden rounded-[16px] border">
        {isValidCoords && kakaoMapAppKey ? (
          <KakaoMapLoader appKey={kakaoMapAppKey} latitude={latitude} longitude={longitude} />
        ) : (
          <div className="bg-sosoeat-gray-100 h-[240px] w-full md:h-[320px] lg:h-[352px]" />
        )}
        <div className="px-5 py-4">
          <p className="text-sosoeat-gray-900 text-sm font-medium">{address}</p>
        </div>
      </div>
    </section>
  );
}

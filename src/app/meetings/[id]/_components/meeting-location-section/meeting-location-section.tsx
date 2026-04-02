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

  return (
    <section>
      <h2 className="text-sosoeat-gray-900 mb-3 text-2xl font-semibold">모임 장소</h2>
      <div className="border-sosoeat-gray-200 mt-5 overflow-hidden rounded-[16px] border">
        {isValidCoords ? (
          <KakaoMapLoader latitude={latitude} longitude={longitude} />
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

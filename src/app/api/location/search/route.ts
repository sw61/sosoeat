import { NextRequest, NextResponse } from 'next/server';

import * as Sentry from '@sentry/nextjs';

const REGION1_ABBR: Record<string, string> = {
  서울특별시: '서울',
  부산광역시: '부산',
  대구광역시: '대구',
  인천광역시: '인천',
  광주광역시: '광주',
  대전광역시: '대전',
  울산광역시: '울산',
  세종특별자치시: '세종',
  경기도: '경기',
  강원특별자치도: '강원',
  충청북도: '충북',
  충청남도: '충남',
  전북특별자치도: '전북',
  전라남도: '전남',
  경상북도: '경북',
  경상남도: '경남',
  제주특별자치도: '제주',
};

interface KakaoDocument {
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string; // 경도 (longitude)
  y: string; // 위도 (latitude)
  address?: {
    region_1depth_name: string;
    region_2depth_name: string;
  };
  road_address?: {
    region_1depth_name: string;
    region_2depth_name: string;
  };
}

interface KakaoLocalResponse {
  documents: KakaoDocument[];
  meta: {
    total_count: number;
    is_end: boolean;
  };
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query');

  if (!query || query.trim().length === 0) {
    return NextResponse.json([]);
  }

  const apiKey = process.env.KAKAO_REST_API_KEY;
  if (!apiKey) {
    Sentry.captureException(new Error('Missing Kakao REST API key'), {
      tags: {
        area: 'location-search',
        action: 'config',
        route: '/api/location/search',
      },
    });
    return NextResponse.json({ error: '카카오 API 키가 설정되지 않았습니다.' }, { status: 500 });
  }

  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&size=10`;

  let response: Response;
  try {
    response = await fetch(url, {
      headers: { Authorization: `KakaoAK ${apiKey}` },
    });
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        area: 'location-search',
        action: 'fetch-kakao-api',
        route: '/api/location/search',
      },
      extra: {
        query,
      },
    });
    return NextResponse.json({ error: '카카오 API에 연결할 수 없습니다.' }, { status: 503 });
  }

  if (!response.ok) {
    if (response.status >= 500) {
      Sentry.captureException(new Error('Kakao local API returned a 5xx response'), {
        tags: {
          area: 'location-search',
          action: 'kakao-api-response',
          route: '/api/location/search',
        },
        extra: {
          query,
          status: response.status,
        },
      });
    }
    return NextResponse.json({ error: '장소 검색에 실패했습니다.' }, { status: response.status });
  }

  let data: KakaoLocalResponse;
  try {
    data = await response.json();
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        area: 'location-search',
        action: 'parse-kakao-api-response',
        route: '/api/location/search',
      },
      extra: {
        query,
      },
    });
    return NextResponse.json({ error: '장소 검색 결과' }, { status: 502 });
  }

  const results = data.documents.map((doc) => {
    const baseAddress = doc.road_address_name || doc.address_name;
    const addressParts = baseAddress.split(' ');
    const region1Full =
      doc.address?.region_1depth_name ??
      doc.road_address?.region_1depth_name ??
      addressParts[0] ??
      '';
    const region1 = REGION1_ABBR[region1Full] ?? region1Full;
    const region2 =
      doc.address?.region_2depth_name ??
      doc.road_address?.region_2depth_name ??
      addressParts[1] ??
      '';

    return {
      placeName: doc.place_name,
      addressName: doc.road_address_name || doc.address_name,
      x: doc.x,
      y: doc.y,
      region1,
      region2,
    };
  });

  return NextResponse.json(results);
}

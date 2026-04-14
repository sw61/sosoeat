export const metadata = {
  title: '개인정보처리방침 | 소소잇',
  description: '소소잇의 개인정보처리방침입니다.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="prose prose-sm mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">개인정보처리방침</h1>
        <p className="mb-8 text-gray-600">최종 수정일: 2026년 4월 14일</p>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">1. 개인정보의 수집 및 이용</h2>
          <p className="mb-4">
            소소잇(이하 "서비스")은 다음과 같은 개인정보를 수집하여 이용합니다.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>필수정보: 이메일, 비밀번호, 닉네임, 프로필 이미지</li>
            <li>서비스 이용정보: 게시물 작성 내용, 댓글, 찜하기 정보</li>
            <li>위치정보: 미팅 장소 확인을 위한 위도/경도</li>
            <li>자동수집정보: IP 주소, 쿠키, 접속 로그, 기기 정보, 이용 통계</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">2. 개인정보의 이용 목적</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>회원 가입 및 본인 확인</li>
            <li>서비스 제공 및 계약 이행</li>
            <li>사용자 지원 및 불만 처리</li>
            <li>서비스 개선 및 신규 서비스 개발</li>
            <li>마케팅 및 프로모션 (동의 시)</li>
            <li>법률 준수 및 분쟁 해결</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">3. 개인정보의 보유 및 이용 기간</h2>
          <p className="mb-4">
            원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
            단, 다음의 경우는 명시한 기간 동안 보유합니다:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>회원 탈퇴 후 1년 (부정 이용 방지)</li>
            <li>거래 기록: 5년 (전자상거래법)</li>
            <li>통신 기록: 3개월 (통신비밀보호법)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">4. 개인정보의 제3자 제공</h2>
          <p>
            소소잇은 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 다만 다음의 경우는
            예외입니다:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>법령의 규정에 의한 경우</li>
            <li>수사 기관의 요청이 있는 경우</li>
            <li>이용자의 명시적 동의가 있는 경우</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">5. 개인정보의 보안</h2>
          <p className="mb-4">
            소소잇은 개인정보보호법에 따라 안전한 개인정보 보호를 위해 다음과 같은 조치를 취합니다:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>비밀번호 암호화 저장 (bcrypt 해시)</li>
            <li>HTTPS 암호화 통신</li>
            <li>접근 권한 관리</li>
            <li>정기적인 보안 감시 및 업데이트</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">6. 이용자의 권리</h2>
          <p className="mb-4">
            이용자는 언제든지 개인정보에 대해 다음의 권리를 행사할 수 있습니다:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>개인정보 조회 및 수정</li>
            <li>개인정보 삭제 요청</li>
            <li>개인정보 처리 중지 요청</li>
            <li>개인정보 이동권</li>
          </ul>
          <p className="mt-4">권리 행사는 고객 지원을 통해 요청할 수 있습니다.</p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">7. 쿠키 및 추적 기술</h2>
          <p className="mb-4">
            소소잇은 서비스 개선을 위해 쿠키와 유사한 기술을 사용합니다. 이용자는 브라우저 설정을
            통해 쿠키 사용을 거부할 수 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">8. 개인정보 처리방침 변경</h2>
          <p>
            본 방침은 법령 변경이나 서비스 개선으로 인해 변경될 수 있으며, 변경 시 공지사항을 통해
            알려드립니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">9. 문의</h2>
          <p>개인정보 처리 관련 문의사항은 아래 연락처로 문의해주시기 바랍니다.</p>
          <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <p>
              <strong>이메일:</strong> support@sosoeat.com
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

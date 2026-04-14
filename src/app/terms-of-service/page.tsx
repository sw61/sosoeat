export const metadata = {
  title: '서비스 약관 | 소소잇',
  description: '소소잇의 서비스 약관입니다.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="prose prose-sm mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">서비스 약관</h1>
        <p className="mb-8 text-gray-600">최종 수정일: 2026년 4월 14일</p>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">1. 서비스 개요</h2>
          <p>
            소소잇(이하 "서비스")은 사용자(이하 "회원")가 음식을 나누고, 식사 약속(미팅)을 조직하며,
            음식 관련 이야기를 나눌 수 있는 커뮤니티 플랫폼입니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">2. 약관의 효력 및 변경</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>본 약관은 회원이 서비스 가입 시부터 효력이 발생합니다.</li>
            <li>서비스 제공자는 법령의 범위 내에서 약관을 변경할 수 있습니다.</li>
            <li>약관 변경 시 최소 7일 전에 공지하고, 회원이 거부할 권리를 제공합니다.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">3. 회원가입 및 계약</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>만 14세 이상의 개인만 회원으로 가입할 수 있습니다.</li>
            <li>회원은 정확한 정보를 제공해야 하며, 허위 정보로 인한 책임은 회원이 집니다.</li>
            <li>회원은 본인의 계정과 비밀번호를 안전하게 관리해야 합니다.</li>
            <li>회원은 계정 도용 시 즉시 서비스 제공자에게 알려야 합니다.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">4. 서비스 이용 규칙</h2>
          <p className="mb-4">회원은 다음 행위를 해서는 안 됩니다:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>법령을 위반하거나 범죄를 구성하는 행위</li>
            <li>타인의 명예를 손상시키거나 모욕적인 내용 게시</li>
            <li>스팸, 광고, 도배 등 서비스를 방해하는 행위</li>
            <li>타인의 개인정보, 지적재산권 침해 행위</li>
            <li>성인물, 폭력, 혐오, 차별 내용 게시</li>
            <li>시스템 해킹, 악성코드 배포 등 기술적 침해</li>
            <li>거짓 정보 및 사기성 거래</li>
            <li>다른 사용자 괴롭힘 및 협박</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">5. 게시물 관련 규정</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>회원이 게시한 게시물에 대한 저작권은 회원에게 있습니다.</li>
            <li>
              서비스 제공자는 게시물 운영을 위해 필요한 범위 내에서 게시물을 이용할 수 있습니다.
            </li>
            <li>서비스 제공자는 약관에 위반되는 게시물을 사전 통지 없이 삭제할 수 있습니다.</li>
            <li>회원은 자신의 게시물에 대한 책임을 갖습니다.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">6. 미팅(식사 약속) 관련</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              미팅 참여는 회원의 자발적 선택이며, 서비스 제공자는 미팅의 성공을 보장하지 않습니다.
            </li>
            <li>미팅 참여자 간의 분쟁은 당사자들이 직접 해결해야 합니다.</li>
            <li>
              미팅 중 발생한 사건(사고, 식중독 등)에 대해 서비스 제공자는 책임을 지지 않습니다.
            </li>
            <li>음주, 도박, 불법 거래 등을 목적으로 한 미팅은 금지됩니다.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">7. 서비스 제공 중지</h2>
          <p className="mb-4">
            서비스 제공자는 다음의 경우 회원에게 사전 통지 후 서비스 이용을 제한하거나 중지할 수
            있습니다:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>약관 위반 행위</li>
            <li>타인 폭행, 협박, 사기 등 범죄 행위</li>
            <li>장시간 부정 이용</li>
            <li>결제 사기</li>
            <li>기술적 공격</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">8. 계정 탈퇴</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>회원은 언제든지 서비스 탈퇴를 신청할 수 있습니다.</li>
            <li>탈퇴 후 개인정보는 별도 명시된 기간 동안 보유됩니다.</li>
            <li>탈퇴 후 게시물 삭제 등의 처리는 회원의 요청에 따릅니다.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">9. 책임 제한</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              서비스는 "있는 그대로" 제공되며, 시장성 및 특정 목적 적합성을 보장하지 않습니다.
            </li>
            <li>
              서비스 이용으로 인한 직·간접적 손실에 대해 서비스 제공자는 책임을 지지 않습니다. 단,
              법령상 의무가 있는 경우는 예외입니다.
            </li>
            <li>
              회원 간의 분쟁, 거래, 사건에 대해 서비스 제공자는 중재 또는 책임을 지지 않습니다.
            </li>
            <li>외부 링크 사이트의 콘텐츠에 대해 서비스 제공자는 책임을 지지 않습니다.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">10. 준거법 및 관할</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>본 약관은 대한민국 법령을 따릅니다.</li>
            <li>본 약관과 관련된 분쟁은 대한민국 법원의 관할을 받습니다.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">11. 문의</h2>
          <p>서비스 약관 관련 문의사항은 아래 연락처로 문의해주시기 바랍니다.</p>
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

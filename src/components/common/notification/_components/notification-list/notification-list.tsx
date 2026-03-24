'use client';

import Image from 'next/image';

import { NotificationTab } from './_components/notification-tab';

export const NotificationList = () => {
  return (
    <>
      <NotificationTab
        variant="muted"
        thumbnail={
          <Image
            src="/icons/icon-createGroup.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg object-cover"
          />
        }
        title="모임 초대"
        showReadBadge
        metaRight="1분 전"
        description="새로운 모임에 초대되었습니다. 지금 확인하고 참여해 보세요."
      />
      <NotificationTab
        variant="muted"
        thumbnail={
          <Image
            src="/icons/icon-createGroup.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg object-cover"
          />
        }
        title="모임 일정"
        metaRight="어제"
        description="다가오는 모임 일정을 확인해 주세요. 장소와 시간이 업데이트되었습니다."
      />
      <NotificationTab
        variant="default"
        thumbnail={
          <div
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#DDDDDD] bg-white"
            aria-hidden
          >
            <span className="text-[10px] text-slate-400">👤</span>
          </div>
        }
        title="댓글 알림"
        metaRight="3일 전"
        description="내 게시글에 새 댓글이 달렸습니다."
      />
      <NotificationTab
        variant="default"
        thumbnail={
          <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300" />
        }
        title="신청이 승인되었어요"
        metaRight="1주 전"
        description="요청하신 모임 참가 신청이 승인되었습니다. 모임 상세에서 정보를 확인하세요."
      />
    </>
  );
};

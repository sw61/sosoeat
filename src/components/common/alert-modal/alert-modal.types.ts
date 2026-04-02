/**
 * 범용 AlertModal 컴포넌트의 Props 타입 정의
 */
export interface AlertModalProps {
  /** 모달 표시 여부 */
  open: boolean;

  /** 단일 목적을 명확히 전달하는 모달 타이틀 (필수) */
  title: string;

  /** 모달 하단에 추가로 들어갈 안내 설명 문구 */
  description?: string;

  /** 취소 버튼 텍스트 @default '취소' */
  cancelText?: string;

  /** 확인 버튼 텍스트 @default '확인' */
  confirmText?: string;

  /** 취소 버튼 클릭 또는 외부/ESC 닫기 시 호출되는 콜백 */
  onCancel: () => void | Promise<void>;

  /** 확인(우측) 버튼 클릭 시 호출되는 콜백 */
  onConfirm: () => void | Promise<void>;

  /**
   * 외부 클릭 또는 ESC 키 입력으로 닫기 허용 여부.
   * false로 설정하면 화면의 버튼으로만 닫을 수 있습니다.
   * @default true
   */
  dismissible?: boolean;
}

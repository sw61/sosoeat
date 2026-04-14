/** 클립보드에 텍스트를 쓴다. navigator.clipboard 직접 호출을 한곳에 모아 테스트에서 mock 하기 쉽게 한다. */
export async function writeClipboardText(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}

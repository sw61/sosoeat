import { SosoTalkPostEditor } from './_components/sosotalk-post-editor';

export default function SosoTalkWritePage() {
  return (
    <main className="min-h-screen bg-[#F6F7FB] px-4 py-16">
      <div className="mx-auto w-full max-w-[860px]">
        <SosoTalkPostEditor />
      </div>
    </main>
  );
}

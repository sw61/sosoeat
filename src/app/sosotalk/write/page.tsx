import { SosoTalkPostEditor } from './_components/sosotalk-post-editor';

export default function SosoTalkWritePage() {
  return (
    <main className="min-h-screen bg-[#f9f9f9] px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="mx-auto w-full max-w-[860px]">
          <SosoTalkPostEditor />
        </div>
      </div>
    </main>
  );
}

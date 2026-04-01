export default function MeetingDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f9f9f9]">
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-10">{children}</div>
    </div>
  );
}

'use client';

export default function ContentArea({
  children,
  ref,
}: {
  children: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}) {
  return (
    <main
      ref={ref}
      className="flex-1 overflow-y-auto rounded-2xl backdrop-blur-xl bg-black/30 shadow-md p-8"
    >
      {children}
    </main>
  );
}

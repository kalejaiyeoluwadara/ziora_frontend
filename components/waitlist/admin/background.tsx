export function AdminBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1E5BFF 1px, transparent 1px), linear-gradient(to bottom, #1E5BFF 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] -z-10 h-[40%] w-[40%] rounded-full bg-brand-blue-light/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-[10%] bottom-[-10%] -z-10 h-[40%] w-[40%] rounded-full bg-[#FF007A]/5 blur-[120px]" />
    </>
  );
}

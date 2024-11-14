export const Tooltip = ({ text }: { text: string }) => {
  return (
    <div className="absolute left-1/2 top-full z-[70] mb-2 mt-1.5 w-max -translate-x-1/2 transform rounded-full bg-tidy-black px-4 py-1.5 text-sm text-tidy-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      {text}
    </div>
  );
};

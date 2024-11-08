export const Tooltip = ({ text }: { text: string }) => {
  return (
    <div className="absolute top-full mt-1.5 left-1/2 transform -translate-x-1/2 mb-2 w-max px-4 py-1.5 text-tidy-white text-sm bg-tidy-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {text}
    </div>
  );
};

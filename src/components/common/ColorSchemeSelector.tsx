import { COLOR_SCHEMES } from "@/utils/constants";

export const ColorSchemeSelector = ({
  handleUpdateColorScheme,
}: {
  handleUpdateColorScheme: (scheme: any) => void;
}) => {
  return (
    <div className="flex items-center justify-between gap-2 p-2 bg-tidy-white/30 rounded-full">
      {COLOR_SCHEMES.map((scheme) => (
        <div
          className={`${scheme.cardColor} rounded-full p-2 cursor-pointer hover:scale-125 transition-all duration-300`}
          key={scheme.cardColor}
          onClick={() => handleUpdateColorScheme(scheme)}
        />
      ))}
    </div>
  );
};

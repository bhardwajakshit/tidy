import { COLOR_SCHEMES } from "@/app/utils/constants";

export const ColorSchemeSelector = ({
  handleUpdateColorScheme,
}: {
  handleUpdateColorScheme: (scheme: any) => void;
}) => {
  return (
    <div className="flex items-center justify-between gap-2 p-2">
      {COLOR_SCHEMES.map((scheme) => (
        <div
          className={`${scheme.cardColor} rounded-full p-2 cursor-pointer`}
          key={scheme.cardColor}
          onClick={() => handleUpdateColorScheme(scheme)}
        />
      ))}
    </div>
  );
};

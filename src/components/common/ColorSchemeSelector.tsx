import { COLOR_SCHEMES } from '@/utils/constants';

export const ColorSchemeSelector = ({
  handleUpdateColorScheme,
}: {
  handleUpdateColorScheme: (scheme: any) => void;
}) => {
  return (
    <div className="flex items-center justify-between gap-2 rounded-full bg-tidy-white/30 p-2">
      {COLOR_SCHEMES.map((scheme) => (
        <div
          className={`${scheme.cardColor} cursor-pointer rounded-full p-2 transition-all duration-300 hover:scale-125`}
          key={scheme.cardColor}
          onClick={() => handleUpdateColorScheme(scheme)}
        />
      ))}
    </div>
  );
};

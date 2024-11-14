export const Keys = {
  Command: 'Command',
  K: 'K',
  Escape: 'Escape',
};

export const KeyCombo = ({ keyNames }: { keyNames: string[] }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {keyNames.map((keyName) => (
        <p key={keyName} className="text-primary/60 text-xs font-normal">
          {keyName === Keys.Command ? '⌘' : keyName === Keys.K ? 'K' : 'esc'}
        </p>
      ))}
    </div>
  );
};

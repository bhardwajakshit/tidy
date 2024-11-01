export const Keys = {
  Command: "Command",
  K: "K",
  Escape: "Escape",
};

export const KeyCombo = ({ keyNames }: { keyNames: string[] }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {keyNames.map((keyName) => (
        <p key={keyName} className="font-normal text-xs text-primary/60">
          {keyName === Keys.Command ? "⌘" : keyName === Keys.K ? "K" : "esc"}
        </p>
      ))}
    </div>
  );
};

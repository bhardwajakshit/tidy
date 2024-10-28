export const Keys = {
  Command: "Command",
  K: "K",
};

export const KeyCombo = ({ keyNames }: { keyNames: string[] }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {keyNames.map((keyName) => (
        <p key={keyName} className="font-normal text-xs text-primary/60">
          {keyName === Keys.Command ? "⌘" : "K"}
        </p>
      ))}
    </div>
  );
};

import { SwitchView } from "../task/SwitchView";
import { KeyCombo, Keys } from "./KeyCombo";

export const Footer = () => {
  return (
    <div className="flex items-center justify-center w-full mt-auto p-6">
      <div className="flex items-center justify-center gap-2">
        <p className="font-normal text-xs text-primary/60">Press</p>
        <KeyCombo keyNames={[Keys.Command]} />
        <p className="font-normal text-sm text-primary/60">+</p>
        <KeyCombo keyNames={[Keys.K]} />
        <p className="font-normal text-xs text-primary/60">
          to create a new task.
        </p>
      </div>
      {/* <SwitchView /> */}
    </div>
  );
};

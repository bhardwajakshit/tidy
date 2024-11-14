import { SwitchView } from '../task/SwitchView';
import { KeyCombo, Keys } from './KeyCombo';

export const Footer = () => {
  return (
    <div className="mt-auto flex w-full items-center justify-center p-6">
      <div className="flex items-center justify-center gap-2">
        <p className="text-primary/60 text-xs font-normal">Press</p>
        <KeyCombo keyNames={[Keys.Command]} />
        <p className="text-primary/60 text-sm font-normal">+</p>
        <KeyCombo keyNames={[Keys.K]} />
        <p className="text-primary/60 text-xs font-normal">
          to create a new task.
        </p>
      </div>
      {/* <SwitchView /> */}
    </div>
  );
};

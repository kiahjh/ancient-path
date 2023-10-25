import React from "react";
import cx from "classnames";

interface Props {
  checked: boolean;
  onClick: () => void;
}

const ToggleSwitch: React.FC<Props> = ({ checked, onClick }) => (
  <div
    className="h-6 w-10 bg-sky-300 rounded-full relative hover:bg-sky-400 cursor-pointer transition-colors duration-200"
    onClick={onClick}
  >
    <div
      className={cx(
        `bg-white rounded-full h-4 w-4 top-1 absolute transition-[left] duration-200`,
        checked ? `left-5` : `left-1`,
      )}
    />
  </div>
);

export default ToggleSwitch;

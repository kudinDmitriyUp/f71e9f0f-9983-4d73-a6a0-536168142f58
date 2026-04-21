import { resolveIcon } from "./resolve-icon";
import type { IconInput } from "./resolve-icon";

const DynamicIcon = ({
  icon,
  size,
  className,
  strokeWidth,
}: {
  icon: IconInput;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) => {
  const Icon = resolveIcon(icon);
  return <Icon size={size} className={className} strokeWidth={strokeWidth} />;
};

export default DynamicIcon;
export type { IconInput };

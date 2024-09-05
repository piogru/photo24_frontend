import { ComponentType } from "react";

type NavIconProps = {
  isActive: boolean;
  Icon: ComponentType<{
    className?: string;
  }>;
  ActiveIcon: ComponentType<{
    className?: string;
  }>;
};

const iconStyle =
  "size-7 text-gray-900 dark:text-gray-200 transition duration-75 group-active:scale-90 group-active:text-gray-700 dark:group-active:text-gray-400 group-hover:scale-105";

export default function NavIcon({
  isActive = false,
  Icon,
  ActiveIcon,
}: NavIconProps) {
  return (
    <>
      {isActive ?
        <ActiveIcon className={iconStyle} />
      : <Icon className={iconStyle} />}
    </>
  );
}

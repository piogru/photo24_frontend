import { ComponentType } from "react";

type NavIconProps = {
  isActive: boolean;
  Icon: ComponentType<{
    title?: string;
    className?: string;
  }>;
  ActiveIcon: ComponentType<{
    title?: string;
    className?: string;
  }>;
  title?: string;
};

const iconStyle = `size-8 text-gray-900 transition duration-75 group-hover:scale-105
  group-active:scale-90 group-active:text-gray-700 dark:text-gray-200
  dark:group-active:text-gray-400`;

export default function NavIcon({
  isActive = false,
  Icon,
  ActiveIcon,
  title,
}: NavIconProps) {
  return (
    <>
      {isActive ?
        <ActiveIcon title={title} className={iconStyle} />
      : <Icon title={title} className={iconStyle} />}
    </>
  );
}

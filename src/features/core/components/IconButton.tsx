import { Button, ButtonProps } from "@headlessui/react";
import { ReactNode } from "react";
import HeroIcon from "../types/heroIcon";

type IconButtonProps = ButtonProps & {
  Icon: HeroIcon;
  SolidIcon?: HeroIcon;
  solid?: boolean;
  children?: ReactNode;
};

const iconStyle = "size-7";

export default function IconButton({
  Icon,
  SolidIcon,
  solid = false,
  children,
  ...rest
}: IconButtonProps) {
  const getIcon = (
    icon: HeroIcon,
    solidIcon: HeroIcon | undefined,
    solid: boolean,
  ) => {
    if (solid && SolidIcon) {
      return <SolidIcon className={iconStyle} />;
    }

    return <Icon className={iconStyle} />;
  };
  return (
    <Button
      className="text-gray-900 hover:text-gray-700 active:text-gray-700 disabled:text-gray-400 dark:text-gray-200 dark:hover:text-gray-400 dark:active:text-gray-500 disabled:dark:text-gray-600"
      {...rest}
    >
      {getIcon(Icon, SolidIcon, solid)}
      {children}
    </Button>
  );
}

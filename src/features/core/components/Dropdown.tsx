import { Fragment } from "react/jsx-runtime";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuItemsProps,
  Transition,
} from "@headlessui/react";
import { ReactElement } from "react";

type DropdownProps = {
  buttonChildren: ({
    active,
  }: {
    active: boolean;
  }) => ReactElement | ReactElement;
  menuItemsProps?: MenuItemsProps;
  items: {
    key: string | number;
    element: ReactElement | (() => ReactElement);
  }[];
};

export default function Dropdown({
  buttonChildren,
  menuItemsProps,
  items,
}: DropdownProps) {
  return (
    <Menu as="div" className="relative">
      <MenuButton
        aria-label="Menu"
        className="group inline-flex w-full items-center space-x-4 rounded px-2 py-3 hover:bg-black/5 dark:hover:bg-white/10"
      >
        {buttonChildren}
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className={
            "absolute z-10 flex w-64 flex-col space-y-2 rounded-xl bg-white p-2 shadow-xl [--anchor-gap:4px] dark:bg-gray-800"
          }
          {...menuItemsProps}
        >
          {items.map((item) => (
            <MenuItem key={item.key}>{item.element}</MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
}

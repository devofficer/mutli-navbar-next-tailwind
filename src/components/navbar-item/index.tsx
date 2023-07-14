import { Menu, Transition } from "@headlessui/react";
import styles from "./navbar-item.module.css";
import { Fragment } from "react";
import { classNames } from "@/utils";

type MenuItemProps = {
  label: string;
  href: string;
}

export type NavbarItemProps = MenuItemProps & {
  children?: MenuItemProps[]
}

export default function NavbarItem({label, href, children}: NavbarItemProps) {
  return (
    <>
      {
        !children ? 
        <a
          href={href}
          className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          {label}
        </a>
        :
        <Menu as="div" className="relative ml-3 h-full">
          <div className="h-full inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
            <Menu.Button>
              {label}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {children.map((item: MenuItemProps, idx: number) => 
                <Menu.Item key={idx}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      {item.label}
                    </a>
                  )}
                </Menu.Item>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      }
    </>
  );
}
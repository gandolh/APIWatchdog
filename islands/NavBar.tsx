import { Disclosure } from "headlessui";
import { HiBars3, HiOutlineXMark } from "react-icons/hi2";
import { AppState, UserData } from "./AppStateProvider.tsx";
import NotificationButton from "../components/NotificationButton.tsx";
import ProfileDropdown from "../components/ProfileDropdown.tsx";
import Button from "../components/Button.tsx";

const navigation = [
  { name: "Api Dashboard", href: "pubboard", current: true, needsAuth: false },
  { name: "Dev Dashboard", href: "devboard", current: false, needsAuth: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function NavbarComp({ isAllowed }: UserData) {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }: { open: boolean }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <HiOutlineXMark
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <HiBars3 className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <>
                        {(item.needsAuth === false ||
                          (item.needsAuth === true && isAllowed)) && (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isAllowed ? (
                  <>
                    <NotificationButton />
                    <ProfileDropdown />
                  </>
                ) : (
                  <>
                    <a href="/login">
                      <Button>Login</Button>
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default function NavBar() {
  return (
    <>
      <AppState.Consumer>
        {(appState) => {
          return (
            <>
              <NavbarComp isAllowed={appState.isAllowed} />
            </>
          );
        }}
      </AppState.Consumer>
    </>
  );
}

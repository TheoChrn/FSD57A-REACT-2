import { Link, useLocation } from "react-router";

export function Header() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  aria-current={pathname.endsWith("/") ? "page" : undefined}
                  className={
                    "  aria- aria-page:bg-gray-900 aria-page:text-white text-gray-300 hover:bg-gray-700 hover:text-whiterounded-md px-3 py-2 text-sm font-medium"
                  }
                >
                  Home
                </Link>
                <Link
                  to="/weather"
                  aria-current={
                    pathname.endsWith("/weather") ? "page" : undefined
                  }
                  className={
                    " aria-page:bg-gray-900 aria-page:text-white text-gray-300 hover:bg-gray-700 hover:text-whiterounded-md px-3 py-2 text-sm font-medium"
                  }
                >
                  Weather
                </Link>
                <Link
                  to="/musics"
                  aria-current={
                    pathname.endsWith("/musics") ? "page" : undefined
                  }
                  className={
                    " aria-page:bg-gray-900 aria-page:text-white text-gray-300 hover:bg-gray-700 hover:text-whiterounded-md px-3 py-2 text-sm font-medium"
                  }
                >
                  Musics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            to="/"
            aria-current={pathname.endsWith("/") ? "page" : undefined}
            className={
              "  aria- aria-page:bg-gray-900 aria-page:text-white text-gray-300 hover:bg-gray-700 hover:text-whiterounded-md px-3 py-2 text-sm font-medium"
            }
          >
            Home
          </Link>
          <Link
            to="/weather"
            aria-current={pathname.endsWith("/weather") ? "page" : undefined}
            className={
              "  aria- aria-page:bg-gray-900 aria-page:text-white text-gray-300 hover:bg-gray-700 hover:text-whiterounded-md px-3 py-2 text-sm font-medium"
            }
          >
            Weather
          </Link>
          <Link
            to="/musics"
            aria-current={pathname.endsWith("/musics") ? "page" : undefined}
            className={
              " aria-page:bg-gray-900 aria-page:text-white text-gray-300 hover:bg-gray-700 hover:text-whiterounded-md px-3 py-2 text-sm font-medium"
            }
          >
            Musics
          </Link>
        </div>
      </div>
    </nav>
  );
}

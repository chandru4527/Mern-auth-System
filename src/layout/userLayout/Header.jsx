import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

// icons
import { MdClose, MdMenu } from "react-icons/md";

// Components
import Button from "../../components/Button";
import Image from "../../components/media/Image";
import Avatar from "../../components/Avatar";

// Hooks
import { useCurrentUser } from "../../hooks/useAuth";

const Header = () => {
  const { data: user, isLoading } = useCurrentUser();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { title: "Home", to: "/" },
    { title: "About", to: "/about" },
    { title: "Features", to: "/features" },
    { title: "Profile", to: "/profile" },
  ];

  const closeSidebar = () => setIsSidebarOpen(false);

  // Prevent background scrolling while sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  // Close sidebar with Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-white/30 bg-white/70 px-4 shadow-sm backdrop-blur-md transition-colors duration-300 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" onClick={closeSidebar} className="flex shrink-0 items-center">
          <Image src="https://res.cloudinary.com/dyiuqcqg2/image/upload/v1790512102/mainlogo_qndlrt.png" className="h-10 w-auto object-contain" alt="Authify logo" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {menuItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? "text-green-700" : "text-gray-700 hover:text-green-700"}`}>
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        {!isLoading && (
          user ? (
            <Avatar size="sm" alt={user.name} name={user.name} src={user.profileImage} ring to="/profile" className="hidden lg:flex" />
          ) : (
            <div className="hidden items-center gap-3 lg:flex">
              <Link to="/login">
                <Button variant="themeOutline">Login</Button>
              </Link>

              <Link to="/register">
                <Button variant="success">Get Started</Button>
              </Link>
            </div>
          )
        )}

        {/* Mobile Menu Button */}
        <Button type="button" variant="normal" icon={MdMenu} iconSize={26} onClick={() => setIsSidebarOpen(true)} className="p-1 lg:hidden" aria-label="Open menu" aria-expanded={isSidebarOpen} />
      </header>

      {/* Overlay */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${isSidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={closeSidebar}
      />

      {/* Mobile Sidebar */}
      <aside
        aria-label="Mobile navigation"
        aria-hidden={!isSidebarOpen}
        className={`fixed right-0 top-0 z-50 flex h-dvh w-72 max-w-[85vw] flex-col overflow-hidden bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-5">
          <Link to="/" onClick={closeSidebar} className="flex items-center">
            <Image src="https://res.cloudinary.com/dyiuqcqg2/image/upload/v1790512102/mainlogo_qndlrt.png" className="h-10 w-auto object-contain" alt="Authify logo" />
          </Link>

          <Button type="button" variant="normal" icon={MdClose} iconSize={24} onClick={closeSidebar} className="p-1 font-bold transition-transform hover:rotate-90" aria-label="Close menu" />
        </div>

        {/* Mobile Navigation */}
        <nav className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-5">
          {menuItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} onClick={closeSidebar} className={({ isActive }) => `shrink-0 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive ? "bg-green-700 text-white" : "text-gray-700 hover:bg-green-50 hover:text-green-700"}`}>
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Bottom Actions */}
        {!isLoading && (
          user ? (
            <div className="shrink-0 border-t border-gray-100 bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <Link to="/profile" onClick={closeSidebar} className="flex items-center gap-3 rounded-xl bg-green-50 p-3 transition-colors hover:bg-green-100">
                <Avatar alt={user.name} name={user.name} src={user.profileImage} size="sm" />

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-green-700">
                    View Profile
                  </p>
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex shrink-0 flex-col gap-3 border-t border-gray-100 bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <Link to="/login" onClick={closeSidebar} className="block">
                <Button variant="themeOutline" fullWidth>
                  Login
                </Button>
              </Link>

              <Link to="/register" onClick={closeSidebar} className="block">
                <Button variant="success" fullWidth>
                  Get Started
                </Button>
              </Link>
            </div>
          )
        )}
      </aside>
    </>
  );
};

export default Header;
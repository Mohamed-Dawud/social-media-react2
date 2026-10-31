import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem,
  Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu,
  DropdownItem, DropdownSection,
} from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AppNavbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <Navbar
      maxWidth="xl"
      height="4rem"
      className="bg-white/80 backdrop-blur-xl border-b border-brand-100 shadow-sm"
    >
      <NavbarBrand>
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-extrabold shadow-md shadow-brand-200 transition-transform group-hover:rotate-6 group-hover:scale-105">
            C
          </span>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
            CIRCLE
          </span>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        {token ? (
          <Dropdown placement="bottom-end" offset={12}>
            <DropdownTrigger>
              <button className="flex items-center gap-2.5 rounded-full pl-1 pr-1 sm:pr-4 py-1 hover:bg-brand-50 transition outline-none">
                <Avatar isBordered color="primary" size="sm" src={user?.photo} name={user?.name} />
                <span className="hidden sm:block text-sm font-semibold max-w-[8rem] truncate">
                  {user?.name?.split(" ")[0]}
                </span>
                <span className="hidden sm:block text-brand-500 text-xs">▾</span>
              </button>
            </DropdownTrigger>

            <DropdownMenu aria-label="User menu" className="p-2 min-w-[14rem]">
              <DropdownSection showDivider>
                <DropdownItem
                  key="info"
                  isReadOnly
                  textValue="user"
                  className="opacity-100 cursor-default data-[hover=true]:bg-transparent"
                >
                  <div className="flex items-center gap-3">
                    <Avatar size="md" src={user?.photo} name={user?.name} />
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{user?.name}</p>
                      {user?.username && (
                        <p className="text-xs text-default-500 truncate">@{user.username}</p>
                      )}
                    </div>
                  </div>
                </DropdownItem>
              </DropdownSection>

              <DropdownSection showDivider>
                <DropdownItem key="profile" startContent={<span>👤</span>} onPress={() => navigate("/profile")}>
                  Profile
                </DropdownItem>
                <DropdownItem key="password" startContent={<span>🔒</span>} onPress={() => navigate("/change-password")}>
                  Change password
                </DropdownItem>
              </DropdownSection>

              <DropdownSection>
                <DropdownItem
                  key="logout"
                  color="danger"
                  className="text-danger"
                  startContent={<span>🚪</span>}
                  onPress={handleLogout}
                >
                  Logout
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem>
              <Button as={Link} to="/signin" variant="light" radius="full" className="font-medium text-brand-700">
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                to="/signup"
                radius="full"
                className="font-semibold text-white bg-gradient-to-r from-brand-500 to-accent-500 shadow-md shadow-brand-200"
              >
                Sign up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
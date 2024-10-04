import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Input from "../Input";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../../services/api.service";
import { useNavigate, useLocation } from "react-router";
import PrimButton from "../Button";

const ComponentNavbar = ({ onSearch }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const sessionId = localStorage.getItem("sessionId");
        if (sessionId) {
          const userId = await getUserDetails(sessionId);
          setUser(userId);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("sessionId");
    setUser(null);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const handleSearch = (searchValue) => {
    onSearch(searchValue);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("search", searchValue);
    navigate(`${location.pathname}?${searchParams.toString()}`); // Update URL dengan search params
  };

  return (
    <Navbar fluid className="bg-[#002337]">
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          FIND
        </span>
      </Navbar.Brand>
      <div className="flex order-1">
        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img={user.Avatar} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.name}</span>
              <span className="block truncate text-sm font-medium">
                {user.username}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <PrimButton href="/login" className="btn">
            Login
          </PrimButton>
        )}
      </div>
      <div className="flex w-1/2">
        <Input
          id="search"
          type="text"
          placeholder="Search here..."
          className="w-full"
          onChange={(e) => handleSearch(e.target.value)} // Gunakan handleSearch
        />
      </div>
      <div>
        <Navbar.Collapse>
          <Navbar.Link
            href="/"
            className={isActive("/") ? "text-yellow-300" : "text-white"}
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            href="/now-playing"
            className={
              isActive("/now-playing") ? "text-yellow-300" : "text-white"
            }
          >
            Now Playing
          </Navbar.Link>
          <Navbar.Link
            href="/top-rated"
            className={
              isActive("/top-rated") ? "text-yellow-300" : "text-white"
            }
          >
            Top Rated
          </Navbar.Link>
          <Navbar.Link
            href="/upcoming"
            className={isActive("/upcoming") ? "text-yellow-300" : "text-white"}
          >
            Upcoming
          </Navbar.Link>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default ComponentNavbar;

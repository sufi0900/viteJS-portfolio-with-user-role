import { Fragment } from "react";

import { useEffect } from "react";
import Pic from "./avatar3.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import sufi from "./sufi.webp";
// import logo from "./logo.webp";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { HashLink } from "react-router-hash-link";
import Spin from "./Spin";
import { setLogout } from "./redux/features/authSlice";
import * as api from "./redux/api";

import {
  getPortfolios,
  getPortfoliosByUser,
} from "./redux/features/portfolioSlice";
import {
  AdminPanelSettings,
  AdminPanelSettingsOutlined,
  AppRegistration,
  Login,
  Logout,
} from "@mui/icons-material";

const navigation = [
  { name: "Home", to: "#home", current: false },
  { name: "About", to: "#about", current: false },
  { name: "Projects", to: "#projects", current: false },
  { name: "Blogs", to: "#blogs", current: false },
  { name: "Contact", to: "#contact", current: false },
  { name: "SuperAdmin", to: "/superadmin", current: false }, // New SuperAdmin link

  // { name: "Contact", to: "contact", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => ({
    user: state.auth.user,
    isLoading: state.auth.isLoading,
  }));
  const userId = user?.result?._id;
  const { currentPage } = useSelector((state) => ({
    ...state.project,
  }));

  const { userPortfolios } = useSelector((state) => ({
    ...state.portfolio,
  }));
  useEffect(() => {
    if (userId) {
      dispatch(getPortfoliosByUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getPortfolios(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage]);
  useEffect(() => {
    preloadNextPageData(currentPage);
  }, [currentPage]);

  // Access the first item directly
  useEffect(() => {
    if (userId) {
      dispatch(getPortfoliosByUser(userId)); // Pass the currentPage here
    }
  }, [dispatch, userId]);
  useEffect(() => {
    dispatch(getPortfolios(currentPage));
    preloadNextPageData(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage]);
  const preloadNextPageData = async (currentPage) => {
    const nextPage = currentPage + 1;
    try {
      await api.getPortfolios(nextPage);
      // You can choose to store or use the preloaded data if needed
    } catch (error) {
      // Handle error
    }
  };
  const handleAdminClick = () => {
    if (user?.result?._id) {
      // If the user is logged in, navigate to the adminDashboard
      navigate("/adminDashboard");
    } else {
      // If the user is not logged in, redirect to the login page
      navigate("/login");
    }
  };

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.clear(); // Clear the token from local storage
    navigate("login");
  };

  if (isLoading) {
    // User data is being fetched, show loading indicator or placeholder content
    return <Spin />;
  }

  const firstPortfolio = userPortfolios[0];
  return (
    <div
      className="rounded-custom sticky top-0  z-50"
      data-aos="fade-down"
      data-aos-delay="300"
      data-aos-duration="600"
    >
      <Disclosure
        suppressHydrationWarning
        as="nav"
        className="rounded-custom mx-2 p-1 navbar2"
      >
        {({ open }) => (
          <>
            <div className=" mx-auto max-w-7xl px-2 sm:px-5 lg:px-8">
              <div className="relative  flex h-16 items-center justify-between">
                <div className="absolute  inset-y-0 left-0 flex items-center md:hidden">
                  <Disclosure.Button
                    className="relative hamburgerbtn inline-flex items-center justify-around rounded-md p-2 text-black  hover:bg-color hover:text-white focus:outline-none   "
                    style={{ background: "#ff014f" }}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex  items-center  sm:items-stretch sm:justify-end">
                  <div className="flex-shrink-2   items-center">
                    <img
                      className="h-12 w-auto rounded-full"
                      src={
                        firstPortfolio?.imageFile3 ||
                        "https://www.yelo.mu/img/mu/m/1592035340-23-the-hub-business-solutions.png"
                      }
                      height={100}
                      width={100}
                      alt="Your logo"
                      onClick={() => {
                        window.location.href = "/";
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                <div className="flex flex-1 items-center md:items-stretch md:justify-center">
                  <div className="hidden md:ml-6 lg:block md:block ">
                    <div className="space-x-4   ">
                      {navigation.map((item) => (
                        <HashLink
                          key={item.name}
                          HashLink
                          smooth
                          to={item.to}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <button className="btnNav">{item.name}</button>
                        </HashLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full  bg-gray-800  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>

                        <img
                          src={firstPortfolio?.imageFile2 || Pic}
                          height={100}
                          width={100}
                          className="h-12 w-auto  rounded-full"
                          alt="sufi"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <HashLink
                              to="/adminDashboard"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm  text-blue-600 "
                              )}
                              onClick={handleAdminClick}
                            >
                              <AdminPanelSettings /> Admin <br /> Dashboard
                            </HashLink>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <HashLink
                              to="/superadmin"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm  text-blue-600 "
                              )}
                              onClick={handleAdminClick}
                            >
                              <AdminPanelSettingsOutlined /> SuperAdmin
                            </HashLink>
                          )}
                        </Menu.Item>

                        {!user?.result?._id && (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <HashLink
                                  to="/login"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm  text-sky-500"
                                  )}
                                  onClick={handleAdminClick}
                                >
                                  <Login /> Login
                                </HashLink>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <HashLink
                                  to="/signup"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-lime-600"
                                  )}
                                  onClick={handleAdminClick}
                                >
                                  <AppRegistration /> Sign Up
                                </HashLink>
                              )}
                            </Menu.Item>
                          </>
                        )}

                        {/* <Menu.Item>
                          {({ active }) => (
                            <HashLink
                              to="#contact"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Contact
                            </HashLink>
                          )}
                        </Menu.Item> */}
                        {/* <Menu.Item>
                          {({ active }) => (
                            <HashLink
                              to="#skills"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Skills
                            </HashLink>
                          )}
                        </Menu.Item> */}
                        {/* <Menu.Item>
                          {({ active }) => (
                            <HashLink
                              to="#services"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Services
                            </HashLink>
                          )}
                        </Menu.Item> */}
                        {/* <Menu.Item>
                          {({ active }) => (
                            <HashLink
                              to="/login"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Login
                            </HashLink>
                          )}
                        </Menu.Item> */}

                        {user?.result?._id && (
                          <Menu.Item>
                            {({ active }) => (
                              <HashLink
                                to="/"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm   text-red-600"
                                )}
                                onClick={handleLogout}
                              >
                                <Logout /> LogOut
                              </HashLink>
                            )}
                          </Menu.Item>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden hamburger_bg ">
              <div className="space-y-1  pb-3 pt-2">
                {navigation.map((item) => (
                  <HashLink key={item.name} to={item.to}>
                    <Disclosure.Button
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-white hover:bg-blue-700 hover:text-white",
                        "block  rounded-md px-3 py-2 text-base font-medium hamburger_links"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  </HashLink>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
export default Navbar;

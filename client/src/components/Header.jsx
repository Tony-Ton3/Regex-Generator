import { Navbar, TextInput, Button } from "flowbite-react";
import { Link } from "react-router-dom"; //page navigation without rerender
//import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from "react-icons/fa";

export default function Header() {
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm 
        sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-emerald-500 to to-black rounded-lg text-white">
          Regex
        </span>
        Generator
      </Link>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Navbar.Toggle />
      </div>
      {/* <Navbar.Collapse>
              <Navbar.Link active={path === "/"} as={'div'}>
                <Link to='/'>
                  Home
                </Link>
              </Navbar.Link>
            </Navbar.Collapse> */}
    </Navbar>
  );
}

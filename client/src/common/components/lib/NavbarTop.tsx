import React, { useContext, useState } from 'react';
import Link from 'next/link';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
} from 'reactstrap';
import { SessionContext } from '../../../pages/_app';

export const NavbarTop = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, updateSession } = useContext(SessionContext);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    updateSession();
  };

  return (
    <div>
      <Navbar color="light" light expand="md" className="px-0">
        <NavbarBrand href="/">EasyHomes</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link href="/properties/" passHref>
                <NavLink>Browse</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/properties/add" passHref>
                <NavLink>New</NavLink>
              </Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav className="mr-0" navbar>
            <NavItem>
              {user ? (
                <Link href="">
                  <NavLink onClick={handleLogout}>Logout</NavLink>
                </Link>
              ) : (
                <Link href="/login" passHref>
                  <NavLink>Login</NavLink>
                </Link>
              )}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

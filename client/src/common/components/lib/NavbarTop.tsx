import React, { useContext, useState } from 'react';
import Link from 'next/link';
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from 'reactstrap';
import { SessionContext } from '../../../pages/_app';
import { useRouter } from 'next/dist/client/router';

export const NavbarTop = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, updateSession } = useContext(SessionContext);

  const toggle = () => setIsOpen(!isOpen);

  const router = useRouter();

  const handleLogout = (event: any) => {
    if (confirm('Are you sure you want to logout?')) {
      event.preventDefault();
      localStorage.removeItem('jwt');
      updateSession();
      router.push('/');
    }
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md" className="px-0">
        <NavbarBrand
          onClick={() => router.push('/')}
          style={{ cursor: 'pointer' }}>
          EasyHomes
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link href="/properties/" passHref>
                <NavLink>Browse all</NavLink>
              </Link>
            </NavItem>
            {user && (
              <>
                <NavItem>
                  <Link href="/properties/my-properties" passHref>
                    <NavLink>My Properties</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/properties/add" passHref>
                    <NavLink>New</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/reports" passHref>
                    <NavLink>Reports</NavLink>
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>
          <Nav className="mr-0" navbar>
            {user ? (
              <NavItem>
                <Link href="/">
                  <NavLink onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    Logout
                  </NavLink>
                </Link>
              </NavItem>
            ) : (
              <>
                <NavItem>
                  <Link href="/signup" passHref>
                    <NavLink>Signup</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/login" passHref>
                    <NavLink>Login</NavLink>
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

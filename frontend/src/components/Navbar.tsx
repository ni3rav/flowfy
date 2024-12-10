import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

export function NavigationBar() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={"a"} href="#">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowfy
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink href="https://github.com/ni3rav/flowfy">Github</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

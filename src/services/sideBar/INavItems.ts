export default interface INavItem {
  display: string;
  icon: JSX.Element | undefined;
  to: string;
  section: string;
  rolesAllowed: string[];
  isVisible: boolean;
}

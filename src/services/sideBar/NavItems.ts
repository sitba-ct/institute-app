import INavItems from "./INavItems";

export default class NavItems implements INavItems {
  constructor(
    display: string = "",
    icon: JSX.Element | undefined = undefined,
    to: string = "",
    section: string = "",
    rolesAllowed: string[] = [],
    isVisible: boolean = true
  ) {
    this.display = display;
    this.icon = icon;
    this.to = to;
    this.section = section;
    this.rolesAllowed = rolesAllowed;
    this.isVisible = isVisible;
  }

  display: string;
  icon: JSX.Element | undefined;
  to: string;
  section: string;
  rolesAllowed: string[];
  isVisible: boolean;
}

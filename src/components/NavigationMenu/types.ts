import type React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavSection {
  value: string;
  title: string;
  icon: React.ReactNode;
  items: NavItem[];
}

export interface NavigationMenuProps {
  sections: NavSection[];
  activeHref?: string;
  defaultOpenSections?: string[];
  onNavigate?: (href: string) => void;
  renderLink?: (props: {
    href: string;
    children: React.ReactNode;
    isActive: boolean;
    className: string;
  }) => React.ReactNode;
  ariaLabel?: string;
}

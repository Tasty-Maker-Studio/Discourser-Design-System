'use client';

import { Fragment } from 'react';
import * as Accordion from '../Accordion';
import { HStack } from 'styled-system/jsx';
import { navigationMenu } from 'styled-system/recipes';
import type { NavigationMenuProps } from './types';

export function NavigationMenu({
  sections,
  activeHref,
  defaultOpenSections,
  onNavigate,
  renderLink,
  ariaLabel = 'Navigation',
}: NavigationMenuProps) {
  const styles = navigationMenu();

  const defaultRenderLink: NavigationMenuProps['renderLink'] = ({
    href,
    children,
    isActive,
    className,
  }) => (
    <a
      href={href}
      aria-current={isActive ? 'page' : undefined}
      data-active={isActive || undefined}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onNavigate?.(href);
      }}
    >
      {children}
    </a>
  );

  const resolvedRenderLink = renderLink ?? defaultRenderLink;

  return (
    <nav className={styles.root} aria-label={ariaLabel}>
      <Accordion.Root
        defaultValue={defaultOpenSections}
        multiple
        variant="plain"
      >
        {sections.map((section) => (
          <Accordion.Item
            key={section.value}
            value={section.value}
            className={styles.section}
          >
            <Accordion.ItemTrigger
              className={styles.sectionTrigger}
              css={{
                // These override accordion recipe via utilities layer (same pattern as ScenarioCard)
                fontSize: 'lg', // 18px — Figma spec (accordion forces 'md'/16px)
                fontWeight: 'medium', // 500  — Figma spec (accordion forces semibold/600)
                borderRadius: 'l3', // 8px  — Figma spec (accordion forces l2/6px)
                p: '2', // 8px  — Figma: 5px, spacing.2 is closest
                bg: 'surface.container', // Figma: #eeefe3 section header bg
                color: 'onSurface', // Figma: #363636 (accordion forces fg.default)
              }}
            >
              <HStack gap="2">
                <span className={styles.sectionIcon}>{section.icon}</span>
                <span className={styles.sectionTitle}>{section.title}</span>
              </HStack>
              <Accordion.ItemIndicator
                className={styles.sectionIndicator}
                css={{
                  color: 'primary.50', // olive green chevrons — Figma: #518500
                }}
              />
            </Accordion.ItemTrigger>

            <Accordion.ItemContent className={styles.sectionContent}>
              <div className={styles.itemList}>
                {section.items.map((item) => {
                  const isActive = activeHref === item.href;
                  return (
                    <Fragment key={item.href}>
                      <div className={styles.item}>
                        {resolvedRenderLink({
                          href: item.href,
                          children: item.label,
                          isActive,
                          className: styles.itemLink,
                        })}
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </nav>
  );
}

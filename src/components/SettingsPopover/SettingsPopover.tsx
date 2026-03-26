'use client';

import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import * as Popover from '../Popover';
import * as Avatar from '../Avatar';
import { ChevronUpDownIcon } from '../Icons/ChevronUpDownIcon';
import { LoginIcon } from '../Icons/LoginIcon';
import type { SettingsPopoverProps } from './types';

export function SettingsPopover({
  userName,
  userTier,
  userEmail,
  avatarFallback,
  avatarSrc,
  actions,
  placement = 'top',
  ariaLabel = 'User settings',
}: SettingsPopoverProps) {
  return (
    <Popover.Root positioning={{ placement }}>
      <Popover.Trigger asChild>
        <button
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            w: 'full',
            p: '2',
            bg: 'surface.container',
            border: 'none',
            borderRadius: 'l3',
            cursor: 'pointer',
            transition: 'background 0.2s',
            _hover: {
              bg: 'surface.containerHighest',
            },
          })}
          aria-label={ariaLabel}
        >
          <HStack gap="3">
            <Avatar.Root size="sm">
              {avatarSrc ? (
                <Avatar.Image src={avatarSrc} alt={userName} />
              ) : null}
              <Avatar.Fallback>
                {avatarFallback ?? <LoginIcon width="100%" height="100%" />}
              </Avatar.Fallback>
            </Avatar.Root>
            <VStack gap="0" alignItems="flex-start">
              <span
                className={css({
                  fontSize: 'sm',
                  fontWeight: 'medium',
                  color: 'onSurface',
                  lineHeight: 'tight',
                })}
              >
                {userName}
              </span>
              <span
                className={css({
                  fontSize: 'xs',
                  color: 'fg.muted',
                  lineHeight: 'tight',
                })}
              >
                {userTier}
              </span>
            </VStack>
          </HStack>
          <ChevronUpDownIcon w="5" h="5" color="primary.50" flexShrink={0} />
        </button>
      </Popover.Trigger>

      <Popover.Positioner>
        <Popover.Content
          aria-label={ariaLabel}
          className={css({
            p: '0',
            minW: '240px',
            borderRadius: 'l3',
            boxShadow: 'level2',
            overflow: 'hidden',
          })}
        >
          {/* Email display */}
          <div
            className={css({
              px: '4',
              pt: '3',
              pb: '2',
              fontSize: 'sm',
              color: 'onSurface',
              borderBottom: '1px solid',
              borderColor: 'border',
            })}
          >
            {userEmail}
          </div>

          {/* Action items */}
          <div
            className={css({
              py: '1',
            })}
          >
            {actions.map((action) => (
              <button
                key={action.key}
                onClick={action.onClick}
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3',
                  w: 'full',
                  px: '4',
                  py: '2.5',
                  bg: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'sm',
                  color: 'onSurface',
                  transition: 'background 0.15s',
                  _hover: {
                    bg: 'surface.container',
                  },
                })}
              >
                {action.icon && (
                  <span
                    className={css({
                      display: 'flex',
                      alignItems: 'center',
                      color: 'fg.muted',
                    })}
                  >
                    {action.icon}
                  </span>
                )}
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}

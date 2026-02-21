'use client'
import { ark } from '@ark-ui/react/factory'
import type { ComponentProps } from 'react'
import { createStyleContext } from 'styled-system/jsx'
import { contentCard } from 'styled-system/recipes'

const { withProvider, withContext } = createStyleContext(contentCard)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(ark.div, 'root')
export const Header = withContext(ark.div, 'header')
export const Title = withContext(ark.h2, 'title')
export const BadgeBar = withContext(ark.div, 'badgeBar')
export const Body = withContext(ark.div, 'body')
export const Section = withContext(ark.section, 'section')
export const SectionTitle = withContext(ark.h3, 'sectionTitle')
export const Separator = withContext(ark.hr, 'separator')
export const List = withContext(ark.ul, 'list')
export const ListItem = withContext(ark.li, 'listItem')

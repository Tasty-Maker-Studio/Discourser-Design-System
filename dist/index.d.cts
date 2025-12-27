import * as react from 'react';
import { ButtonHTMLAttributes, ReactNode, HTMLAttributes, InputHTMLAttributes } from 'react';
import { RecipeConfig, RecipeVariantRecord, SlotRecipeConfig } from '@pandacss/types';
import { ClassValue } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    /**
     * Visual style variant
     * @default "filled"
     */
    variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
    /**
     * Size variant
     * @default "md"
     */
    size?: 'sm' | 'md' | 'lg';
}
declare const Button: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>;

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    /**
     * Visual style variant
     * @default "filled"
     */
    variant?: 'filled' | 'outlined' | 'elevated';
    /**
     * When true, the card becomes clickable with hover/active states
     */
    interactive?: boolean;
}
declare const Card: react.ForwardRefExoticComponent<CardProps & react.RefAttributes<HTMLDivElement>>;

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Icon to display in the button
     */
    children: ReactNode;
    /**
     * Accessible label for the button (required for screen readers)
     */
    'aria-label': string;
    /**
     * Visual style variant
     * @default "standard"
     */
    variant?: 'standard' | 'filled' | 'outlined' | 'tonal';
    /**
     * Size variant
     * @default "md"
     */
    size?: 'sm' | 'md' | 'lg';
}
declare const IconButton: react.ForwardRefExoticComponent<IconButtonProps & react.RefAttributes<HTMLButtonElement>>;

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * Label text for the input
     */
    label?: string;
    /**
     * Helper text to display below the input
     */
    helperText?: string;
    /**
     * Error message to display (also sets error state)
     */
    errorText?: string;
    /**
     * Visual style variant
     * @default "outlined"
     */
    variant?: 'outlined' | 'filled';
    /**
     * Size variant
     * @default "md"
     */
    size?: 'sm' | 'md';
    /**
     * Visual state
     */
    state?: 'error';
}
declare const Input: react.ForwardRefExoticComponent<InputProps & react.RefAttributes<HTMLInputElement>>;

interface DialogProps {
    /**
     * Whether the dialog is open
     */
    open?: boolean;
    /**
     * Callback when the dialog open state changes
     */
    onOpenChange?: (details: {
        open: boolean;
    }) => void;
    /**
     * Dialog title
     */
    title?: string;
    /**
     * Dialog description/content
     */
    description?: string;
    /**
     * Dialog content (alternative to description for custom content)
     */
    children?: ReactNode;
    /**
     * Whether to show the close button
     * @default true
     */
    showCloseButton?: boolean;
    /**
     * Custom close button label for accessibility
     * @default 'Close'
     */
    closeLabel?: string;
    /**
     * Size variant
     * @default "md"
     */
    size?: 'sm' | 'md' | 'lg';
}
declare const Dialog: react.ForwardRefExoticComponent<DialogProps & react.RefAttributes<HTMLDivElement>>;

interface SwitchProps {
    /**
     * Label text for the switch
     */
    label?: string;
    /**
     * Whether the switch is checked
     */
    checked?: boolean;
    /**
     * Default checked state (uncontrolled)
     */
    defaultChecked?: boolean;
    /**
     * Callback when checked state changes
     */
    onCheckedChange?: (details: {
        checked: boolean;
    }) => void;
    /**
     * Whether the switch is disabled
     */
    disabled?: boolean;
    /**
     * Name attribute for form submission
     */
    name?: string;
    /**
     * Value attribute for form submission
     */
    value?: string;
    /**
     * Whether the switch is required
     */
    required?: boolean;
    /**
     * Size variant
     * @default "md"
     */
    size?: 'sm' | 'md';
}
declare const Switch: react.ForwardRefExoticComponent<SwitchProps & react.RefAttributes<HTMLInputElement>>;

declare const buttonRecipe: RecipeConfig<RecipeVariantRecord>;

declare const cardRecipe: RecipeConfig<RecipeVariantRecord>;

declare const iconButtonRecipe: RecipeConfig<RecipeVariantRecord>;

declare const inputRecipe: RecipeConfig<RecipeVariantRecord>;

declare const dialogRecipe: SlotRecipeConfig;

declare const switchRecipe: SlotRecipeConfig;

/**
 * Design Language Contract
 *
 * Any aesthetic (M3, Carbon, Fluent, custom) must implement this interface.
 * This enables swapping aesthetics by changing one import.
 */
interface DesignLanguageContract {
    name: string;
    version: string;
    colors: ColorPalettes;
    semantic: SemanticColors;
    semanticDark?: SemanticColors;
    typography: TypographyConfig;
    spacing: SpacingScale;
    shape: ShapeConfig;
    elevation: ElevationConfig;
    motion: MotionConfig;
}
interface ColorPalettes {
    primary: TonalPalette;
    secondary: TonalPalette;
    tertiary: TonalPalette;
    neutral: TonalPalette;
    neutralVariant: TonalPalette;
    error: TonalPalette;
}
interface TonalPalette {
    0: string;
    10: string;
    20: string;
    30: string;
    40: string;
    50: string;
    60: string;
    70: string;
    80: string;
    90: string;
    95: string;
    99: string;
    100: string;
}
interface SemanticColors {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;
    error: string;
    onError: string;
    errorContainer: string;
    onErrorContainer: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    surfaceContainerLowest: string;
    surfaceContainerLow: string;
    surfaceContainer: string;
    surfaceContainerHigh: string;
    surfaceContainerHighest: string;
    outline: string;
    outlineVariant: string;
    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;
    background: string;
    onBackground: string;
    scrim: string;
    shadow: string;
}
interface TypographyConfig {
    fonts: {
        display: string;
        body: string;
        mono: string;
    };
    scale: TypographyScale;
}
interface TypographyScale {
    displayLarge: TypeStyle;
    displayMedium: TypeStyle;
    displaySmall: TypeStyle;
    headlineLarge: TypeStyle;
    headlineMedium: TypeStyle;
    headlineSmall: TypeStyle;
    titleLarge: TypeStyle;
    titleMedium: TypeStyle;
    titleSmall: TypeStyle;
    bodyLarge: TypeStyle;
    bodyMedium: TypeStyle;
    bodySmall: TypeStyle;
    labelLarge: TypeStyle;
    labelMedium: TypeStyle;
    labelSmall: TypeStyle;
}
interface TypeStyle {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    letterSpacing: string;
    fontFamily?: 'display' | 'body' | 'mono';
}
interface SpacingScale {
    none: string;
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
}
interface ShapeConfig {
    radii: RadiiScale;
    style: 'sharp' | 'rounded' | 'soft' | 'organic';
}
interface RadiiScale {
    none: string;
    extraSmall: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
    full: string;
}
interface ElevationConfig {
    levels: ElevationScale;
    style: 'shadow' | 'border' | 'blur' | 'flat';
}
interface ElevationScale {
    level0: string;
    level1: string;
    level2: string;
    level3: string;
    level4: string;
    level5: string;
}
interface MotionConfig {
    durations: DurationScale;
    easings: EasingScale;
    style: 'expressive' | 'productive' | 'minimal';
}
interface DurationScale {
    instant: string;
    fast: string;
    normal: string;
    slow: string;
    slower: string;
}
interface EasingScale {
    standard: string;
    standardDecelerate: string;
    standardAccelerate: string;
    emphasized: string;
    emphasizedDecelerate: string;
    emphasizedAccelerate: string;
}

/**
 * Material Design 3 Language Implementation
 *
 * Source color: #63A002 (TastyMakers green)
 * Generated via Material Theme Builder plugin 2024-12-24
 */
declare const material3Language: DesignLanguageContract;

/**
 * Transforms a DesignLanguageContract into Panda CSS theme configuration
 */
declare function transformToPandaTheme(language: DesignLanguageContract): {
    tokens: {
        colors: {
            [k: string]: {
                [k: string]: {
                    value: any;
                };
            };
        };
        fonts: {
            display: {
                value: string;
            };
            body: {
                value: string;
            };
            mono: {
                value: string;
            };
        };
        fontSizes: {
            [k: string]: {
                value: string;
            };
        };
        lineHeights: {
            [k: string]: {
                value: string;
            };
        };
        fontWeights: {
            [k: string]: {
                value: string;
            };
        };
        letterSpacings: {
            [k: string]: {
                value: string;
            };
        };
        spacing: {
            [k: string]: {
                value: string;
            };
        };
        radii: {
            [k: string]: {
                value: string;
            };
        };
        shadows: {
            [k: string]: {
                value: string;
            };
        };
        durations: {
            [k: string]: {
                value: string;
            };
        };
        easings: {
            [k: string]: {
                value: string;
            };
        };
    };
    semanticTokens: {
        colors: {
            [k: string]: {
                value: {
                    base: any;
                    _dark: any;
                };
            };
        };
    };
    textStyles: {
        [k: string]: {
            value: {
                fontFamily: any;
                fontSize: any;
                lineHeight: any;
                fontWeight: any;
                letterSpacing: any;
            };
        };
    };
};

/**
 * Utility function to merge class names
 */
declare function cn(...inputs: ClassValue[]): string;

export { Button, type ButtonProps, Card, type CardProps, type ColorPalettes, type DesignLanguageContract, Dialog, type DialogProps, type DurationScale, type EasingScale, type ElevationConfig, type ElevationScale, IconButton, type IconButtonProps, Input, type InputProps, type MotionConfig, type RadiiScale, type SemanticColors, type ShapeConfig, type SpacingScale, Switch, type SwitchProps, type TonalPalette, type TypeStyle, type TypographyConfig, type TypographyScale, material3Language as activeLanguage, buttonRecipe, cardRecipe, cn, dialogRecipe, iconButtonRecipe, inputRecipe, switchRecipe, transformToPandaTheme };

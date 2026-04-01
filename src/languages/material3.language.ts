import type { DesignLanguageContract } from '../contracts/design-language.contract';

/**
 * Material Design 3 Language Implementation
 *
 * Source color: #63A002 (TastyMakers green)
 * Generated via Material Theme Builder plugin 2024-12-24
 */
export const material3Language: DesignLanguageContract = {
  name: 'material3',
  version: '1.0.0',

  colors: {
    // From Material Theme Builder export
    primary: {
      0: '#000000',
      10: '#102000',
      20: '#1F3700',
      30: '#2F4F00',
      40: '#3F6900',
      50: '#518500',
      60: '#64A104',
      70: '#7DBD2A',
      80: '#97D945',
      90: '#B2F65F',
      95: '#D2FF9B',
      99: '#F9FFE9',
      100: '#FFFFFF',
    },
    secondary: {
      0: '#000000',
      10: '#121F04',
      20: '#263515',
      30: '#3C4C2A',
      40: '#54643F',
      50: '#6C7D56',
      60: '#85976E',
      70: '#A0B187',
      80: '#BBCDA1',
      90: '#D7E9BB',
      95: '#E5F7C9',
      99: '#F9FFE9',
      100: '#FFFFFF',
    },
    tertiary: {
      0: '#000000',
      10: '#00201E',
      20: '#003735',
      30: '#00504C',
      40: '#046A66',
      50: '#30837F',
      60: '#4D9D98',
      70: '#69B8B3',
      80: '#85D4CF',
      90: '#A1F1EB',
      95: '#B0FFF9',
      99: '#F2FFFD',
      100: '#FFFFFF',
    },
    neutral: {
      0: '#000000',
      10: '#1B1C18',
      20: '#30312C',
      30: '#464742',
      40: '#5E5F59',
      50: '#777771',
      60: '#91918B',
      70: '#ABACA5',
      80: '#C7C7C0',
      90: '#E3E3DB',
      95: '#F2F1E9',
      99: '#FDFCF5',
      100: '#FFFFFF',
    },
    neutralVariant: {
      0: '#000000',
      10: '#191D14',
      20: '#2E3228',
      30: '#44483D',
      40: '#5C6054',
      50: '#75796C',
      60: '#8F9285',
      70: '#A9AD9F',
      80: '#C5C8BA',
      90: '#E1E4D5',
      95: '#EFF2E3',
      99: '#FBFEEE',
      100: '#FFFFFF',
    },
    error: {
      0: '#000000',
      10: '#410E0B',
      20: '#601410',
      30: '#8C1D18',
      40: '#B3261E',
      50: '#DC362E',
      60: '#E46962',
      70: '#EC928E',
      80: '#F2B8B5',
      90: '#F9DEDC',
      95: '#FCEEEE',
      99: '#FFFBF9',
      100: '#FFFFFF',
    },
  },

  semantic: {
    // Light theme from Material Theme Builder
    primary: '#4C662B',
    onPrimary: '#FFFFFF',
    primaryContainer: '#CDEDA3',
    onPrimaryContainer: '#354E16',

    secondary: '#586249',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#DCE7C8',
    onSecondaryContainer: '#404A33',

    tertiary: '#386663',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#BCECE7',
    onTertiaryContainer: '#1F4E4B',

    error: '#BA1A1A',
    onError: '#FFFFFF',
    errorContainer: '#FFDAD6',
    onErrorContainer: '#93000A',

    surface: '#F9FAEF',
    onSurface: '#1A1C16',
    surfaceVariant: '#E1E4D5',
    onSurfaceVariant: '#44483D',

    surfaceContainerLowest: '#FFFFFF',
    surfaceContainerLow: '#F3F4E9',
    surfaceContainer: '#EEEFE3',
    surfaceContainerHigh: '#E8E9DE',
    surfaceContainerHighest: '#E2E3D8',

    outline: '#75796C',
    outlineVariant: '#C5C8BA',

    inverseSurface: '#2F312A',
    inverseOnSurface: '#F1F2E6',
    inversePrimary: '#B1D18A',

    background: '#F9FAEF',
    onBackground: '#1A1C16',

    scrim: '#000000',
    shadow: '#000000',
  },

  // Dark theme semantic colors (for reference/dark mode implementation)
  semanticDark: {
    primary: '#B1D18A',
    onPrimary: '#1F3701',
    primaryContainer: '#354E16',
    onPrimaryContainer: '#CDEDA3',

    secondary: '#BFCBAD',
    onSecondary: '#2A331E',
    secondaryContainer: '#404A33',
    onSecondaryContainer: '#DCE7C8',

    tertiary: '#A0D0CB',
    onTertiary: '#003735',
    tertiaryContainer: '#1F4E4B',
    onTertiaryContainer: '#BCECE7',

    error: '#FFB4AB',
    onError: '#690005',
    errorContainer: '#93000A',
    onErrorContainer: '#FFDAD6',

    surface: '#12140E',
    onSurface: '#E2E3D8',
    surfaceVariant: '#44483D',
    onSurfaceVariant: '#C5C8BA',

    surfaceContainerLowest: '#0C0F09',
    surfaceContainerLow: '#1A1C16',
    surfaceContainer: '#1E201A',
    surfaceContainerHigh: '#282B24',
    surfaceContainerHighest: '#33362E',

    outline: '#8F9285',
    outlineVariant: '#44483D',

    inverseSurface: '#E2E3D8',
    inverseOnSurface: '#2F312A',
    inversePrimary: '#4C662B',

    background: '#12140E',
    onBackground: '#E2E3D8',

    scrim: '#000000',
    shadow: '#000000',
  },

  typography: {
    fonts: {
      display: {
        family: '"Fraunces", Georgia, serif',
        figmaName: 'Fraunces',
        weightMap: {
          '100': 'Thin',
          '300': 'Light',
          '400': 'Regular',
          '500': 'Medium',
          '600': 'SemiBold',
          '700': 'Bold',
        },
      },
      body: {
        family:
          '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        figmaName: 'Poppins',
        weightMap: {
          '100': 'Thin',
          '300': 'Light',
          '400': 'Regular',
          '500': 'Medium',
          '600': 'SemiBold',
          '700': 'Bold',
        },
      },
      mono: {
        family: '"JetBrains Mono", "Fira Code", Consolas, monospace',
        figmaName: 'JetBrains Mono',
        weightMap: {
          '400': 'Regular',
          '700': 'Bold',
        },
      },
    },
    scale: {
      // ── Display ─────────────────────────────────────────────────────────────

      displayLarge: {
        geometry: {
          fontSize: '57px',
          lineHeight: '64px',
          letterSpacing: '-0.25px',
          fontFamily: 'display',
          fontVariationSettings: "'SOFT' 0, 'WONK' 1",
        },
        defaultWeight: 'regular',
        weights: {
          regular: { name: 'regular', fontWeight: '400' },
          semiBold: { name: 'semiBold', fontWeight: '600' },
        },
      },

      displayMedium: {
        geometry: {
          fontSize: '45px',
          lineHeight: '52px',
          letterSpacing: '0px',
          fontFamily: 'display',
        },
        defaultWeight: 'regular',
        weights: {
          regular: { name: 'regular', fontWeight: '400' },
          semiBold: { name: 'semiBold', fontWeight: '600' },
        },
      },

      displaySmall: {
        geometry: {
          fontSize: '36px',
          lineHeight: '44px',
          letterSpacing: '0px',
          fontFamily: 'display',
        },
        defaultWeight: 'regular',
        weights: {
          regular: { name: 'regular', fontWeight: '400' },
          semiBold: { name: 'semiBold', fontWeight: '600' },
        },
      },

      // ── Headline ────────────────────────────────────────────────────────────

      headlineLarge: {
        geometry: {
          fontSize: '32px',
          lineHeight: '40px',
          letterSpacing: '0px',
          fontFamily: 'display',
        },
        defaultWeight: 'regular',
        weights: {
          light: { name: 'light', fontWeight: '300' },
          regular: { name: 'regular', fontWeight: '400' },
          semiBold: { name: 'semiBold', fontWeight: '600' },
        },
      },

      headlineMedium: {
        geometry: {
          fontSize: '28px',
          lineHeight: '36px',
          letterSpacing: '0px',
          fontFamily: 'display',
          fontVariationSettings: "'SOFT' 0, 'WONK' 1",
        },
        defaultWeight: 'regular',
        weights: {
          light: { name: 'light', fontWeight: '300' },
          regular: { name: 'regular', fontWeight: '400' },
          semiBold: { name: 'semiBold', fontWeight: '600' },
        },
      },

      headlineSmall: {
        geometry: {
          fontSize: '24px',
          lineHeight: '32px',
          letterSpacing: '0px',
          fontFamily: 'display',
        },
        defaultWeight: 'regular',
        weights: {
          light: { name: 'light', fontWeight: '300' },
          regular: { name: 'regular', fontWeight: '400' },
          semiBold: { name: 'semiBold', fontWeight: '600' },
        },
      },

      // ── Title ────────────────────────────────────────────────────────────────

      titleLarge: {
        geometry: {
          fontSize: '22px',
          lineHeight: '28px',
          letterSpacing: '0px',
          fontFamily: 'body',
        },
        defaultWeight: 'medium',
        weights: {
          regular: { name: 'regular', fontWeight: '400' },
          medium: { name: 'medium', fontWeight: '500' },
          semiBold: { name: 'semiBold', fontWeight: '600' },
          bold: { name: 'bold', fontWeight: '700' },
        },
      },

      titleMedium: {
        geometry: {
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '0.15px',
          fontFamily: 'body',
        },
        defaultWeight: 'medium',
        weights: {
          regular: { name: 'regular', fontWeight: '400' },
          medium: { name: 'medium', fontWeight: '500' },
          semiBold: { name: 'semiBold', fontWeight: '600' },
          bold: { name: 'bold', fontWeight: '700' },
        },
      },

      titleSmall: {
        geometry: {
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '0.1px',
          fontFamily: 'body',
        },
        defaultWeight: 'medium',
        weights: {
          regular: { name: 'regular', fontWeight: '400' },
          medium: { name: 'medium', fontWeight: '500' },
          semiBold: { name: 'semiBold', fontWeight: '600' },
          bold: { name: 'bold', fontWeight: '700' },
        },
      },

      // ── Body ─────────────────────────────────────────────────────────────────
      // Custom override: bodyLarge bumped to 18px/28px (was M3 default 16px/24px)
      // Decision date: 2026-03-24

      bodyLarge: {
        geometry: {
          fontSize: '18px',
          lineHeight: '28px',
          letterSpacing: '0.5px',
          fontFamily: 'body',
        },
        defaultWeight: 'regular',
        weights: {
          light: { name: 'light', fontWeight: '300' },
          regular: { name: 'regular', fontWeight: '400' },
          medium: { name: 'medium', fontWeight: '500' },
          semiBold: { name: 'semiBold', fontWeight: '600' },
        },
      },

      bodyMedium: {
        geometry: {
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '0.25px',
          fontFamily: 'body',
        },
        defaultWeight: 'regular',
        weights: {
          light: { name: 'light', fontWeight: '300' },
          regular: { name: 'regular', fontWeight: '400' },
          medium: { name: 'medium', fontWeight: '500' },
          semiBold: { name: 'semiBold', fontWeight: '600' },
        },
      },

      bodySmall: {
        geometry: {
          fontSize: '12px',
          lineHeight: '16px',
          letterSpacing: '0.4px',
          fontFamily: 'body',
        },
        defaultWeight: 'regular',
        weights: {
          light: { name: 'light', fontWeight: '300' },
          regular: { name: 'regular', fontWeight: '400' },
          medium: { name: 'medium', fontWeight: '500' },
          semiBold: { name: 'semiBold', fontWeight: '600' },
        },
      },

      // ── Label ────────────────────────────────────────────────────────────────

      labelLarge: {
        geometry: {
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '0.1px',
          fontFamily: 'body',
        },
        defaultWeight: 'medium',
        weights: {
          light: { name: 'light', fontWeight: '300' },
          medium: { name: 'medium', fontWeight: '500' },
          semiBold: { name: 'semiBold', fontWeight: '600' },
          bold: { name: 'bold', fontWeight: '700' },
        },
      },

      labelMedium: {
        geometry: {
          fontSize: '12px',
          lineHeight: '16px',
          letterSpacing: '0.5px',
          fontFamily: 'body',
        },
        defaultWeight: 'medium',
        weights: {
          light: { name: 'light', fontWeight: '300' },
          medium: { name: 'medium', fontWeight: '500' },
          semiBold: { name: 'semiBold', fontWeight: '600' },
          bold: { name: 'bold', fontWeight: '700' },
        },
      },

      labelSmall: {
        geometry: {
          fontSize: '11px',
          lineHeight: '16px',
          letterSpacing: '0.5px',
          fontFamily: 'body',
        },
        defaultWeight: 'medium',
        weights: {
          light: { name: 'light', fontWeight: '300' },
          medium: { name: 'medium', fontWeight: '500' },
          semiBold: { name: 'semiBold', fontWeight: '600' },
          bold: { name: 'bold', fontWeight: '700' },
        },
      },
    },
  },

  spacing: {
    none: '0px',
    xxs: '2px',
    xs: '4px',
    '2xs': '12px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },

  shape: {
    radii: {
      none: '0px',
      extraSmall: '4px',
      small: '8px',
      medium: '12px',
      large: '16px',
      extraLarge: '28px',
      full: '9999px',
    },
    style: 'rounded',
  },

  elevation: {
    levels: {
      level0: 'none',
      level1:
        '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
      level2:
        '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
      level3:
        '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)',
      level4:
        '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)',
      level5:
        '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)',
    },
    style: 'shadow',
  },

  motion: {
    durations: {
      instant: '0ms',
      fast: '100ms',
      normal: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    easings: {
      standard: 'cubic-bezier(0.2, 0, 0, 1)',
      standardDecelerate: 'cubic-bezier(0, 0, 0, 1)',
      standardAccelerate: 'cubic-bezier(0.3, 0, 1, 1)',
      emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
      emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
      emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
    },
    style: 'expressive',
  },

  border: {
    widths: {
      thin: '1px',
      medium: '2px',
      thick: '4px',
    },
  },
};

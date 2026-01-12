import { defineRecipe } from '@pandacss/dev';

export const heading = defineRecipe({
  className: 'heading',
  base: {
    color: 'fg.default',
  },
  defaultVariants: {
    size: 'xl',
  },
  variants: {
    size: {
      xs: { textStyle: 'labelLarge' },
      sm: { textStyle: 'titleSmall' },
      md: { textStyle: 'titleMedium' },
      lg: { textStyle: 'titleLarge' },
      xl: { textStyle: 'headlineSmall' },
      '2xl': { textStyle: 'headlineMedium' },
      '3xl': { textStyle: 'headlineLarge' },
      '4xl': { textStyle: 'displaySmall' },
      '5xl': { textStyle: 'displayMedium' },
      '6xl': { textStyle: 'displayLarge' },
      '7xl': { textStyle: 'displayLarge' },
    },
  },
});

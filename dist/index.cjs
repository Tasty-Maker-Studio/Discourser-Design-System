'use strict';

var react = require('react');
var recipes = require('styled-system/recipes');
var clsx = require('clsx');
var jsxRuntime = require('react/jsx-runtime');
var field = require('@ark-ui/react/field');
var dialog = require('@ark-ui/react/dialog');
var portal = require('@ark-ui/react/portal');
var _switch = require('@ark-ui/react/switch');

function cn(...inputs) {
  return clsx.clsx(inputs);
}
var Button = react.forwardRef(
  ({ children, variant, size, leftIcon, rightIcon, className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        ref,
        className: cn(recipes.button({ variant, size }), className),
        ...props,
        children: [
          leftIcon,
          children,
          rightIcon
        ]
      }
    );
  }
);
Button.displayName = "Button";
var Card = react.forwardRef(
  ({ children, variant, interactive, className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        className: cn(recipes.card({ variant, interactive }), className),
        ...props,
        children
      }
    );
  }
);
Card.displayName = "Card";
var IconButton = react.forwardRef(
  ({ children, variant, size, className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        ref,
        className: cn(recipes.iconButton({ variant, size }), className),
        ...props,
        children
      }
    );
  }
);
IconButton.displayName = "IconButton";
var Input = react.forwardRef(
  ({ label, helperText, errorText, variant, size, state, className, ...props }, ref) => {
    const hasError = !!errorText || state === "error";
    return /* @__PURE__ */ jsxRuntime.jsxs(field.Field.Root, { invalid: hasError, children: [
      label && /* @__PURE__ */ jsxRuntime.jsx(field.Field.Label, { children: label }),
      /* @__PURE__ */ jsxRuntime.jsx(
        field.Field.Input,
        {
          ref,
          className: cn(
            recipes.input({ variant, size, state: hasError ? "error" : state }),
            className
          ),
          ...props
        }
      ),
      helperText && !hasError && /* @__PURE__ */ jsxRuntime.jsx(field.Field.HelperText, { children: helperText }),
      errorText && /* @__PURE__ */ jsxRuntime.jsx(field.Field.ErrorText, { children: errorText })
    ] });
  }
);
Input.displayName = "Input";
var Dialog = react.forwardRef(
  ({
    open,
    onOpenChange,
    title,
    description,
    children,
    size,
    showCloseButton = true,
    closeLabel = "Close"
  }, ref) => {
    const classes = recipes.dialog({ size });
    return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog.Root, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(portal.Portal, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog.Backdrop, { className: classes.backdrop }),
      /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog.Positioner, { className: classes.positioner, children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.Dialog.Content, { ref, className: classes.content, children: [
        title && /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog.Title, { className: classes.title, children: title }),
        description && /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog.Description, { className: classes.description, children: description }),
        children && /* @__PURE__ */ jsxRuntime.jsx("div", { className: classes.description, children }),
        showCloseButton && /* @__PURE__ */ jsxRuntime.jsx(
          dialog.Dialog.CloseTrigger,
          {
            className: classes.closeTrigger,
            "aria-label": closeLabel,
            children: /* @__PURE__ */ jsxRuntime.jsxs(
              "svg",
              {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                  /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                ]
              }
            )
          }
        )
      ] }) })
    ] }) });
  }
);
Dialog.displayName = "Dialog";
var Switch = react.forwardRef(
  ({
    label,
    checked,
    defaultChecked,
    onCheckedChange,
    disabled,
    name,
    value,
    required,
    size
  }, ref) => {
    const classes = recipes.switchControl({ size });
    return /* @__PURE__ */ jsxRuntime.jsxs(
      _switch.Switch.Root,
      {
        checked,
        defaultChecked,
        onCheckedChange,
        disabled,
        name,
        value,
        required,
        className: classes.root,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(_switch.Switch.Control, { className: classes.control, children: /* @__PURE__ */ jsxRuntime.jsx(_switch.Switch.Thumb, { className: classes.thumb }) }),
          /* @__PURE__ */ jsxRuntime.jsx(_switch.Switch.HiddenInput, { ref }),
          label && /* @__PURE__ */ jsxRuntime.jsx(_switch.Switch.Label, { className: classes.label, children: label })
        ]
      }
    );
  }
);
Switch.displayName = "Switch";

// node_modules/.pnpm/@pandacss+dev@0.52.0_jsdom@27.4.0_typescript@5.9.3/node_modules/@pandacss/dev/dist/index.mjs
function defineRecipe(config) {
  return config;
}
function defineSlotRecipe(config) {
  return config;
}

// src/recipes/button.recipe.ts
var buttonRecipe = defineRecipe({
  className: "button",
  description: "Material Design 3 button component",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "sm",
    fontFamily: "body",
    fontWeight: "500",
    borderRadius: "full",
    cursor: "pointer",
    transition: "all",
    transitionDuration: "fast",
    transitionTimingFunction: "standard",
    outline: "none",
    border: "none",
    textDecoration: "none",
    _disabled: {
      opacity: 0.38,
      cursor: "not-allowed",
      pointerEvents: "none"
    },
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "primary",
      outlineOffset: "2px"
    }
  },
  variants: {
    variant: {
      filled: {
        bg: "primary",
        color: "onPrimary",
        _hover: {
          opacity: 0.92,
          shadow: "level1"
        },
        _active: {
          opacity: 0.88
        }
      },
      outlined: {
        bg: "transparent",
        color: "primary",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "outline",
        _hover: {
          bg: "primary",
          bgOpacity: 0.08
        },
        _active: {
          bg: "primary",
          bgOpacity: 0.12
        }
      },
      text: {
        bg: "transparent",
        color: "primary",
        _hover: {
          bg: "primary",
          bgOpacity: 0.08
        },
        _active: {
          bg: "primary",
          bgOpacity: 0.12
        }
      },
      elevated: {
        bg: "surfaceContainerLow",
        color: "primary",
        shadow: "level1",
        _hover: {
          shadow: "level2",
          bg: "surfaceContainerLow"
        },
        _active: {
          shadow: "level1"
        }
      },
      tonal: {
        bg: "secondaryContainer",
        color: "onSecondaryContainer",
        _hover: {
          shadow: "level1"
        },
        _active: {
          shadow: "none"
        }
      }
    },
    size: {
      sm: {
        height: "32px",
        px: "md",
        fontSize: "labelMedium",
        lineHeight: "labelMedium"
      },
      md: {
        height: "40px",
        px: "lg",
        fontSize: "labelLarge",
        lineHeight: "labelLarge"
      },
      lg: {
        height: "48px",
        px: "xl",
        fontSize: "labelLarge",
        lineHeight: "labelLarge"
      }
    }
  },
  defaultVariants: {
    variant: "filled",
    size: "md"
  }
});

// src/recipes/card.recipe.ts
var cardRecipe = defineRecipe({
  className: "card",
  description: "Material Design 3 card component",
  base: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "medium",
    overflow: "hidden",
    transition: "all",
    transitionDuration: "fast",
    transitionTimingFunction: "standard"
  },
  variants: {
    variant: {
      elevated: {
        bg: "surfaceContainerLow",
        shadow: "level1",
        _hover: {
          shadow: "level2"
        }
      },
      filled: {
        bg: "surfaceContainerHighest"
      },
      outlined: {
        bg: "surface",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "outlineVariant"
      }
    },
    interactive: {
      true: {
        cursor: "pointer",
        _hover: {
          opacity: 0.96
        },
        _active: {
          opacity: 0.92
        }
      }
    }
  },
  defaultVariants: {
    variant: "elevated",
    interactive: false
  }
});

// src/recipes/icon-button.recipe.ts
var iconButtonRecipe = defineRecipe({
  className: "icon-button",
  description: "Material Design 3 icon button component",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "full",
    cursor: "pointer",
    transition: "all",
    transitionDuration: "fast",
    transitionTimingFunction: "standard",
    outline: "none",
    border: "none",
    p: "0",
    _disabled: {
      opacity: 0.38,
      cursor: "not-allowed",
      pointerEvents: "none"
    },
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "primary",
      outlineOffset: "2px"
    }
  },
  variants: {
    variant: {
      standard: {
        bg: "transparent",
        color: "onSurfaceVariant",
        _hover: {
          bg: "onSurfaceVariant",
          bgOpacity: 0.08
        }
      },
      filled: {
        bg: "primary",
        color: "onPrimary",
        _hover: {
          opacity: 0.92
        }
      },
      tonal: {
        bg: "secondaryContainer",
        color: "onSecondaryContainer",
        _hover: {
          opacity: 0.92
        }
      },
      outlined: {
        bg: "transparent",
        color: "onSurfaceVariant",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "outline",
        _hover: {
          bg: "onSurfaceVariant",
          bgOpacity: 0.08
        }
      }
    },
    size: {
      sm: {
        width: "32px",
        height: "32px",
        "& svg": {
          width: "18px",
          height: "18px"
        }
      },
      md: {
        width: "40px",
        height: "40px",
        "& svg": {
          width: "24px",
          height: "24px"
        }
      },
      lg: {
        width: "48px",
        height: "48px",
        "& svg": {
          width: "24px",
          height: "24px"
        }
      }
    }
  },
  defaultVariants: {
    variant: "standard",
    size: "md"
  }
});

// src/recipes/input.recipe.ts
var inputRecipe = defineRecipe({
  className: "input",
  description: "Material Design 3 text field component",
  base: {
    width: "100%",
    fontFamily: "body",
    fontSize: "bodyLarge",
    lineHeight: "bodyLarge",
    color: "onSurface",
    bg: "transparent",
    borderRadius: "extraSmall",
    px: "md",
    transition: "all",
    transitionDuration: "fast",
    outline: "none",
    _placeholder: {
      color: "onSurfaceVariant",
      opacity: 0.6
    },
    _focus: {
      outline: "none"
    },
    _disabled: {
      opacity: 0.38,
      cursor: "not-allowed"
    }
  },
  variants: {
    variant: {
      filled: {
        bg: "surfaceContainerHighest",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "onSurfaceVariant",
        borderTopLeftRadius: "extraSmall",
        borderTopRightRadius: "extraSmall",
        borderBottomLeftRadius: "0",
        borderBottomRightRadius: "0",
        _hover: {
          bg: "surfaceContainerHigh"
        },
        _focus: {
          borderBottomWidth: "2px",
          borderBottomColor: "primary"
        }
      },
      outlined: {
        bg: "transparent",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "outline",
        _hover: {
          borderColor: "onSurface"
        },
        _focus: {
          borderWidth: "2px",
          borderColor: "primary"
        }
      }
    },
    size: {
      sm: {
        height: "40px",
        fontSize: "bodySmall",
        lineHeight: "bodySmall"
      },
      md: {
        height: "56px",
        fontSize: "bodyLarge",
        lineHeight: "bodyLarge"
      }
    },
    state: {
      error: {
        borderColor: "error",
        _focus: {
          borderColor: "error"
        }
      },
      disabled: {
        opacity: 0.38,
        cursor: "not-allowed",
        pointerEvents: "none"
      }
    }
  },
  defaultVariants: {
    variant: "outlined",
    size: "md"
  }
});

// src/recipes/dialog.recipe.ts
var dialogRecipe = defineSlotRecipe({
  className: "dialog",
  description: "Material Design 3 dialog component",
  slots: ["backdrop", "positioner", "content", "title", "description", "closeTrigger"],
  base: {
    backdrop: {
      position: "fixed",
      inset: "0",
      bg: "scrim",
      opacity: 0.4,
      zIndex: "modal",
      animation: "fadeIn",
      _open: {
        animation: "fadeIn"
      },
      _closed: {
        animation: "fadeOut"
      }
    },
    positioner: {
      position: "fixed",
      inset: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "modal",
      p: "lg"
    },
    content: {
      position: "relative",
      bg: "surfaceContainerHigh",
      color: "onSurface",
      borderRadius: "extraLarge",
      boxShadow: "level3",
      display: "flex",
      flexDirection: "column",
      maxWidth: "90vw",
      maxHeight: "90vh",
      overflow: "hidden",
      animation: "scaleIn",
      _open: {
        animation: "scaleIn"
      },
      _closed: {
        animation: "scaleOut"
      }
    },
    title: {
      fontFamily: "headline",
      fontSize: "headlineSmall",
      fontWeight: "regular",
      color: "onSurface",
      px: "xl",
      pt: "xl",
      pb: "md"
    },
    description: {
      fontFamily: "body",
      fontSize: "bodyMedium",
      color: "onSurfaceVariant",
      px: "xl",
      pb: "xl",
      flex: "1",
      overflow: "auto"
    },
    closeTrigger: {
      position: "absolute",
      top: "md",
      right: "md",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
      borderRadius: "full",
      cursor: "pointer",
      color: "onSurfaceVariant",
      bg: "transparent",
      border: "none",
      transition: "all",
      transitionDuration: "fast",
      _hover: {
        bg: "surfaceContainerHighest"
      },
      _focus: {
        outline: "none",
        bg: "surfaceContainerHighest"
      }
    }
  },
  variants: {
    size: {
      sm: {
        content: {
          width: "280px",
          minHeight: "140px"
        }
      },
      md: {
        content: {
          width: "560px",
          minHeight: "200px"
        }
      },
      lg: {
        content: {
          width: "800px",
          minHeight: "300px"
        }
      },
      fullscreen: {
        content: {
          width: "100vw",
          height: "100vh",
          maxWidth: "100vw",
          maxHeight: "100vh",
          borderRadius: "none"
        },
        positioner: {
          p: "0"
        }
      }
    }
  },
  defaultVariants: {
    size: "md"
  }
});

// src/recipes/switch.recipe.ts
var switchRecipe = defineSlotRecipe({
  className: "switchControl",
  description: "Material Design 3 switch component",
  slots: ["root", "control", "thumb", "label"],
  base: {
    root: {
      display: "inline-flex",
      alignItems: "center",
      gap: "sm",
      cursor: "pointer",
      userSelect: "none",
      _disabled: {
        cursor: "not-allowed",
        opacity: 0.38
      }
    },
    control: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      width: "52px",
      height: "32px",
      borderRadius: "full",
      bg: "surfaceContainerHighest",
      border: "2px solid",
      borderColor: "outline",
      transition: "all",
      transitionDuration: "fast",
      flexShrink: 0,
      _checked: {
        bg: "primary",
        borderColor: "primary"
      },
      _disabled: {
        bg: "surfaceVariant",
        borderColor: "onSurface",
        opacity: 0.12
      }
    },
    thumb: {
      position: "absolute",
      left: "4px",
      width: "16px",
      height: "16px",
      borderRadius: "full",
      bg: "outline",
      transition: "all",
      transitionDuration: "fast",
      _checked: {
        left: "28px",
        width: "24px",
        height: "24px",
        bg: "onPrimary"
      },
      _disabled: {
        bg: "onSurface",
        opacity: 0.38
      }
    },
    label: {
      fontFamily: "body",
      fontSize: "bodyMedium",
      color: "onSurface",
      userSelect: "none",
      _disabled: {
        opacity: 0.38
      }
    }
  },
  variants: {
    size: {
      sm: {
        control: {
          width: "44px",
          height: "24px"
        },
        thumb: {
          width: "12px",
          height: "12px",
          left: "4px",
          _checked: {
            left: "24px",
            width: "16px",
            height: "16px"
          }
        },
        label: {
          fontSize: "bodySmall"
        }
      },
      md: {
        control: {
          width: "52px",
          height: "32px"
        },
        thumb: {
          width: "16px",
          height: "16px",
          left: "4px",
          _checked: {
            left: "28px",
            width: "24px",
            height: "24px"
          }
        },
        label: {
          fontSize: "bodyMedium"
        }
      }
    }
  },
  defaultVariants: {
    size: "md"
  }
});

// src/languages/material3.language.ts
var material3Language = {
  name: "material3",
  version: "1.0.0",
  colors: {
    // From Material Theme Builder export
    primary: {
      0: "#000000",
      10: "#102000",
      20: "#1F3700",
      30: "#2F4F00",
      40: "#3F6900",
      50: "#518500",
      60: "#64A104",
      70: "#7DBD2A",
      80: "#97D945",
      90: "#B2F65F",
      95: "#D2FF9B",
      99: "#F9FFE9",
      100: "#FFFFFF"
    },
    secondary: {
      0: "#000000",
      10: "#121F04",
      20: "#263515",
      30: "#3C4C2A",
      40: "#54643F",
      50: "#6C7D56",
      60: "#85976E",
      70: "#A0B187",
      80: "#BBCDA1",
      90: "#D7E9BB",
      95: "#E5F7C9",
      99: "#F9FFE9",
      100: "#FFFFFF"
    },
    tertiary: {
      0: "#000000",
      10: "#00201E",
      20: "#003735",
      30: "#00504C",
      40: "#046A66",
      50: "#30837F",
      60: "#4D9D98",
      70: "#69B8B3",
      80: "#85D4CF",
      90: "#A1F1EB",
      95: "#B0FFF9",
      99: "#F2FFFD",
      100: "#FFFFFF"
    },
    neutral: {
      0: "#000000",
      10: "#1B1C18",
      20: "#30312C",
      30: "#464742",
      40: "#5E5F59",
      50: "#777771",
      60: "#91918B",
      70: "#ABACA5",
      80: "#C7C7C0",
      90: "#E3E3DB",
      95: "#F2F1E9",
      99: "#FDFCF5",
      100: "#FFFFFF"
    },
    neutralVariant: {
      0: "#000000",
      10: "#191D14",
      20: "#2E3228",
      30: "#44483D",
      40: "#5C6054",
      50: "#75796C",
      60: "#8F9285",
      70: "#A9AD9F",
      80: "#C5C8BA",
      90: "#E1E4D5",
      95: "#EFF2E3",
      99: "#FBFEEE",
      100: "#FFFFFF"
    },
    error: {
      0: "#000000",
      10: "#410E0B",
      20: "#601410",
      30: "#8C1D18",
      40: "#B3261E",
      50: "#DC362E",
      60: "#E46962",
      70: "#EC928E",
      80: "#F2B8B5",
      90: "#F9DEDC",
      95: "#FCEEEE",
      99: "#FFFBF9",
      100: "#FFFFFF"
    }
  },
  semantic: {
    // Light theme from Material Theme Builder
    primary: "#4C662B",
    onPrimary: "#FFFFFF",
    primaryContainer: "#CDEDA3",
    onPrimaryContainer: "#354E16",
    secondary: "#586249",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#DCE7C8",
    onSecondaryContainer: "#404A33",
    tertiary: "#386663",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#BCECE7",
    onTertiaryContainer: "#1F4E4B",
    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#93000A",
    surface: "#F9FAEF",
    onSurface: "#1A1C16",
    surfaceVariant: "#E1E4D5",
    onSurfaceVariant: "#44483D",
    surfaceContainerLowest: "#FFFFFF",
    surfaceContainerLow: "#F3F4E9",
    surfaceContainer: "#EEEFE3",
    surfaceContainerHigh: "#E8E9DE",
    surfaceContainerHighest: "#E2E3D8",
    outline: "#75796C",
    outlineVariant: "#C5C8BA",
    inverseSurface: "#2F312A",
    inverseOnSurface: "#F1F2E6",
    inversePrimary: "#B1D18A",
    background: "#F9FAEF",
    onBackground: "#1A1C16",
    scrim: "#000000",
    shadow: "#000000"
  },
  // Dark theme semantic colors (for reference/dark mode implementation)
  semanticDark: {
    primary: "#B1D18A",
    onPrimary: "#1F3701",
    primaryContainer: "#354E16",
    onPrimaryContainer: "#CDEDA3",
    secondary: "#BFCBAD",
    onSecondary: "#2A331E",
    secondaryContainer: "#404A33",
    onSecondaryContainer: "#DCE7C8",
    tertiary: "#A0D0CB",
    onTertiary: "#003735",
    tertiaryContainer: "#1F4E4B",
    onTertiaryContainer: "#BCECE7",
    error: "#FFB4AB",
    onError: "#690005",
    errorContainer: "#93000A",
    onErrorContainer: "#FFDAD6",
    surface: "#12140E",
    onSurface: "#E2E3D8",
    surfaceVariant: "#44483D",
    onSurfaceVariant: "#C5C8BA",
    surfaceContainerLowest: "#0C0F09",
    surfaceContainerLow: "#1A1C16",
    surfaceContainer: "#1E201A",
    surfaceContainerHigh: "#282B24",
    surfaceContainerHighest: "#33362E",
    outline: "#8F9285",
    outlineVariant: "#44483D",
    inverseSurface: "#E2E3D8",
    inverseOnSurface: "#2F312A",
    inversePrimary: "#4C662B",
    background: "#12140E",
    onBackground: "#E2E3D8",
    scrim: "#000000",
    shadow: "#000000"
  },
  typography: {
    fonts: {
      display: 'Georgia, "Times New Roman", serif',
      body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"JetBrains Mono", "Fira Code", Consolas, monospace'
    },
    scale: {
      displayLarge: {
        fontSize: "57px",
        lineHeight: "64px",
        fontWeight: "400",
        letterSpacing: "-0.25px",
        fontFamily: "display"
      },
      displayMedium: {
        fontSize: "45px",
        lineHeight: "52px",
        fontWeight: "400",
        letterSpacing: "0px",
        fontFamily: "display"
      },
      displaySmall: {
        fontSize: "36px",
        lineHeight: "44px",
        fontWeight: "400",
        letterSpacing: "0px",
        fontFamily: "display"
      },
      headlineLarge: {
        fontSize: "32px",
        lineHeight: "40px",
        fontWeight: "400",
        letterSpacing: "0px",
        fontFamily: "display"
      },
      headlineMedium: {
        fontSize: "28px",
        lineHeight: "36px",
        fontWeight: "400",
        letterSpacing: "0px",
        fontFamily: "display"
      },
      headlineSmall: {
        fontSize: "24px",
        lineHeight: "32px",
        fontWeight: "400",
        letterSpacing: "0px",
        fontFamily: "display"
      },
      titleLarge: {
        fontSize: "22px",
        lineHeight: "28px",
        fontWeight: "500",
        letterSpacing: "0px",
        fontFamily: "body"
      },
      titleMedium: {
        fontSize: "16px",
        lineHeight: "24px",
        fontWeight: "500",
        letterSpacing: "0.15px",
        fontFamily: "body"
      },
      titleSmall: {
        fontSize: "14px",
        lineHeight: "20px",
        fontWeight: "500",
        letterSpacing: "0.1px",
        fontFamily: "body"
      },
      bodyLarge: {
        fontSize: "16px",
        lineHeight: "24px",
        fontWeight: "400",
        letterSpacing: "0.5px",
        fontFamily: "body"
      },
      bodyMedium: {
        fontSize: "14px",
        lineHeight: "20px",
        fontWeight: "400",
        letterSpacing: "0.25px",
        fontFamily: "body"
      },
      bodySmall: {
        fontSize: "12px",
        lineHeight: "16px",
        fontWeight: "400",
        letterSpacing: "0.4px",
        fontFamily: "body"
      },
      labelLarge: {
        fontSize: "14px",
        lineHeight: "20px",
        fontWeight: "500",
        letterSpacing: "0.1px",
        fontFamily: "body"
      },
      labelMedium: {
        fontSize: "12px",
        lineHeight: "16px",
        fontWeight: "500",
        letterSpacing: "0.5px",
        fontFamily: "body"
      },
      labelSmall: {
        fontSize: "11px",
        lineHeight: "16px",
        fontWeight: "500",
        letterSpacing: "0.5px",
        fontFamily: "body"
      }
    }
  },
  spacing: {
    none: "0px",
    xxs: "2px",
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    xxxl: "64px"
  },
  shape: {
    radii: {
      none: "0px",
      extraSmall: "4px",
      small: "8px",
      medium: "12px",
      large: "16px",
      extraLarge: "28px",
      full: "9999px"
    },
    style: "rounded"
  },
  elevation: {
    levels: {
      level0: "none",
      level1: "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
      level2: "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
      level3: "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)",
      level4: "0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)",
      level5: "0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)"
    },
    style: "shadow"
  },
  motion: {
    durations: {
      instant: "0ms",
      fast: "100ms",
      normal: "200ms",
      slow: "300ms",
      slower: "500ms"
    },
    easings: {
      standard: "cubic-bezier(0.2, 0, 0, 1)",
      standardDecelerate: "cubic-bezier(0, 0, 0, 1)",
      standardAccelerate: "cubic-bezier(0.3, 0, 1, 1)",
      emphasized: "cubic-bezier(0.2, 0, 0, 1)",
      emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1)",
      emphasizedAccelerate: "cubic-bezier(0.3, 0, 0.8, 0.15)"
    },
    style: "expressive"
  }
};

// src/languages/transform.ts
function transformToPandaTheme(language) {
  return {
    tokens: transformTokens(language),
    semanticTokens: transformSemanticTokens(language),
    textStyles: transformTextStyles(language)
  };
}
function transformTokens(language) {
  return {
    colors: transformColorPalettes(language.colors),
    fonts: {
      display: { value: language.typography.fonts.display },
      body: { value: language.typography.fonts.body },
      mono: { value: language.typography.fonts.mono }
    },
    fontSizes: extractFontSizes(language.typography.scale),
    lineHeights: extractLineHeights(language.typography.scale),
    fontWeights: extractFontWeights(language.typography.scale),
    letterSpacings: extractLetterSpacings(language.typography.scale),
    spacing: objectToTokens(language.spacing),
    radii: objectToTokens(language.shape.radii),
    shadows: objectToTokens(language.elevation.levels),
    durations: objectToTokens(language.motion.durations),
    easings: objectToTokens(language.motion.easings)
  };
}
function transformSemanticTokens(language) {
  const light = language.semantic;
  const dark = language.semanticDark || light;
  return {
    colors: Object.fromEntries(
      Object.entries(light).map(([key, lightValue]) => [
        key,
        {
          value: {
            base: lightValue,
            _dark: dark[key] || lightValue
          }
        }
      ])
    )
  };
}
function transformTextStyles(language) {
  const scale = language.typography.scale;
  return Object.fromEntries(
    Object.entries(scale).map(([name, style]) => [
      name,
      {
        value: {
          fontFamily: style.fontFamily || "body",
          fontSize: style.fontSize,
          lineHeight: style.lineHeight,
          fontWeight: style.fontWeight,
          letterSpacing: style.letterSpacing
        }
      }
    ])
  );
}
function transformColorPalettes(palettes) {
  return Object.fromEntries(
    Object.entries(palettes).map(([name, palette]) => [
      name,
      Object.fromEntries(
        Object.entries(palette).map(([tone, value]) => [
          tone,
          { value }
        ])
      )
    ])
  );
}
function objectToTokens(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, { value }])
  );
}
function extractFontSizes(scale) {
  return Object.fromEntries(
    Object.entries(scale).map(([name, style]) => [
      name,
      { value: style.fontSize }
    ])
  );
}
function extractLineHeights(scale) {
  return Object.fromEntries(
    Object.entries(scale).map(([name, style]) => [
      name,
      { value: style.lineHeight }
    ])
  );
}
function extractFontWeights(scale) {
  const weights = /* @__PURE__ */ new Map();
  Object.values(scale).forEach((style) => {
    weights.set(style.fontWeight, style.fontWeight);
  });
  return Object.fromEntries(
    Array.from(weights.entries()).map(([key, value]) => [
      key,
      { value }
    ])
  );
}
function extractLetterSpacings(scale) {
  return Object.fromEntries(
    Object.entries(scale).map(([name, style]) => [
      name,
      { value: style.letterSpacing }
    ])
  );
}

exports.Button = Button;
exports.Card = Card;
exports.Dialog = Dialog;
exports.IconButton = IconButton;
exports.Input = Input;
exports.Switch = Switch;
exports.activeLanguage = material3Language;
exports.buttonRecipe = buttonRecipe;
exports.cardRecipe = cardRecipe;
exports.cn = cn;
exports.dialogRecipe = dialogRecipe;
exports.iconButtonRecipe = iconButtonRecipe;
exports.inputRecipe = inputRecipe;
exports.switchRecipe = switchRecipe;
exports.transformToPandaTheme = transformToPandaTheme;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map
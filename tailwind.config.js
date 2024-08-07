const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  purge: {
    options: {
      safelist: ["status-Planned", "status-In-Progress", "status-Live"],
    },
  },
  theme: {
    extend: {
      screens: {
        tablet: "640px",
        desktop: "1025px",
      },
      colors: {
        "electro-violet": "#AD1FEA",
        "royal-blue": "#4661E6",
        rhino: "#373F68",
        white: "#FFFFFF",
        zircon: "#F2F4FE",
        "link-water": "#F7F8FD",
        "east-bay": "#3A4374",
        lynch: "#647196",
        tacao: "#F49F85",
        malibu: "#62BCFA",
        red: "#D73737",
      },
    },
    heading: {
      xl: {
        mobile: {
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: -0.25,
        },
        tablet: {
          fontSize: 24,
          letterSpacing: -0.33,
        },
      },
      lg: {
        mobile: {
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: -0.19,
        },
        tablet: {
          fontSize: 20,
          letterSpacing: -0.25,
        },
      },
      md: {
        mobile: {
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: -0.18,
        },
        tablet: {
          fontSize: 18,
          letterSpacing: -0.25,
        },
      },
      sm: {
        mobile: {
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: -0.18,
        },
        tablet: {
          fontSize: 14,
          letterSpacing: -0.19,
        },
      },
    },
    body: {
      lg: {
        mobile: {
          fontSize: 13,
          fontWeight: 400,
        },
        tablet: {
          fontSize: 16,
        },
      },
      md: {
        mobile: {
          fontSize: 13,
          fontWeight: 400,
        },
        tablet: {
          fontSize: 15,
        },
      },
      sm: {
        mobile: {
          fontSize: 13,
          fontWeight: 400,
        },
        tablet: {
          fontSize: 14,
        },
      },
      xs: {
        mobile: {
          fontSize: 13,
          fontWeight: 600,
        },
        tablet: {},
      },
    },
  },
  plugins: [
    plugin(({ addBase, addUtilities, addComponents, theme }) => {
      addBase({
        body: {
          lineHeight: 1.47,
          fontSize: 14,
          fontWeight: 400,
          overflowX: "hidden",
        },
        "#root": {
          overflowX: "hidden",
        },
      });

      const custom = { heading: theme("heading"), body: theme("body") };
      const tabletKey = "@screen tablet";
      let utilities = {
        ".status-Planned": {
          "--status-color": theme("colors.tacao"),
        },
        ".status-In-Progress": {
          "--status-color": theme("colors.electro-violet"),
        },
        ".status-Live": {
          "--status-color": theme("colors.malibu"),
        },
        [tabletKey]: {},
      };
      Object.keys(custom).forEach((key) => {
        Object.keys(custom[key]).forEach((size) => {
          const cls = `.${key}-${size}`;
          const clsContent = custom[key][size];
          utilities = {
            [cls]: clsContent.mobile,
            [cls + "-mobile"]: clsContent.mobile,
            [cls + "-tablet"]: { ...clsContent.mobile, ...clsContent.tablet },
            ...utilities,
          };
          utilities[tabletKey][cls] = clsContent.tablet;
        });
      });
      addUtilities(utilities);

      const colors = theme("colors");
      const buttonColorClses = {};
      Object.keys(colors).forEach((key) => {
        const colorHex = colors[key];
        buttonColorClses[`.btn-${key}`] = {
          backgroundColor: colorHex,
          "&:hover": {
            backgroundColor: `color(${colorHex} a(65%))`,
          },
        };
      });
      addComponents({
        ".skeleton": {
          position: "relative",
          backgroundColor: "theme(colors.white) !important",
          overflow: "hidden",
          "&::after": {
            content: "''",
            position: "absolute",
            top: "0",
            right: "0",
            height: "100%",
            width: "200%",
            background:
              "linear-gradient(to right, #00000000 0%, color(theme(colors.zircon) shade(3%)) 20%, #00000000 50%, color(theme(colors.zircon) shade(3%)) 80%, #00000000 100%)",
          },
        },
        ".badge, .upvote": {
          height: "max-content",
          padding: "5.5px 16.5px 5.5px 16.5px",
          backgroundColor: theme("colors.zircon"),
          borderRadius: 10,
          color: theme("colors.royal-blue"),
          width: "max-content",
          fontSize: 13,
          fontWeight: 600,
        },
        ".upvote": {
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: theme("heading.sm.mobile.letterSpacing"),
          display: "flex",
          alignItems: "center",
          padding: "6px 13px 7px 16px",
          transition: "background-color 0.3s",
          gap: 10,
          color: theme("colors.rhino"),
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "color(theme(colors.zircon) lightness(90%))",
          },
          "&.upvoted": {
            backgroundColor: theme("colors.royal-blue"),
            "& > span": {
              color: "theme(colors.white) !important",
            },
          },
          "&Arrow": {
            color: theme("colors.royal-blue"),
          },
          "&Count": {
            color: theme("colors.east-bay"),
          },
        },
        ".formInput": {
          display: "block",
          backgroundColor: theme("colors.link-water"),
          ...utilities[".body-md"],
          padding: "14px 16px 15px 16px",
          width: "100%",
          borderRadius: 5,
          transition: "box-shadow 0.2s",
          "&:focus-within": {
            boxShadow: "inset 0 0 0 1px theme(colors.royal-blue)",
            outline: 0,
          },
          "textarea&": {
            padding: "16px 23px",
            resize: "none",
          },
          "select&": {
            appearance: "none",
          },
          "&.error": {
            boxShadow: "inset 0 0 0 1px theme(colors.red) !important",
          },
        },
        ".btn-noback, .btn": {
          display: "flex",
          alignItems: "center",
          fontSize: custom.heading.sm.mobile.fontSize,
          fontWeight: custom.heading.sm.mobile.fontWeight,
          cursor: "pointer",
        },
        ".btn-noback": {
          position: "relative",
          width: "max-content",
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: "100%",
            width: "100%",
            height: 1,
            backgroundColor: "currentColor",
            transform: "scaleX(0)",
            transition: "transform 0.3s",
          },
          "&:hover::before": {
            transform: "none",
          },
        },
        ".btn": {
          height: 40,
          justifyContent: "center",
          borderRadius: 10,
          color: theme("colors.zircon"),
          transition: "background-color 0.3s",
        },
        ...buttonColorClses,
        "@screen tablet": {
          ".upvoteResponsive": {
            width: 40,
            padding: "14px 0 8px 0",
            flexDirection: "column",
            gap: 8,
          },
          ".formInput": {
            ...utilities["@screen tablet"][".body-md"],
            padding: "13px 24px",
            "textarea&": {
              padding: "16px 25px 16px 24px",
            },
          },
          ".btn, .btn-noback": {
            fontSize: custom.heading.sm.tablet.fontSize,
          },
          ".btn": {
            height: 44,
          },
        },
      });
    }),
  ],
};

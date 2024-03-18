const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
          overflowX: 'hidden',
        },
        "#root": {
          overflowX: 'hidden',
        }
      });

      const custom = { heading: theme("heading"), body: theme("body") };
      const tabletKey = "@screen tablet";
      let utilities = { [tabletKey]: {} };
      Object.keys(custom).forEach((key) => {
        Object.keys(custom[key]).forEach((size) => {
          const cls = `.${key}-${size}`;
          const clsContent = custom[key][size];
          utilities = {
            [cls]: clsContent.mobile,
            [cls + "-mobile"]: clsContent.mobile,
            [cls + "-tablet"]: {...clsContent.mobile, ...clsContent.tablet},
            ...utilities,
          };
          utilities[tabletKey][cls] = clsContent.tablet;
        });
      });
      addUtilities(utilities);

      const colors = theme('colors');
      const buttonColorClses = {};
      Object.keys(colors).forEach((key) => {
        const colorHex = colors[key];
        buttonColorClses[`.btn-${key}`] = {
          backgroundColor: colorHex,
          '&:hover': {
            backgroundColor: `color(${colorHex} lightness(60%))`,
          }
        };
      })
      addComponents({
        ".btn": {
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          fontSize: custom.heading.sm.mobile.fontSize,
          fontWeight: custom.heading.sm.mobile.fontWeight,
          color: theme('colors.zircon'),
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        },
        ...buttonColorClses,
        "@screen tablet": {
          ".btn": {
            height: 44,
            fontSize: custom.heading.sm.tablet.fontSize,
          },
        },
      });
    }),
  ],
};

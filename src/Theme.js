import { createTheme } from "@mui/material";

export const colors = {
  primary: {
    50: "#f0f3f8", //light
    100: "#e9ecf4", //light:hover
    200: "#d1d8e9", //light:active
    300: "#6982b7", //normal
    400: "#5f75a5", //normal:hover
    500: "#546892", //normal:active
    600: "#4f6289", //dark
    700: "#4B5C82", //dark:hover
    800: "#2f3a52", //dark:active
    900: "#252e40", //darker
  },
  secondary: {
    main: "#8fbc94",
    50: "#f4f8f4",
    100: "#dceade",
    200: "#cbe0ce",
    300: "#b4d2b7",
    400: "#a5c9a9",
    500: "#8fbc94",
    600: "#82ab87",
    700: "#668569",
    800: "#4f6751",
    900: "#3c4f3e",
  },
  tritary: {
    50: "#fff5ec",
    100: "#fde1c4",
    200: "#fdd3a8",
    300: "#fcbf80",
    400: "#fbb268",
    500: "#fa9f42",
    600: "#e4913c",
    700: "#b2712f",
    800: "#8a5724",
    900: "#69431c",
  },
  text: {
    10: "#ffffff",
    50: "#e6e6e7",
    100: "#b2b2b3",
    200: "#8c8d8f",
    300: "#58595c",
    400: "#37393c",
    500: "#05070b",
    600: "#05060a",
    700: "#040508",
    800: "#030406",
    900: "#020305",
    1000: "#000000",
  },
};

// alpha(colors.primary[300], 0.8) for opcity

const theme = createTheme({
  palette: {
    contrastText: "#fff",
    light: "#f0f3f8",
    primary: {
      main: colors.primary[300],
      50: colors.primary[50],
      700: colors.primary[700],
    },
    secondary: {
      main: colors.secondary[500],
      50: colors.secondary[50],
      100: colors.secondary[100],
      200: colors.secondary[200],
    },
    tritary: {
      main: colors.tritary[500],
      50: colors.tritary[50],
      100: colors.tritary[100],
    },
    text: {
      light: colors.text[10],
      main: colors.text[500],
      10: colors.text[10],
      50: colors.text[50],
      100: colors.text[100],
      200: colors.text[200],
      dark: colors.text[1000],
    },
    background: { default: "#f0f3f8" },
    error: { main: "#EE3911" },
  },

  typography: {
    allVariants: {
      fontFamily: "Roboto, sans-serif",
    },
    button: {
      textTransform: "none",
    },
  },
});

export default theme;

// import { createContext, useState, useMemo } from "react";
// import { createTheme } from "@mui/material/styles";

// color design tokens export
// export const tokens = (mode = "light") => ({
//   ...(mode === "dark"
//     ? {
//         grey: {
//           100: "#e0e0e0",
//           200: "#c2c2c2",
//           300: "#a3a3a3",
//           400: "#858585",
//           500: "#666666",
//           600: "#525252",
//           700: "#3d3d3d",
//           800: "#292929",
//           900: "#141414",
//         },
//         primary: {
//           100: "#d0d1d5",
//           200: "#a1a4ab",
//           300: "#727681",
//           400: "#1F2A40",
//           500: "#141b2d",
//           600: "#101624",
//           700: "#0c101b",
//           800: "#080b12",
//           900: "#040509",
//         },
//         greenAccent: {
//           100: "#dbf5ee",
//           200: "#b7ebde",
//           300: "#94e2cd",
//           400: "#70d8bd",
//           500: "#4cceac",
//           600: "#3da58a",
//           700: "#2e7c67",
//           800: "#1e5245",
//           900: "#0f2922",
//         },
//         redAccent: {
//           100: "#f8dcdb",
//           200: "#f1b9b7",
//           300: "#e99592",
//           400: "#e2726e",
//           500: "#db4f4a",
//           600: "#af3f3b",
//           700: "#832f2c",
//           800: "#58201e",
//           900: "#2c100f",
//         },
//         blueAccent: {
//           100: "#e1e2fe",
//           200: "#c3c6fd",
//           300: "#a4a9fc",
//           400: "#868dfb",
//           500: "#6870fa",
//           600: "#535ac8",
//           700: "#3e4396",
//           800: "#2a2d64",
//           900: "#151632",
//         },
//       }
//     : {
//         // grey: {
//         //   100: "#141414",
//         //   200: "#292929",
//         //   300: "#3d3d3d",
//         //   400: "#525252",
//         //   500: "#666666",
//         //   600: "#858585",
//         //   700: "#a3a3a3",
//         //   800: "#c2c2c2",
//         //   900: "#e0e0e0",
//         // },
//         primary: {
//           100: "#f0f3f8", //light
//           200: "#e9ecf4", //light:hover
//           300: "#d1d8e9", //light:active
//           400: "#6982b7", //normal
//           500: "#5f75a5", //normal:hover
//           600: "#546892", //normal:active
//           700: "#4f6289", //dark
//           800: "#3f4e6e", //dark:hover
//           900: "#2f3a52", //dark:active
//           950: "#252e40", //darker
//         },
//         Secondry: {
//           50: "#f4f8f4",
//           100: "#dceade",
//           200: "#cbe0ce",
//           300: "#b4d2b7",
//           400: "#a5c9a9",
//           500: "#8fbc94",
//           600: "#82ab87",
//           700: "#668569",
//           800: "#4f6751",
//           900: "#3c4f3e",
//         },
//         Tritary: {
//           50: "#fff5ec",
//           100: "#fde1c4",
//           200: "#fdd3a8",
//           300: "#fcbf80",
//           400: "#fbb268",
//           500: "#fa9f42",
//           600: "#e4913c",
//           700: "#b2712f",
//           800: "#8a5724",
//           900: "#69431c",
//         },
//         Text_color: {
//           50: "#e6e6e7",
//           100: "#b2b2b3",
//           200: "#8c8d8f",
//           300: "#58595c",
//           400: "#37393c",
//           500: "#05070b",
//           600: "#05060a",
//           700: "#040508",
//           800: "#030406",
//           900: "#020305",
//         },
//         // greenAccent: {
//         //   100: "#0f2922",
//         //   200: "#1e5245",
//         //   300: "#2e7c67",
//         //   400: "#3da58a",
//         //   500: "#4cceac",
//         //   600: "#70d8bd",
//         //   700: "#94e2cd",
//         //   800: "#b7ebde",
//         //   900: "#dbf5ee",
//         // },
//         // redAccent: {
//         //   100: "#2c100f",
//         //   200: "#58201e",
//         //   300: "#832f2c",
//         //   400: "#af3f3b",
//         //   500: "#db4f4a",
//         //   600: "#e2726e",
//         //   700: "#e99592",
//         //   800: "#f1b9b7",
//         //   900: "#f8dcdb",
//         // },
//         // blueAccent: {
//         //   100: "#151632",
//         //   200: "#2a2d64",
//         //   300: "#3e4396",
//         //   400: "#535ac8",
//         //   500: "#6870fa",
//         //   600: "#868dfb",
//         //   700: "#a4a9fc",
//         //   800: "#c3c6fd",
//         //   900: "#e1e2fe",
//         // },
//       }),
// });

// // mui theme settings
// export const themeSettings = (mode) => {
//   const colors = tokens(mode);
//   return {
//     palette: {
//       mode: mode,
//       ...(mode === "dark"
//         ? {
//             // palette values for dark mode
//             primary: {
//               main: colors.primary[500],
//             },
//             secondary: {
//               main: colors.greenAccent[500],
//             },
//             neutral: {
//               dark: colors.grey[700],
//               main: colors.grey[500],
//               light: colors.grey[100],
//             },
//             background: {
//               default: colors.primary[500],
//             },
//           }
//         : {
//             // palette values for light mode
//             primary: {
//               main: colors.primary[100],
//             },
//             secondary: {
//               main: colors.greenAccent[500],
//             },
//             neutral: {
//               dark: colors.grey[700],
//               main: colors.grey[500],
//               light: colors.grey[100],
//             },
//             background: {
//               default: "#fcfcfc",
//             },
//           }),
//     },
//     typography: {
//       fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//       fontSize: 12,
//       h1: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 40,
//       },
//       h2: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 32,
//       },
//       h3: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 24,
//       },
//       h4: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 20,
//       },
//       h5: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 16,
//       },
//       h6: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 14,
//       },
//     },
//   };
// };

// // context for color mode
// export const ColorModeContext = createContext({
//   toggleColorMode: () => {},
// });

// export const useMode = () => {
//   const [mode, setMode] = useState("dark");

//   const colorMode = useMemo(
//     () => ({
//       toggleColorMode: () =>
//         setMode((prev) => (prev === "light" ? "dark" : "light")),
//     }),
//     []
//   );

//   const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
//   return [theme, colorMode];
// };

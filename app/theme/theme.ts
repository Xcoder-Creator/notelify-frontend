import { createTheme } from "@mui/material/styles";

// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
    interface Palette {
        ochre: Palette['primary'];
    }

    interface PaletteOptions {
        ochre?: PaletteOptions['primary'];
    }
}

// Update the Button's color options to include an ochre option
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        ochre: true;
    }
}

// Update the Button's color options to include an ochre option
declare module '@mui/material/Fab' {
    interface FabPropsColorOverrides {
        ochre: true;
    }
}

const theme = createTheme({
    palette: {
        ochre: {
            main: '#523f21ff',
            light: '#523f21ff',
            dark: '#523f21ff',
            contrastText: '#523f21ff',
        }
    }
});

export default theme;
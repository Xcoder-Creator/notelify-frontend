/**
 * Interface for each theme object in the background themes array
 */
interface BgThemeProps {
    /** The theme number */
    id: number;

    /** The theme color in hex format */
    theme: string;

    /** The dark theme color in hex format */
    lightTheme: string;

    /** The name of the theme */
    name: string;
}

/** 
 * An array of available background themes for the background toolbar
 */
const backgroundThemes: Array<BgThemeProps> = [
    {
        id: 1,
        theme: '#77172e',
        lightTheme: '#faafa8',
        name: 'Coral'
    },

    {
        id: 2,
        theme: '#692b17',
        lightTheme: '#f39f76',
        name: 'Peach'
    }, 

    {
        id: 3,
        theme: '#7c4a03',
        lightTheme: '#fff8b8',
        name: 'Sand'
    },

    {
        id: 4,
        theme: '#264d3b',
        lightTheme: '#e2f6d3',
        name: 'Mint'
    },

    {
        id: 5,
        theme: '#0c625d',
        lightTheme: '#b4ddd3',
        name: 'Sage'
    },

    {
        id: 6,
        theme: '#256377',
        lightTheme: '#d4e4ed',
        name: 'Fog'
    },

    {
        id: 7,
        theme: '#284255',
        lightTheme: '#aeccdc',
        name: 'Storm'
    },

    {
        id: 8,
        theme: '#472e5b',
        lightTheme: '#d3bfdb',
        name: 'Dusk'
    },

    {
        id: 9,
        theme: '#6c394f',
        lightTheme: '#f6e2dd',
        name: 'Blossom'
    },

    {
        id: 10,
        theme: '#4b443a',
        lightTheme: '#e9e3d4',
        name: 'Clay'
    },

    {
        id: 11,
        theme: '#232427',
        lightTheme: '#efeff1',
        name: 'Chalk'
    }
]

export default backgroundThemes;
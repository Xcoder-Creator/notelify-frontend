/**
 * Interface for each wallpaper object in the wallpapers array
 */
interface WallpaperProps {
    /** The wallpaper number */
    id: number;

    /** The url for the wallpaper in dark mode */
    dark_url: string;

    /** The url for the wallpaper in light mode */
    light_url: string;

    /** The large background wallpaper in dark mode to be applied to the note editor and title input div container */
    background_dark_url: string;
    
    /** The large background wallpaper in light mode to be applied to the note editor and title input div container */
    background_light_url: string;

    /** The name of the wallpaper */
    name: string;
}

/** 
 * An array of available wallpapers for the background toolbar
 */
const wallpapers: Array<WallpaperProps> = [
    {
        id: 1,
        dark_url: '/wallpapers/grocery_dark.svg',
        light_url: '/wallpapers/grocery_light.svg',
        background_dark_url: '/wallpapers/background/grocery_dark.svg',
        background_light_url: '/wallpapers/background/grocery_light.svg',
        name: 'Groceries'
    },

    {
        id: 2,
        dark_url: '/wallpapers/food_dark.svg',
        light_url: '/wallpapers/food_light.svg',
        background_dark_url: '/wallpapers/background/food_dark.svg',
        background_light_url: '/wallpapers/background/food_light.svg',
        name: 'Food'
    },

    {
        id: 3,
        dark_url: '/wallpapers/music_dark.svg',
        light_url: '/wallpapers/music_light.svg',
        background_dark_url: '/wallpapers/background/music_dark.svg',
        background_light_url: '/wallpapers/background/music_light.svg',
        name: 'Music'
    },

    {
        id: 4,
        dark_url: '/wallpapers/recipe_dark.svg',
        light_url: '/wallpapers/recipe_light.svg',
        background_dark_url: '/wallpapers/background/recipe_dark.svg',
        background_light_url: '/wallpapers/background/recipe_light.svg',
        name: 'Recipes'
    },

    {
        id: 5,
        dark_url: '/wallpapers/notes_dark.svg',
        light_url: '/wallpapers/notes_light.svg',
        background_dark_url: '/wallpapers/background/notes_dark.svg',
        background_light_url: '/wallpapers/background/notes_light.svg',
        name: 'Notes'
    },

    {
        id: 6,
        dark_url: '/wallpapers/places_dark.svg',
        light_url: '/wallpapers/places_light.svg',
        background_dark_url: '/wallpapers/background/places_dark.svg',
        background_light_url: '/wallpapers/background/places_light.svg',
        name: 'Places'
    },

    {
        id: 7,
        dark_url: '/wallpapers/travel_dark.svg',
        light_url: '/wallpapers/travel_light.svg',
        background_dark_url: '/wallpapers/background/travel_dark.svg',
        background_light_url: '/wallpapers/background/travel_light.svg',
        name: 'Travel'
    },

    {
        id: 8,
        dark_url: '/wallpapers/video_dark.svg',
        light_url: '/wallpapers/video_light.svg',
        background_dark_url: '/wallpapers/background/video_dark.svg',
        background_light_url: '/wallpapers/background/video_light.svg',
        name: 'Video'
    },

    {
        id: 9,
        dark_url: '/wallpapers/celebration_dark.svg',
        light_url: '/wallpapers/celebration_light.svg',
        background_dark_url: '/wallpapers/background/celebration_dark.svg',
        background_light_url: '/wallpapers/background/celebration_light.svg',
        name: 'Celebration'
    }
]

export default wallpapers;
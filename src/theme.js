import {createMuiTheme} from '@material-ui/core/styles';

export const base = createMuiTheme({
    typography: {
        // Use the system font.
        useNextVariants: true,
        fontFamily: '"Roboto,"Helvetica Neue",Arial,sans-serif',
    },
    palette: {
        primary: {
            main: '#2d343a',
            contrastText: 'white',
        },
        secondary: {
            main: '#3d996e',
            contrastText: 'white',
        }
    }
});
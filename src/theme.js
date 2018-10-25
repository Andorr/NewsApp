import {createMuiTheme} from '@material-ui/core/styles';

export const base = createMuiTheme({
    typography: {
        // Use the system font.
        fontFamily: '"Roboto,"Helvetica Neue",Arial,sans-serif',
    },
    palette: {
        primary: {
            main: '#2d343a',
            contrastText: 'white',
        },
    }
});
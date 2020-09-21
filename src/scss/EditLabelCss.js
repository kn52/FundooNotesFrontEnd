import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
      },
      root: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        border: 'none',
        boxShadow: 'none',
        },
    
        paper: {
            border: 'none',
            boxShadow: 'none',
            marginBottom: theme.spacing(0.5),
            marginTop: theme.spacing(0.5),
        },
    
        paper2: {
            border: 'none',
            boxShadow: 'none',
            marginBottom: theme.spacing(0),
            marginTop: theme.spacing(0),
        },
    
        button: {
            marginLeft: theme.spacing(25)
        },
    
        iconButton: {
            height: '25px',
            width: '40px',
            paddingTop: 3
        },
}));

export default useStyles;
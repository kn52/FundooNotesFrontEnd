export const TOGGLE_DRAWER_OPEN = 'TOGGLE_DRAWER_OPEN';
export const TOGGLE_DRAWER_CLOSE = 'TOGGLE_DRAWER_CLOSE';

export const toggleDrawerOpen = () => {
    return {
        type: TOGGLE_DRAWER_OPEN,
    }
}

export const toggleDrawerClose = () => {
    return {
        type: TOGGLE_DRAWER_CLOSE,
    }
}
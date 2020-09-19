export const TOGGLE_DRAWER_OPEN = 'TOGGLE_DRAWER_OPEN';
export const TOGGLE_DRAWER_CLOSE = 'TOGGLE_DRAWER_CLOSE';
export const TOGGLE_HOVER_OPEN = 'TOGGLE_HOVER_OPEN';
export const TOGGLE_HOVER_CLOSE = 'TOGGLE_HOVER_CLOSE';

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

export const toggleHoverOpen = () => {
    return {
        type: TOGGLE_HOVER_OPEN,
    }
}

export const toggleHoverClose = () => {
    return {
        type: TOGGLE_HOVER_CLOSE,
    }
}
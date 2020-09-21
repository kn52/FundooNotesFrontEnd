export const CALL = 'CALL';
export const NO_CALL = 'NO_CALL';

export const callToApi = (name) => {
    return {
        type: CALL,
        payload:name
    }
}

export const NoCallToApi = (name) => {
    return {
        type: NO_CALL,
        payload:name
    }
}
export const CURRENT_LABEL_PAGE = 'CURRENT_LABEL_PAGE';

export default function setLabelPage(labelId) {
    return {
        type: CURRENT_LABEL_PAGE,
        payload: labelId
    }
}
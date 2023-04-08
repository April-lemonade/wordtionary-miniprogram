const props = {
    content: {
        type: String,
    },
    style: {
        type: String,
        value: '',
    },
    disabled: {
        type: Boolean,
        value: undefined,
    },
    expandIcon: {
        type: Boolean,
        value: undefined,
    },
    externalClasses: {
        type: Array,
    },
    header: {
        type: String,
    },
    headerRightContent: {
        type: String,
    },
    placement: {
        type: String,
        value: 'bottom',
    },
    value: {
        type: null,
    },
};
export default props;

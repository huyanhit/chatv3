import uiProps from './uiProps';
const props = {... uiProps, ... {
    modelValue: {
        type: String,
    },
    placeholder: {
        type: String,
    },
    label: {
        type: String,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    icon: {
        type: String,
    },
    rules: {
        type: Object,
        require: false
    },
}
}

export default props;
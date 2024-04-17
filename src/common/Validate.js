import { createI18n } from 'vue-i18n';

import viMessage from '@/lang/vi.json';
import enMessage from '@/lang/en.json';
import jpMessage from '@/lang/jp.json';

const I18n = new createI18n({
    locale: 'Vietnamese',
    messages: {
        Vietnamese: viMessage,
        English: enMessage,
        Japanese: jpMessage,
    },
});

const t = function(val, arg){
    return I18n.global.t(val, arg);
}

const validate = {
    email: (v) => /.+@.+\..+/.test(v) || t('validate.email'),
    max: (v, dataRule) => v.length <= dataRule || t('validate.max', { msg: dataRule }),
    min: (v, dataRule) => v.length >= dataRule || t('validate.min', { msg: dataRule }),
    required: (v) => !!v || t('validate.required'),
}

export default validate;


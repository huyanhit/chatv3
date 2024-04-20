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

const functions = {
    email: function(v, dataRule) {
        if (v) {
            const re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(v).toLowerCase()) || t('validate.email');
        }
    },
    max: function (v, dataRule) {
        return v.length <= dataRule || t('validate.max', { msg: dataRule });
    },
    min: function (v, dataRule) {
        return v.length >= dataRule || t('validate.min', { msg: dataRule });
    },
    required: (v) => !!v || t('validate.required'),
}

export default function(items){
    let errors = '';
    const value = items.props.modelValue;
    const rules = items.props.rules;
    for (let index in rules){
        let error = null;
        const rule = rules[index].split(':');
        if(typeof(rule) === 'function'){
            error = rule();
        }else{
            error = functions[rule[0]](value, rule[1]);
        }
        if(error && error !== true) {
            errors += error + ' ';
        }
    }

    return errors;
}


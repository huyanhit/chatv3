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
    required: function (v) {
        return !!v || t('validate.required');
    },
    validateCustom: function (v, dataRule) {
        for (const func of dataRule) {
            if (typeof func === 'function') {
                func();
            }
        }
    }
}

export default function(value, rules){
    let errors = '';
    for(let index in rules){
        if(typeof(rules[index]) === 'function'){
            return rules[index]();
        }else{
            let error = functions[index](value, rules[index])
            if(error && error !== true){
                errors += error + ' ';
                break;
            }
        }
    }

    return errors;
}


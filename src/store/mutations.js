import _ from 'lodash';
export default {
    push_list(state, obj) {
        for(let index in obj){
            for(let key in obj[index]){
                if(state[index][key] !== undefined){
                    state[index][key] = _.union(state[index][key], obj[index][key]);
                }
            }
        }
    },
    remove_list(state, obj) {
        for(let index in obj){
            for(let key in obj[index]){
                state[index][key] = state[index][key].concat(obj[index][key]);
            }
        }
    },
    sync_data(state, obj) {
        for(let index in obj){
            state[index] = _.mergeWith(state[index], obj[index], (a, b) => _.isArray(b) ? b : undefined);
            state[index] = _.omitBy(state[index], v => v === null);
        }
    },
    update_raw(state, obj) {
        state['CURRENT_RAWS'] = _.mergeWith(state['CURRENT_RAWS'], obj);
    },
};

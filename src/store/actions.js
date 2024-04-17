export default {
    sync_data({ commit }, obj) {
        commit('sync_data', obj);
    },
    push_list({ commit }, obj) {
        commit('push_list', obj);
    },
    remove_list({ commit }, obj) {
        commit('remove_list', obj);
    },
    update_raw({ commit }, obj) {
        commit('update_raw', obj);
    },
};

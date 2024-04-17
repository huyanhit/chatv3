import { createStore } from 'vuex'
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default new createStore({
    state: {
        CURRENT_ROOM:{},
        CURRENT_USER:{},
        CURRENT_GROUP:{},
        COMPANY:{
            1:{name:'Lampart Co., Ltd'},
            2:{name:'Wakka Inc JP'}
        },
        MY_NAVIGATOR:{},
        NAVIGATOR: {},
        MY_USER:{},
        USER:{},
        MY_GROUP: {},
        GROUP:{},
        MY_ROOM:{},
        ROOM:{},
        ROOM_MESSAGE:{},
        MESSAGE:{},
        ROOM_MEMBER:{},
        MEMBER:{},
        MESSAGE_REACTION:{},
        REACTION:{},
        ICON:{},
        EMOIJ:{},
        MTO:{},
        MY_FILE:{},
        ROOM_FILE:{},
        FILE:{},
        MESSAGE_LABEL:{},
        LABEL:{},
        CONTACT_FRIEND:{},
        CONTACT_REQUESTED:{ },
        CONTACT_COMING:{},
        CONTACT_FRIEND_INFO:{},
        ROOM_THREAD:{},
        THREAD:{},
        THREAD_MESSAGE:{},
        THREAD_REACTION:{},
        THREAD_FILES:{},
        TASK:{},
    },
    getters,
    mutations,
    actions,
})
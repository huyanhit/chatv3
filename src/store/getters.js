const mapObject = (list, object, key, map = null) => {
    if(list[key]){
        let data = list[key].map(id => {
            let assign = object[id]? object[id]: object[key + '_' + id];
            if(assign){
                if(map === null){
                    return Object.assign(assign, {id: id});
                }else{
                    return Object.assign(assign, map[id]);
                }
            }
        });
      
        return data.filter(filter => filter !== undefined);
    }

    return null;
}

export default {
    currentRoom: (state) => {
        return state.ROOM[state.CURRENT_ROOM.id];
    },
    currentUser: (state) => {
        return state.USER[state.CURRENT_USER.id];
    },
    currentMember: (state) => {
        return state.MEMBER[state.CURRENT_ROOM.id + '_' + state.CURRENT_USER.id];
    },
    members: (state) => {
        return mapObject(state.ROOM_MEMBER, state.USER, state.CURRENT_ROOM.id, state.MEMBER);
    },
    users: (state) =>  {
        return mapObject(state.MY_USER, state.USER, state.CURRENT_USER.id);
    },
    rooms: (state) => {
        return mapObject(state.MY_ROOM, state.ROOM, state.CURRENT_USER.id);
    },
    messages: (state) => {
        return mapObject(state.ROOM_MESSAGE, state.MESSAGE, state.CURRENT_ROOM.id);
    },
    navigators: (state)=>{
        return mapObject(state.MY_NAVIGATOR, state.NAVIGATOR, state.CURRENT_USER.id);
    },
    getKey:(state) => (key) =>{
        return state[key];
    }
};

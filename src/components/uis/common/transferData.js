import { provide, inject, onMounted, getCurrentInstance } from 'vue'
export default {
    setupProvide : function(inj, items){
        provide(inj, items);
    },
    setupInject : function(inj){
        const items = inject(inj, null);
        onMounted(() => {
            if(items){
                items.value.push(getCurrentInstance());
            }
        })
    },
    setupEvents : function(events, emit){
        for (const index in events) {
            let name = events[index];
            events[index] = (e) =>{
                emit(name, e)
            }
        }
    }
}
<template>
    <div class="message-icon">
        <div :id="'msg-reply-thread' + this._uid" class="btn-custom btn-custom-avatar">
            <message-icon reply :user-id="user_id" :msg-id="msg_id" v-b-tooltip.hover
                :title="$t('home.message_reply_icon.view_original')" />
        </div>

        <UserAvatar :width="18" :height="18" :user_id="user_id" style="margin:0 4px 0 4px" />
        <b-popover triggers="click blur" placement="top" :target="'msg-reply-thread' + this._uid"
            custom-class="user-avatar-popover-thread-reply" @shown="onShowPopover" @hidden="onHidden"
            v-if="hiddenReply === undefined">
            <b-container>
                <b-row>
                    <b-col class="msg-reply-content pt-2 pb-2" :id="'msg-reply-thread-content' + this._uid">
                        <div class="text-center">{{ $t('home.message_reply_icon.loading') }}</div>
                    </b-col>
                </b-row>
            </b-container>
            <b-container class="user-avatar-popover-footer">
                <b-row class="justify-content-center">
                    <div class="goto-message">
                        <input type="text" ref="replyfocus" class="reply-focus" />
                        <b-btn size="sm" @click="gotoMessage">{{ $t('home.message_reply_icon.go_message') }}</b-btn>
                    </div>
                </b-row>
            </b-container>
        </b-popover>
    </div>
</template>

<script>

import UserAvatar from '../../UserAvatar';
import { mapState } from 'vuex';
import MessageIcon from './MessageIcon.vue';

export default {
    name: 'ThreadReplyIcon',
    props: ['user_id', 'msg_id', 'hiddenReply'],
    components: {
        UserAvatar,
        MessageIcon
    },
    computed: {
        ...mapState(['current_room', 'sync_list_thread_message', 'sync_current_room'])
    },
    data() {
        return {
            id: this._uid
        };
    },
    methods: {
        onShowPopover() {
            this.$refs.replyfocus.focus();
            let element = document.getElementById('thread-message_element-' + this.msg_id);
            let popup = document.getElementById('msg-reply-thread-content' + this._uid);
            if (element !== null) {
                popup.innerHTML = element.innerHTML;
            } else {
                this.$eventManagement.$on(this.$appSetting.Event.MESSAGE.UPDATE_REPLY_THREAD_SUCCESS, status => {
                    if (status) {
                        this.$nextTick(function () {
                            let element = document.getElementById('reply_thread_render_popup');
                            let popup = document.getElementById('msg-reply-thread-content' + this._uid);
                            if (element !== null && popup !== null) {
                                popup.innerHTML = element.innerHTML;
                            }
                        });
                    } else {
                        this.$bvModal.msgBoxOk('Message ID does not exist',
                            {
                                buttonSize: 'sm',
                                centered: true,
                                size: 'sm'
                            }
                        );
                    }
                });
                let param = {
                    position: this.msg_id,
                    option: 3,
                };
                this.$eventManagement.$emit(this.$appSetting.Event.THREAD.GET_MESSAGE_THREAD_CHAT, param);
            }
        },
        onHidden() {
            let element = document.getElementById('msg-reply-thread-content' + this._uid);
            if (element !== null) {
                element.innerHTML = '<div class="text-center">Loading ...</div>'
            }
            this.$eventManagement.$off(this.$appSetting.Event.MESSAGE.UPDATE_REPLY_SUCCESS);
        },
        gotoMessage() {
            this.$root.$emit('bv::hide::popover', 'msg-reply-thread' + this._uid);
            this.$eventManagement.$emit(this.$appSetting.Event.THREAD.SCROLL_GOTO_MESSAGE_THREAD, { thread_id: this.msg_id, scroll: true });
        }
    }
};
</script>
<style>
.user-avatar-popover-thread-reply .thread-action {
    display: none;
}
</style>
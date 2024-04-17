<script setup>
    import {mapState}       from "vuex";
    import Regex            from '@/constants/RegexConst.js';
    import EventConst       from '@/constants/EventContants';
    import MessageDynamic   from '@/components/messages/MessageDynamic.vue';
</script>

<template>
    <MessageDynamic :content="content"/>
</template>

<script>
export default {
    name: 'MessageRender',
    props: ['item'],
    computed: {
        ...mapState(['ICON','EMOIJ','CURRENT_USER']),
    },
    components: {
        MessageDynamic
    },
    data() {
        return {
            content: '',
            previewLink:  '',
        };
    },
    mounted() {
        this.event.emit(EventConst.EV_MOUNT_COMPONENT, {name: this.$options.name, time:Date.now()});
        this.formatMessage();
    },
    methods: {
        processTagCode(content, codeData) {
            if (content.match(Regex.TAG.TAG_CODE)) {
                let frontCode = content.lastIndexOf('[code]');
                let message = content.substring(frontCode);
                let endCode = message.indexOf('[/code]');
                if (frontCode !== -1 && endCode !== -1) {
                    endCode += '[/code]'.length;
                    message = message.substring(0, endCode);
                    content = content.substring(0, frontCode) + Regex.REPLACE_MESSAGE.CODE +
                        content.substring(frontCode + endCode, content.length);
                    codeData.unshift(message);
                } else {
                    content = '';
                }
                content = this.processTagCode(content, codeData);
            }

            return content
        },
        formatMessage() {
            let codeData = [];

            // Chuyển một ký tự dặt biệt sang mã hiển thị
            this.content = this.item.content.replace(/<|>|&/g, function (matches) {
                switch (matches) {
                    case '<':
                        return '&lt;';
                    case '>':
                        return '&gt;';
                    case '&':
                        return '&amp;';
                }
            });

            // Escape ký tự bind của vue
            this.content = this.content.replace(Regex.TAG.TAG_BIND_VUE_OPEN,  '&#123;&#173;&#123;&#173;');
            this.content = this.content.replace(Regex.TAG.TAG_BIND_VUE_CLOSE, '&#125;&#173;&#125;&#173;');

            if (parseInt(this.item.status) === 1 || parseInt(this.item.status) === 2) {
                // Phân tích tag code
                this.content = this.processTagCode(this.content, codeData);

                // Bắt case TO ALL
                this.content = this.content.replace(Regex.TAG.TO_ALL, Regex.HTML.TOALL);

                // Bắt case Reply
                this.content = this.processReplyMessage(this.content);

                // Bắt case TO
                this.content = this.processToMessage(this.content);

                // Gắn tag info
                this.content = this.content.replace(Regex.TAG.TAG_INFO, matchs => {
                    matchs = matchs.replace(Regex.TAG.TAG_INFO_RM_PR, '<div class="chatInfo">');
                    return matchs.replace(Regex.TAG.TAG_INFO_RM_EN, '</div><MessageCopyIcon class_name="tag-info"/>');
                });

                // Gắn tag title
                this.content = this.content.replace(Regex.TAG.TAG_TITLE, function (matchs) {
                    matchs = matchs.replace(Regex.TAG.TAG_TITLE_RM_PR, Regex.HTML.TITLE);
                    return matchs.replace(Regex.TAG.TAG_TITLE_RM_EN, '</span>');
                });

                // Gắn tag bold
                this.content = this.content.replace(Regex.TAG.TAG_BOLD, function (matchs) {
                    matchs = matchs.replace(Regex.TAG.TAG_B_RM_PR, '<b>');
                    return matchs.replace(Regex.TAG.TAG_B_RM_EN, '</b>');
                });
                
                // Xử lý preview image
                this.content = this.processFile(this.content);

                // Xử lý preview image
                this.content = this.processImage(this.content);

                // Xử lý link download file
                this.content = this.processLinkDownload(this.content);

                // Xử lý emoji
                for (let icon of this.EMOIJ[this.CURRENT_USER.id]) {
                    this.content = this.content.split('-' + this.ICON[icon].code).join('<MessageEmoji scale="ui_emoticon icon-scale-x" icon_id=' + icon + '></MessageEmoji>');
                    this.content = this.content.split('+' + this.ICON[icon].code).join('<MessageEmoji scale="ui_emoticon icon-scale-y" icon_id=' + icon + '></MessageEmoji>');
                    this.content = this.content.split(this.ICON[icon].code).join('<MessageEmoji scale="ui_emoticon" icon_id=' + icon + '></MessageEmoji>');
                }

                // xử lý thông báo hệ thống
                this.content = this.processRoomAdded(this.content);

                // xử lý tag code
                if (codeData.length > 0) {
                    for (let index in codeData) {
                        if (this.content.indexOf(Regex.REPLACE_MESSAGE.CODE) !== -1) {
                            codeData[index] = codeData[index].replace('[code]', '<div class="chatCode "><pre class="code_message_format">');
                            codeData[index] = codeData[index].replace('[/code]', '</pre><MessageCopyIcon class_name="tag-code"/></div>');
                            codeData[index] = codeData[index].replace(Regex.REPLACE_MESSAGE.CODE, Regex.REPLACE_MESSAGE.UN_CODE);
                            this.content = this.content.replace(Regex.REPLACE_MESSAGE.CODE, codeData[index]);
                        } else {
                            codeData[index] = codeData[index].replace(Regex.REPLACE_MESSAGE.CODE, Regex.REPLACE_MESSAGE.UN_CODE);
                            this.content = this.content.replace(Regex.REPLACE_MESSAGE.UN_CODE, codeData[index]);
                        }
                    }
                }

                // Gắn class và thẻ root cho dynamic
                this.content = '<pre class="content-message">' + this.content + '</pre>';

            } else if (parseInt(this.item.status) === 0) {
                this.content = '<div class="msg-deleted">Message deleted.</div>';
            } else if (parseInt(this.item.status) === 0) {
                this.content = '<div class="msg-system">' + this.content + '</div>';
            }
        },
        processTagCode(content, codeData) {
            if (content.match(Regex.TAG.TAG_CODE)) {
                let frontCode = content.lastIndexOf('[code]');
                let message = content.substring(frontCode);
                let endCode = message.indexOf('[/code]');
                if (frontCode !== -1 && endCode !== -1) {
                    endCode += '[/code]'.length;
                    message = message.substring(0, endCode);
                    content = content.substring(0, frontCode) + Regex.REPLACE_MESSAGE.CODE +
                        content.substring(frontCode + endCode, content.length);
                    codeData.unshift(message);
                } else {
                    content = '';
                }
                content = this.processTagCode(content, codeData);
            }

            return content
        },
        processToMessage(content) {
            let html = content.replace(Regex.TAG.TO, function (matchs) {
                let toId = matchs.match(Regex.TAG.TO_ID);
                let to = '<MessageToIcon :user_id="' + parseInt(toId[1]) + '"/>';
                
                return to;
            });
            return html;
        },
        processReplyMessage(content) {
            return content;
        },
        processImage(content) {
            let html = content.replace(Regex.TAG.IMG, function (matchs) {
                let image = matchs.match(Regex.TAG.IMG_ID);
                return '<MessageImage :img_id="' + parseInt(image[1]) + '"/>';
            });
            return html;
        },
        processFile(content) {
            let html = content.replace(Regex.TAG.FILE, function (matchs) {
                let file = matchs.match(Regex.TAG.FILE_ID);
                return '<MessageFile :file_id="' + parseInt(file[1]) + '"/>';
            });
            return html;
        },
        processLinkDownload(content) {
            let html = content.replace(Regex.TAG.DOWNLOAD, (matches) => {
                let downloadId = matches.match(Regex.TAG.ATTRIBUTE_ID);
                matches = matches.replace(Regex.TAG.DOWNLOAD_RM, '');
                return `<MessageFileUpload :downloadId="${downloadId[0]}"  :file_name="'${matches}'" />`;
            });
            if (html.match(Regex.TAG.DOWNLOAD)) {
                html = this.processLinkDownload(html);
            }
            return html;
        },
        processRoomAdded(content) {
            let html = content.replace(Regex.TAG.ROOM.INFO, matches => {
                let msg = '<MessageRoomInfo>{name}{type}{avatar}{description}{member_joined}{member_role}{member_delete}{member_leave}</MessageRoomInfo>';
                // check room name
                let name = matches.replace(Regex.TAG.ROOM.NAME, name => {
                    return '<div slot="name">Room name changed to: "' + name + '"</div>';
                });
                // check room type
                let type = matches.replace(Regex.TAG.ROOM.TYPE, type => {
                    return '<div slot="type">Room type changed to: "' + type + '"</div>';
                });
                // check room avatar
                let avatar = matches.replace(Regex.TAG.ROOM.AVATAR, () => {
                    return '<div slot="avatar">Room chat icon updated.</div>';
                });
                // check room description
                let desc = matches.replace(Regex.TAG.ROOM.DESC, desc => {
                    return '<div slot="description">Room description changed to: "' + desc + '"</div>'
                });
                // check member joined
                let joined = matches.replace(Regex.TAG.ROOM.MEMBER_JOINED, id => {
                    let memIds = id.match(/([0-9]+)/g);
                    if (memIds !== null) {
                        let info = '<div slot="member_joined"><div class=" member-joined">{user_avatar} <div>Joined the Room.</div></div></div>';
                        let users = '';
                        memIds.forEach(x => {
                            users += `<UserAvatar :user_id="${x}" :width="20" :height="20" :is_show_name="true"/>`;
                        });
                        return info.replace(/{user_avatar}/g, users);
                    } else return '';
                });
                // check member change role
                let role = matches.replace(Regex.TAG.ROOM.MEMBER_ROLE, id => {
                    let memIds = id.match(/([0-9]+)/g);
                    if (memIds !== null) {
                        let info = '<div slot="member_role"><div class=" member-joined"> {user_avatar} <div>Changed roles.</div></div></div>';
                        let users = '';
                        memIds.forEach(x => {
                            users += `<UserAvatar :user_id="${x}" :width="20" :height="20" :is_show_name="true"/>`;
                        });
                        return info.replace(/{user_avatar}/g, users);
                    } else return '';
                });
                // check member delete
                let deleted = matches.replace(Regex.TAG.ROOM.MEMBER_DELETED, id => {
                    let memIds = id.match(/([0-9]+)/g);
                    if (memIds !== null) {
                        let info = '<div slot="member_delete"><div class=" member-joined">{user_avatar} <div>Has been deleted.</div></div></div>';
                        let users = '';
                        memIds.forEach(x => {
                            users += `<UserAvatar :user_id="${x}" :width="20" :height="20" :is_show_name="true"/>`;
                        });
                        return info.replace(/{user_avatar}/g, users);
                    } else return '';
                });
                // check member leave
                let leaved = matches.replace(Regex.TAG.ROOM.MEMBER_LEAVE, id => {
                    let memIds = id.match(/([0-9]+)/g);
                    if (memIds !== null) {
                        let info = '<div slot="member_leave"><div class=" member-joined">{user_avatar} <div>Has left the chat.</div></div></div>';
                        let users = '';
                        memIds.forEach(x => {
                            users += `<UserAvatar :user_id="${x}" :width="20" :height="20" :is_show_name="true"/>`;
                        });
                        return info.replace(/{user_avatar}/g, users);
                    } else return '';
                });

                msg = msg.replace(/{name}/g, name);
                msg = msg.replace(/{type}/g, type);
                msg = msg.replace(/{avatar}/g, avatar);
                msg = msg.replace(/{description}/g, desc);
                msg = msg.replace(/{member_joined}/g, joined);
                msg = msg.replace(/{member_role}/g, role);
                msg = msg.replace(/{member_delete}/g, deleted);
                msg = msg.replace(/{member_leave}/g, leaved);
                msg = msg.replace(Regex.TAG.ALL_TAG, '');

                return msg;
            });

            return html;
        }
    },
    watch: {
        item: {
            handler() {
                this.formatMessage();
            },
            deep: true
        }
    }
};
</script>
<style scoped>
</style>

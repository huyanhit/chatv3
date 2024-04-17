const CONST = { 
    TAG: {
        TO_ALL: /(\[toall])/g,
        TO: /(\[to:([\d])+])/g,
        TO_ID: /to:([\d]+)/i,
        TO_ID_MULTI: /to:([\d]+)/g,

        IMG: /(\[img:([\d])+])/g,
        IMG_ID: /img:([\d]+)/i,

        FILE: /(\[file:([\d])+])/g,
        FILE_ID: /file:([\d]+)/i,
        
        REPLY: /(\[reply (mid|tid):([\d]+) to:([\d]+)( rid:([\d]+))*\])/g,

        REPLY_TO_ID: /to:([\d]+)/i,
        REPLY_TO_ID_MULTI: /to:([\d]+)/g,
        REPLY_MESSAGE_ID: /(mid|tid):([\d]+)/i,
        REPLY_ROOM_ID: /rid:([\d]+)/i,

        TAG_INFO: /(\[info\])(.|\r|\n)*(?:\[\/info\])/g,
        TAG_INFO_RM_PR: /(\[info?\w+.*?\])/g,
        TAG_INFO_RM_EN: /(\[\/info?\w+.*?\])/g,
        TAG_CODE: /(\[code\])(.|\r|\n)*(?:\[\/code\])/g,
        TAG_CODE_RM_PR: /(\[code?\w+.*?\])/g,
        TAG_CODE_RM_EN: /(\[\/code?\w+.*?\])/g,
        TAG_TITLE: /(\[title\])(.|\r|\n)*(?:\[\/title\])/g,
        TAG_TITLE_RM_PR: /(\[title?\w+.*?\])/g,
        TAG_TITLE_RM_EN: /(\[\/title?\w+.*?\])/g,
        TAG_BOLD: /(\[b\])(.|\r|\n)*(?:\[\/b\])/g,
        TAG_B_RM_PR: /(\[b\])/g,
        TAG_B_RM_EN: /(\[\/b?\])/g,

        QUOTE_CONTENT_START: /(\[quote uid:([\d]+) time:([\d]+)\])/g,
        QUOTE_CONTENT_END: /(\[\/quote\])/g,

        PREVIEW_PARAMATE: /(?=\[preview id:([0-9]+) ht:([0-9]+) size:([0-9]+) type:([a-z]+)\])/i,

        QUOTE_TAG_USER_ID: /([0-9]+){1}(?=( time))/i,
        QUOTE_TAG_TIME: /([0-9]+){2}(?=[\]])/i,

        LINK: /(https?):\/\/[^\s$.?#].[^\s\"\'\[\(\{]*/gm,
        ALL_TAG: /(\[\/?\w+)(.*?\])/g,
        PREVIEW: /(\[preview id:([0-9]+) ht:([0-9]+) size:([0-9]+) type:([a-zA-Z]+)\])/g,

        ATTRIBUTE_ID: /[0-9]+(?=\])/i,
        ATTRIBUTE_SIZE: /[0-9]+(?=\])/i,
        ATTRIBUTE_TYPE: /(jpeg|jpg|png|gif|bmp)/i,
        PREVIEW_HEIGHT: /[0-9]+(?=\])/i,

        DOWNLOAD: /\[download(.*?)\](.*?)\[\/download\]/g,
        DOWNLOAD_RM: /(\[download?\w+.*?\]|\[\/download?\w+.*?\])/g,
        QUOTE_TAG: /(\[quote uid:([0-9]+) time:([0-9]+)\])/i,
        TAG_SCRIPT: /(<script)|(<\/script>)/g,
       
        USER_ID: /(\[uid:([0-9])+])/g,
        TASK: /(\[task option:([0-9]+) id:([0-9]+) to:([0-9]+) date:([0-9]+)\])(.|\n)*(?:task\])/g,
        TAG_TASK: /(\[task?\w+.*?\]|\[\/task?\w+.*?\])/g,
        TAG_BIND_VUE_OPEN: /(\{\{)/g,
        TAG_BIND_VUE_CLOSE: /(\}\})/g,
        TAG_BREAK: /\n/g,
        FILE_NAME: /^[^*:<>?/\\|]+$/g,

        ROOM: {
            INFO: /(\[room_info\])(.|\r|\n)*(?:room_info\])/g,
            NAME: /(\[room_name\])(.|\r|\n)*(?:room_name\])/g,
            TYPE: /(\[room_type\])(.|\d|\n)*(?:room_type\])/g,
            AVATAR: /(\[room_avatar\])(.|\r|\n)*(?:room_avatar\])/g,
            DESC: /(\[room_desc\])(.|\r|\n)*(?:room_desc\])/g,
            MEMBER_JOINED: /(\[room_members_joined\])(.|\r|\n)*(?:room_members_joined\])/g,
            MEMBER_ROLE: /(\[room_members_role\])(.|\r|\n)*(?:room_members_role\])/g,
            MEMBER_DELETED: /(\[room_members_deleted\])(.|\r|\n)*(?:room_members_deleted\])/g,
            MEMBER_LEAVE: /(\[room_members_leave\])(.|\r|\n)*(?:room_members_leave\])/g
        },
    },
    REPLACE_MESSAGE: {
        CODE: '[RP_CODE]',
        UN_CODE: '[URP_CODE]',
        LINK: '[RP_LINK]'
    },
    HTML: {
        TOALL: '<span class="toall">[toall]</span>',
        TITLE: '<span class="html-title">',
        END_TITLE: '<span class="chat-quote">',
        QUOTE: '<span class="chat-quote">',
        END_QUOTE: '<span class="chat-quote">',
        HTML_SPACE: '&thinsp;'
    },
    DOMAIN: /http:\/\/localhost:90\/rid-([0-9]+)-([0-9]+)/g,
    ROUTE_LINK: /rid-([0-9]+)-([0-9]+)$/i,
    ROUTE_LINK_POSITION: /rid-([\d]+)$|rid-([\d]+).([\d]+)$/i,
}

export default CONST;
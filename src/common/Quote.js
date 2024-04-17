import REGEX from '../constants/RegexConst';

const QUOTE =
    '<div class="dev_quote chatQuote"><div class="chatQuote__title"><span class="icon-quote"> ' +
    '<svg viewBox="0 0 10 10" id="icon_quote" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M3.863 2.5a2.388 2.388 0 0 0-2.388 2.387c0 .191.031.372.076.549a1.476 1.476 0 1 1 .837 2.69l-.297-.03a2.38 2.38 0 0 1-2.09-2.358 3.862 3.862 0 0 1 3.862-3.862.313.313 0 0 1 0 .626zm5.825 0a2.387 2.387 0 0 0-2.387 2.387c0 .191.031.372.075.549a1.476 1.476 0 1 1 .837 2.69l-.298-.03a2.38 2.38 0 0 1-2.09-2.358 3.862 3.862 0 0 1 3.862-3.862.313.313 0 0 1 0 .626z"></path>' +
    '</svg></span><span class="piconname">{img}<span>{name}</span></span>' +
    '<time class="quoteTimeStamp chatQuote__timeStamp"><span>{time}</span></time></div><div class="quoteText">';

export default { 
    processQuote(listUsers, content) {
        content = content.replace(/quote\][?=\n]/g, 'quote]');
        if (content !== undefined && content !== '') {
            if (content.match(REGEX.TAG.QUOTE_CONTENT_START) && content.match(REGEX.TAG.QUOTE_CONTENT_END)) {
                content = content.replace(REGEX.TAG.QUOTE_CONTENT_START, function (matchs) {
                    return quoteInfo(listUsers, matchs)
                });
                content = content.replace(REGEX.TAG.QUOTE_CONTENT_END, '</div></div>');
            }
        }
    
        return content;
    },
    
    quoteInfo(listUsers, content) {
        let quoteInfo = QUOTE;
        if (content.match(REGEX.TAG.QUOTE_TAG)) {
            let toId = content.match(REGEX.TAG.QUOTE_TAG_USER_ID);
            let user = listUsers[toId[0]];
            if (user !== undefined) {
                let img = '<UserAvatar :width="15" :height="15" :user_id="' + parseInt(toId[0]) + '"  />';
                quoteInfo = quoteInfo.replace(/{img}/g, img);
                quoteInfo = quoteInfo.replace(/{name}/g, user.name);
            } else {
                let img =
                    '<img class=" _avatarHoverTip _avatarClickTip avatarClickTip avatarTiny _avatar _avatarAid2636653" src="/static/icons/ico_avatar_notfound.png"/>';
                quoteInfo = quoteInfo.replace(/{img}/g, img);
                quoteInfo = quoteInfo.replace(/{name}/g, 'Cancelled User');
            }
    
            let timestamp = content.match(REGEX.TAG.QUOTE_TAG_TIME);
            quoteInfo = quoteInfo.replace(/{time}/g, function (matches) {
                if (isNaN(timestamp[0])) return timestamp[0];
                let date = new Date(timestamp[0] * 1000);
                return (
                    ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
                    ('0' + date.getDate()).slice(-2) + '/' + date.getFullYear() + ' ' +
                    ('0' + date.getHours()).slice(-2) + ':' +
                    ('0' + date.getMinutes()).slice(-2)
                );
            });
        }
    
        return quoteInfo;
    }
}

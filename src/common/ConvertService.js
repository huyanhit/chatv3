// setup maping convert data local
const KEYS = {
    'MY_USER' : {
        '[KEY]' : {'type' : 'list'}
    },
    'USER' : {
        '[KEY]' : {
            'NAME'          : {'name' : 'name',        'type' : 'string',    'default' : ''},
            'ADDRESS'       : {'name' : 'address',      'type' : 'string',   'default' : ''},
            'COMPANY'       : {'name' : 'company',      'type' : 'string',   'default' : ''},
            'COVER_IMG'     : {'name' : 'cover_img',     'type' : 'string',   'default' : '0'},
            'CREATED_AT'    : {'name' : 'created',   'type' : 'timestamp','default' : '0'},
        }
    },

    'MY_ROOM' : {
        '[KEY]' : {'type' : 'list'}
    },
    'ROOM' : {
        '[KEY]' : {
            'NAME'        : {'name' : 'name',        'type' : 'string',    'default' : ''},
            'DESCRIPTION' : {'name' : 'description', 'type' : 'string',    'default' : ''},
            'ICON'        : {'name' : 'icon',        'type' : 'string',    'default' : ''},
            'TYPE'        : {'name' : 'type',        'type' : 'integer',   'default' : 0},
            'STATUS'      : {'name' : 'status',      'type' : 'integer',   'default' : 0},
            'PINED'       : {'name' : 'pin',         'type' : 'integer',   'default' : 0},
            'TOTAL'       : {'name' : 'total',       'type' : 'integer',   'default' : 0},
            'CREATED'     : {'name' : 'created',     'type' : 'timestamp', 'default' : '0'},
            'UPDATED'     : {'name' : 'updated',     'type' : 'timestamp', 'default' : '0'},
        }
    },

    'ROOM_MESSAGE' : {
        '[KEY]' : {'type' : 'list'}
    },
    'MESSAGE' : {
        '[KEY]' : {
            'CONTENT'   : {'name' : 'content',   'type' : 'string',    'default' : ''},
            'STATUS'    : {'name' : 'status',    'type' : 'integer',   'default' : 0},
            'AUTH'      : {'name' : 'auth',      'type' : 'integer',   'default' : 0},
            'THREAD'    : {'name' : 'thread',    'type' : 'integer',   'default' : 0},
            'CREATED'   : {'name' : 'created',   'type' : 'timestamp', 'default' : '0'},
            'UPDATED'   : {'name' : 'updated',   'type' : 'timestamp', 'default' : '0'},
        }
    },

    'ROOM_MEMBER' : {
        '[KEY]' : {'type' : 'list'}
    },
    'MEMBER' : {
        '[KEY]' : {
            'TYPE'      : {'name' : 'type',     'type' : 'integer',   'default' : 0},
            'POSITION'  : {'name' : 'position', 'type' : 'integer',   'default' : 0},
            'MENTION'   : {'name' : 'mention',  'type' : 'integer',   'default' : 0},
            'CREATED'   : {'name' : 'created',  'type' : 'timestamp', 'default' : '0'},
        }
    },

    'FILES' : {
        '[KEY]' : {'type' : 'list'}
    },
    'MY_FILE' : {
        '[KEY]' : {'type' : 'list'}
    },
    'ROOM_FILE' : {
        '[KEY]' : {'type' : 'list'}
    },
    'MESSAGE_FILE' : {
        '[KEY]' : {'type' : 'list'}
    },
    'FILE' : {
        '[KEY]' : {
            'NAME'       : {'name' : 'name',      'type' : 'string',   'default' : ''},
            'EXT'        : {'name' : 'ext',       'type' : 'string',   'default' : ''},
            'TYPE'       : {'name' : 'type',      'type' : 'string',   'default' : ''},
            'PATH'       : {'name' : 'path',      'type' : 'string',   'default' : ''},
            'STORE'      : {'name' : 'store',     'type' : 'string',   'default' : '0'},
            'CREATED'    : {'name' : 'created',   'type' : 'timestamp','default' : '0'},
        }
    }
}

const SEPARATE = '_';
import _ from 'lodash';

export default { 
    // convert data objects to raws
    convertObjectsToRaws(objects){
        let arrayRaw = {};
        for (const key in objects) {
            arrayRaw = Object.assign(arrayRaw,  this.convertObjectToRaw(key, objects[key]));
        }
        return arrayRaw;
    },

    // convert data raws to objects
    convertRawsToObjects(raws){
        let objects = {};
        for (const key in raws) {
            objects = _.mergeWith(objects,this.convertRawToObject(key, raws[key]));
        }
        return objects;
    },
    
    // convert data form to objects
    converFormToObjects(object, key, data){
        return {[object]:{[key]:data}};
    },

    convertObjectToRaw(prefix, object){
        let data = {};
        for (const key in object) {
            if(Array.isArray(object[key])){
                let pre = (prefix + SEPARATE + key).toUpperCase();
                data = Object.assign(data, {[pre]: this.renderKeyFromArray(object[key])})
            }else{
                data = Object.assign(data, this.renderKeyFromObject(prefix, key, object[key]))
            }
        }
        
        return data;
    },

    convertRawToObject(key, data){
        let prefixKey = this.getPrefixKeyByKeyRaw(key);
        if(prefixKey !== null){
            let obj      = KEYS[prefixKey]['[KEY]'];
            let sufixKey = key.replace(prefixKey + SEPARATE, '');
            if(obj['type'] !== undefined){
                return {[prefixKey]: {[sufixKey]: data}};
            }else{
                for(let index in obj){
                    if(sufixKey.indexOf(index) === 0){
                        let idKey = sufixKey.replace(index + SEPARATE, '');
                        return {[prefixKey]: { [idKey]:  {[obj[index].name]: data } } }
                    }
                }
            }
        }
    },

    renderKeyFromObject(prefix, key, object){
        let data = {};
        for (const item in object) {
            let pre = (prefix + SEPARATE + item + SEPARATE + key).toUpperCase();
            data = Object.assign(data, {[pre]: object[item]});
        }

        return data;
    },

    renderKeyFromArray(array){
        let data = [];
        for (const item in array) {
            data.push(array[item]);
        }

        return data;
    },

    getPrefixKeyByKeyRaw(key){
        for (let objKey in KEYS){
            if(key.indexOf(objKey) === 0){
                return objKey;
            }
        }

        return null;
    }
}
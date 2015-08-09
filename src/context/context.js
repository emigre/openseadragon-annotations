export default {

    maps: {},

    register(id, obj) {
        this.maps[id] = obj;
        return this;
    },

    reset() {
        this.maps = {};
        return this;
    },

    get(id, fn) {
        var item = this.maps[id];
        if (fn && typeof fn === 'function') {
            fn.call(this, item);
        }
        return item;
    }

};
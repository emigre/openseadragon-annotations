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

    get(id) {
        return this.maps[id];
    }

};
export default {

    maps: {},

    function register(id, obj) {
        this.maps[id] = obj;
        return this;
    },

    function reset() {
        this.maps = {};
        return this;
    },

    function get(id) {
        return this.maps[id];
    }

};
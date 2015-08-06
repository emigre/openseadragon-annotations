export default {

    maps: {},

    initialize: function () {
        for (var obj in this.maps) {
        }
    },

    register: function (id, obj) {
        this.maps[id] = obj;
        return this;
    },

    reset: function () {
        this.maps = {};
        return this;
    },

    get: function (id) {
        return this.maps[id];
    }

};
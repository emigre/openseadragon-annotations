import OpenSeadragon from 'OpenSeadragon';

export default {

    initialize: function (options) {
        OpenSeadragon.extend(this, options);
        return this;
    },

    handleMouseDown: function () {
        return this;
    },

    handleMouseUp: function () {
        return this;
    }

};

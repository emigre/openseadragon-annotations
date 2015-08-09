import OpenSeadragon from 'OpenSeadragon';

export default {

    initialize(options) {
        OpenSeadragon.extend(this, options);
        return this;
    },

    handleMouseDown() {
        return this;
    },

    handleMouseUp() {
        return this;
    }

};

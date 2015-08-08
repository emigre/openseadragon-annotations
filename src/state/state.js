import OpenSeadragon from 'OpenSeadragon';

export default {

    function initialize(options) {
        OpenSeadragon.extend(this, options);
        return this;
    },

    function handleMouseDown() {
        return this;
    },

    function handleMouseUp() {
        return this;
    }

};

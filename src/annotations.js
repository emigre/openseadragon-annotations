import OpenSeadragon from "OpenSeadragon";
import draw from './draw';
import move from './move';
import controls from './controls';
import overlay from './overlay';

export default {

    initialize: function (options) {
        OpenSeadragon.extend(this, {
            state: move.initialize(),
            controls: controls.initialize({
                imagePath: options.imagePath || ''
            }),
            overlay: overlay.initialize({
                viewer: options.viewer
            })
        }, options);

        this.controls.addHandler('add', function (button) {
            this.viewer.addControl(button.element, {
                anchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT
            });
        }.bind(this));
        this.controls.add('move', true).addHandler('click', function () {
            this.viewer.setMouseNavEnabled(true);
            this.state = move.initialize();
        }.bind(this));
        this.controls.add('draw').addHandler('click', function () {
            this.viewer.setMouseNavEnabled(false);
            this.state = draw.initialize();
        }.bind(this));

        this.viewer.addHandler('animation', function () {
            var width = this.overlay.el.clientWidth;
            var height = this.overlay.el.clientHeight;
            var viewPort = '0 0 ' + width + ' ' + height;
            var svg = this.overlay.el.querySelector('svg');
            svg.setAttribute('viewPort', viewPort);
        }.bind(this));
        this.overlay.el.addEventListener('mousedown', function (e) {
            this.state.handleMouseDown(e, this.overlay);
        }.bind(this), false);
        this.overlay.el.addEventListener('mouseup', function (e) {
            this.state.handleMouseUp(e, this.overlay);
        }.bind(this), false);
        return this;
    },

    import: function () {
        // TODO
    },

    export: function () {
        // TODO
    }

};

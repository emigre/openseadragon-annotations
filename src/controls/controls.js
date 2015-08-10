import OpenSeadragon from 'OpenSeadragon';
import inject from '../context/inject';

export default OpenSeadragon.extend(new OpenSeadragon.EventSource(), {

    @inject('viewer')
    initialize(viewer, options) {
        var options = options || {};
        this.list = {};
        this.viewer = viewer;
        if (options.controls) { options.controls.forEach(this.add.bind(this)); }
        return this;
    },

    add(options) {
        this.set(options).addHandler('click', options.action);
        this.get(options.name).addHandler('click', function () {
            for (var button in this.list) {
                this.list[button].imgDown.style.visibility = button === options.name ? 'visible' : 'hidden';
            }
        }.bind(this));
        this.viewer.addControl(this.get(options.name).element, {
            anchor: OpenSeadragon.ControlAnchor.BOTTOM_LEFT
        });
        return this;
    },

    activate(name) {
        this.list[name].imgDown.style.visibility = 'visible';
        return this;
    },

    set(options) {
        this.list[options.name] = new OpenSeadragon.Button({
            tooltip: options.name[0].toUpperCase() + options.name.substr(1),
            srcRest: options.srcRest,
            srcGroup: options.srcGroup,
            srcHover: options.srcHover,
            srcDown: options.srcDown,
            onClick: this.raiseEvent.bind(this, 'click', name)
        });
        return this.list[options.name];
    },

    get(name) {
        return this.list[name];
    },

    all() {
        var controls = [];
        for (var name in this.list) {
            controls.push(this.list[name]);
        }
        return controls;
    }

});

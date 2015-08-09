import OpenSeadragon from 'OpenSeadragon';
import inject from '../context/inject';

export default OpenSeadragon.extend(new OpenSeadragon.EventSource(), {

    initialize(options) {
        var options = options || {};
        this.imagePath = options.imagePath || '';
        this.list = {};
        if (options.controls) { options.controls.forEach(this.add.bind(this)); }
        return this;
    },

    add(options) {
        this.set(options.name).addHandler('click', options.action);
        this.get(options.name).addHandler('click', function () {
            for (var button in this.list) {
                this.list[button].imgDown.style.visibility = button === options.name ? 'visible' : 'hidden';
            }
        }.bind(this));
        return this;
    },

    activate(name) {
        this.list[name].imgDown.style.visibility = 'visible';
        return this;
    },

    set(name) {
        this.list[name] = new OpenSeadragon.Button({
            tooltip: name[0].toUpperCase() + name.substr(1),
            srcRest: this.imagePath + name + '_rest.png',
            srcGroup: this.imagePath + name + '_grouphover.png',
            srcHover: this.imagePath + name + '_hover.png',
            srcDown: this.imagePath + name + '_pressed.png',
            onClick: this.raiseEvent.bind(this, 'click', name)
        });
        return this.list[name];
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

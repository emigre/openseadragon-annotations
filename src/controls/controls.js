import OpenSeadragon from 'OpenSeadragon';
import inject from '../context/inject';

export default OpenSeadragon.extend(new OpenSeadragon.EventSource(), {

    initialize(options) {
        OpenSeadragon.extend(this, options);
        this.list = {};
        this.addHandler('click', this.onClick.bind(this));
        return this;
    },

    onClick(name) {
        for (var button in this.list) {
            if (this.list.hasOwnProperty(button)) {
                if (button === name) {
                    this.list[button].imgDown.style.visibility = 'visible';
                } else {
                    this.list[button].imgDown.style.visibility = 'hidden';
                }
            }
        }
        return this;
    },

    @inject('annotations')
    add(annotations, name, active) {
        this.list[name] = new OpenSeadragon.Button({
            tooltip: name[0].toUpperCase() + name.substr(1),
            srcRest: this.imagePath + name + '_rest.png',
            srcGroup: this.imagePath + name + '_grouphover.png',
            srcHover: this.imagePath + name + '_hover.png',
            srcDown: this.imagePath + name + '_pressed.png',
            onClick: this.raiseEvent.bind(this, 'click', name)
        });
        if (active) {
            this.list[name].imgDown.style.visibility = 'visible';
        }
        annotations.addControl(this.list[name]);
        return this;
    },

    get(name) {
        return this.list[name];
    }

});

import context from './context';

export default function (...dependencies) {
    return function (target, key, descriptor) {
        return {
            value: function initialize () {
                dependencies.forEach(function (dependency) {
                    this[dependency] = Object.create(context.get(dependency));
                }.bind(this));
                descriptor.initializer().apply(this, arguments);
            },
            enumerable: true,
            configurable: true,
            writable: true
        };
    };
};
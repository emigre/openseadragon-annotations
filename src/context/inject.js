import context from './context';

export default function (...dependencies) {
    return function (target, key, descriptor) {
        return {
            value: function initialize (...args) {
                return descriptor.initializer().apply(this, dependencies.map(function (name) {
                    return context.get(name);
                }).concat(args));
            },
            enumerable: true,
            configurable: true,
            writable: true
        };
    };
};
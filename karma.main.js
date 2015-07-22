// Bind Polyfill, for PhantomJs
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - ' +
                'what is trying to be bound is not callable');
        }
        var aArgs = Array.prototype.slice.call(arguments, 1);
        var fToBind = this;
        var fNOP = function () {};
        var fBound = function () {
            var context = this instanceof fNOP ? this : oThis;
            var args = [].slice.call(arguments);
            return fToBind.apply(context, aArgs.concat(args));
        };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}

// Add tests
var tests = [];
for (var file in window.__karma__.files) {
    if (/\.*Spec.js$/.test(file)) {
        tests.push(file);
    }
}
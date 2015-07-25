var tests = [];
for (var file in window.__karma__.files) {
    if (/\.*Spec.js$/.test(file)) {
        tests.push(file);
    }
}
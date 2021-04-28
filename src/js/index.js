class Event {
    constructor() {
        this.callbacks = {};
    }

    $on(name, fn) {
        (this.callbacks[name] || (this.callbacks[name] = [])).push(fn);

        console.log(this.callbacks);
    }

    $emit(name, arg) {
        const c = this.callbacks[name];

        if(c) {
            c.forEach(v => {
                v.call(this, arg);
            })
        }
    }
}

var d = new Event();
d.$on('e', (res) => {
    console.log('-数据监听-', res);
})

d.$emit('e', {a:222222222})
d.$emit('e', {a:5555555})
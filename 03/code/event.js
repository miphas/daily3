

function VM() {
    this._events = {} 
}
VM.prototype.createEventsArrayIfNotExists = function (eventName) {
    if (!this._events[eventName]) {
        this._events[eventName] = []
    }
}
VM.prototype.on = function (eventName, callback) {
    this.createEventsArrayIfNotExists(eventName)
    this._events[eventName].push({
        callback,
        times: Infinity,
    })
}
VM.prototype.once = function (eventName, callback) {
    this.createEventsArrayIfNotExists(eventName)
    this._events[eventName].push({
        callback,
        times: 1,
    })
}
VM.prototype.emit = function (eventName, ...args) {
    const listeners = this._events[eventName] || []
    listeners.forEach(listener => {
        listener.times -= 1
        listener.callback(...args)
    })
    this._events[eventName] = listeners.filter(item => item.times > 0)
}
VM.prototype.off = function (eventName, callback) {
    const listeners = this._events[eventName] || []
    this._events[eventName] = listeners.filter(item => item !== callback)
}



const vm = new VM()

const onEvtA = function(pa, pb) {
    console.log(pa, pb)
}
vm.on('evtA', onEvtA)
vm.emit('evtA', 'a1', 'a2')
vm.off('evtA', onEvtA)
vm.emit('evtA', 'a1', 'a2')

const onceEvtB = function(p1) {
    console.log('once', p1)
}
vm.once('onceEvtB', onceEvtB)
vm.emit('onceEvtB', 'a1', 'a2')
vm.emit('onceEvtB', 'a1', 'a2')


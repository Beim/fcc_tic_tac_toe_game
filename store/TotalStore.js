const EventEmitter = require('events').EventEmitter
const assign = require('object-assign')

let TotalStore = assign({}, EventEmitter.prototype, {
    backCanv: null,

    mainCanv: null,

    canvHeight: 500,

    canvWidth: 500,

    area: {},

    emitChange: function() {
        this.emit('change')
    },

    addChangeListener: function(callback) {
        this.on('change', callback)
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback)
    }


})

module.exports = TotalStore
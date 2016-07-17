const EventEmitter = require('events').EventEmitter
const assign = require('object-assign')
let canvas = require('../controller/canvas.js')
let TotalStore = require('../store/TotalStore.js')

Array.prototype.hasBoth = function(a, b, c) {
    if (this.indexOf(a) >= 0 && this.indexOf(b) >= 0 && this.indexOf(c) >= 0) return true;
    return false;
}

Array.prototype.hasOr = function(args) {
    for (let i = 0; i < args.length; i++) {
        if (this.indexOf(args[i]) >= 0) return args[i];
    }
    return false;
}

var game = assign({}, EventEmitter.prototype, {

    turn: 'computer',

    player: 'X',

    computer: 'O',

    chessboard: {},

    init: function() {
        this.turn = 'computer',
        this.player = 'X',
        this.computer = 'O',
        this.chessboard = {}
    },

    computerMove: function() {
        let res = this.canIWin('computer')
        if (!res.flag) {
            res = this.canIWin('player')
            if (!res.flag) {
                res = this.keepAdvantage()
            }
        }
        this.chessboard[res.pos] = 'computer'
        this.emit('move', {
            areax: res.pos,
            callback: () => {
                if (this.isFinish(this.chessboard, 'computer')) {
                    this.emit('over', 'computer')
                } else {
                    if (this.isFull()) {
                        this.emit('over', 'no one')
                    }
                }
            }
        })
    },
    isFull: function() {
        let available = []
        for (let i = 1; i <= 9; i++) {
            if (!this.chessboard[i]) return false;
        }

        return true;
    },
    isFinish: function(chessboard, role) {
        let roleArr = []
        for (let i in chessboard) {
            if (chessboard[i] === role) roleArr.push(i)
        }
        // console.log(roleArr, roleArr.hasBoth('1', '1', '1'))
        if (roleArr.hasBoth('1', '2', '3') || roleArr.hasBoth('4', '5', '6') || roleArr.hasBoth('7', '8', '9') || roleArr.hasBoth('1', '4', '7') || roleArr.hasBoth('2', '5', '8') || roleArr.hasBoth('3', '6', '9') || roleArr.hasBoth('1', '5', '9') || roleArr.hasBoth('3', '5', '7')) {
            return true;
        }
        return false;
    },

    canIWin: function(role) {
        let res = {
            flag: false,
            pos: null
        }
        let available = []
        for (let i = 1; i <= 9; i++) {
            if (!this.chessboard[i]) available.push(i)
        }

        for (let i = 0; i < available.length; i++) {
            let simuChessboard = assign({}, this.chessboard)
            simuChessboard[available[i]] = role
            if (this.isFinish(simuChessboard, role)) {
                res = {
                    flag: true,
                    pos: available[i]
                }
                break;
            }
        }
        return res;
    },

    keepAdvantage: function() {
        let res = {
            pos: null
        }
        let available = []
        for (let i = 1; i <= 9; i++) {
            if (!this.chessboard[i]) available.push(i)
        }
        let pos = available.hasOr([5])
        if (!pos) {
            pos = available.hasOr([2, 4, 6, 8])
            if (!pos) {
                pos = available.hasOr([1, 3, 7, 9])
            }
        }
        res.pos = pos
        return res;
    }
})

game.on('start', function(args) {

    this.init()
    // show modal
    document.getElementById('modalBtn').click()
    // draw O or X
    let ooxxCanv = document.getElementById('ooxxCanv')
    canvas.drawOOXX(ooxxCanv)
    // draw backCanv and mainCanv
    let backCanv = document.getElementById('backgroundCanvas')
    let mainCanv = document.getElementById('mainCanvas')
    canvas.drawFence(backCanv)
})

game.on('restart', function() {
    console.log('restart')
    this.init()
    document.getElementById('modalBtn').click()
})

game.on('over', function(args) {
    alert(args + ' win ~')

    let mainCanv = TotalStore.mainCanv
    let width = mainCanv.width
    let height = mainCanv.height
    mainCanv.width = width
    mainCanv.height = height

    this.emit('restart')
})

// drawChess and change turn
game.on('move', function(args) {
    let areax = TotalStore.area[args.areax]
    let canv = TotalStore.mainCanv
    let x = (areax.x2 + areax.x1) / 2 - canv.offsetLeft
    let y = (areax.y2 + areax.y1) / 2 - canv.offsetTop
    let radius = (areax.x2 - areax.x1) / 5

    canvas.drawChess(canv, x, y, radius, this[this.turn])
    this.turn = this.turn === 'player' ? 'computer' : 'player'
    args.callback()
})

module.exports = game
'use strict'
const React = require('react')
const rce = React.createElement.bind()

let Total = require('../view/Total.js')
let TotalStore = require('../store/TotalStore.js')
let game = require('../store/game.js')
    // let canvas = require('./canvas.js')

let TotalController = React.createClass({

    initState: () => {
        return {

        }
    },

    getInitialState: function() {
        return this.initState()
    },

    _onChange: function() {
        this.setState(this.initState())
    },

    componentDidMount: function() {
        // add listener
        TotalStore.addChangeListener(this._onChange)
        // store canvas
        let mainCanv = document.getElementById('mainCanvas')
        TotalStore.mainCanv = mainCanv
        TotalStore.area = this.calcClickArea(mainCanv)
        // start game
        game.emit('start')
    },

    componentWillUnmount: function() {
        TotalStore.removeChangeListener(this._onChange)
    },

    calcClickArea: function(canv) {
        let left = canv.offsetLeft
        let top = canv.offsetTop
        let blockHeight = canv.offsetHeight / 3
        let blockWidth = canv.offsetWidth / 3
        let area = {
            1: {
                x1: left,
                y1: top,
                x2: left + blockWidth,
                y2: top + blockHeight
            },
            2: {
                x1: left + blockWidth,
                y1: top,
                x2: left + 2 * blockWidth,
                y2: top + blockHeight
            },
            3: {
                x1: left + 2 * blockWidth,
                y1: top,
                x2: left + 3 * blockWidth,
                y2: top + blockHeight
            },
            4: {
                x1: left,
                y1: top + blockHeight,
                x2: left + blockWidth,
                y2: top + blockHeight * 2
            },
            5: {
                x1: left + blockWidth,
                y1: top + blockHeight,
                x2: left + 2 * blockWidth,
                y2: top + blockHeight * 2
            },
            6: {
                x1: left + 2 * blockWidth,
                y1: top + blockHeight,
                x2: left + 3 * blockWidth,
                y2: top + blockHeight * 2
            },
            7: {
                x1: left,
                y1: top + blockHeight * 2,
                x2: left + blockWidth,
                y2: top + blockHeight * 3
            },
            8: {
                x1: left + blockWidth,
                y1: top + blockHeight * 2,
                x2: left + 2 * blockWidth,
                y2: top + blockHeight * 3
            },
            9: {
                x1: left + 2 * blockWidth,
                y1: top + blockHeight * 2,
                x2: left + 3 * blockWidth,
                y2: top + blockHeight * 3
            }
        }
        return area;
    },

    calcWhichArea: function(x, y) {
        let area = TotalStore.area
        for (let i in area) {
            let ai = area[i]
            if (x >= ai.x1 && x < ai.x2 && y >= ai.y1 && y < ai.y2) return i;
        }
        return 0;
    },

    clickHandler: function(e) {
        // console.log(e.clientX)
        // console.log(e.screenX)
        // console.log(e.target.getBoundingClientRect())
        // console.log(e.target.offsetTop)
        let x = e.pageX
        let y = e.pageY
        let areax = this.calcWhichArea(x, y)
        if (areax && !game.chessboard[areax]) {
            game.chessboard[areax] = 'player'

            // areax = TotalStore.area[areax]
            // let canv = TotalStore.mainCanv

            // let x = (areax.x2 + areax.x1) / 2 - canv.offsetLeft
            // let y = (areax.y2 + areax.y1) / 2 - canv.offsetTop
            // let radius = (areax.x2 - areax.x1) / 5

            game.emit('move', {
                areax: areax,
                // canv, canv,
                // x: x,
                // y: y,
                // radius: radius,
                callback: function() {
                    if (game.isFinish(game.chessboard, 'player')) {
                        game.emit('over', 'player')
                    } else {
                        if (game.isFull()) {
                            game.emit('over', 'no one')
                        } else {
                            game.computerMove()
                        }
                    }
                }
            })
        }

    },

    chooseChess: function(e) {
        if (e.target.innerHTML === 'O') {
            game.player = 'O'
            game.computer = 'X'
        } else {
            game.player = 'X'
            game.computer = 'O'
        }
        game.computerMove()
    },

    render: function() {
        return Total({
            canvHeight: TotalStore.canvHeight,
            canvWidth: TotalStore.canvWidth,

            clickHandler: this.clickHandler,
            chooseChess: this.chooseChess
        })
    }
})


module.exports = TotalController
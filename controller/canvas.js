let canvas = {
    init: function(config, target) {
        let canv = document.createElement('canvas')
        canv.width = config.width
        canv.height = config.height
        canv.id = config.id
        canv.style.background = config.background
        target.appendChild(canv)
        return canv
    },

    drawFence: function(_this) {
        let width = _this.width
        let height = _this.height
        let a1 = width / 3
        let a2 = width * 2 / 3
        let b1 = height / 3
        let b2 = height * 2 / 3

        let ctx = _this.getContext('2d')
            // this.drawLine(ctx, a1, 0, a1, height, 2, '#fff')
            // this.drawLine(ctx, a2, 0, a2, height, 2, '#fff')
            // this.drawLine(ctx, 0, b1, width, b1, 2, '#fff')
            // this.drawLine(ctx, 0, b2, width, b2, 2, '#fff')
        ctx.fillStyle = '#fff'
        ctx.rect(a1, 0, 2, height)
        ctx.rect(a2, 0, 2, height)
        ctx.rect(0, b1, width, 2)
        ctx.rect(0, b2, width, 2)
        ctx.fill()
    },

    drawChess: function(_this, x, y, radius, type) {
        let ctx = _this.getContext('2d')
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 3
        if (type === 'X') {
            // draw X
            ctx.beginPath()
            ctx.moveTo(x - radius, y - radius)
            ctx.lineTo(x + radius, y + radius)
            ctx.moveTo(x + radius, y - radius)
            ctx.lineTo(x - radius, y + radius)
            ctx.stroke()
        } else {
            // draw O
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, 2 * Math.PI)
            ctx.stroke()
        }
    },

    drawOOXX: function(_this) {
        let width = _this.offsetWidth
        let height = _this.offsetHeight
        let pen = _this.getContext('2d')
        pen.fillStyle = 'black'
        pen.rect(10, 10, width - 20, height - 20)
        pen.fill()
        pen.fillStyle = 'white'
        pen.textAlign = 'center'
        pen.font = '30px Arial'
        pen.fillText('X or O ?', width / 2, height / 2)
    }


}

module.exports = canvas
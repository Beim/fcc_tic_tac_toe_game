'use strict'
const React = require('react')
const ReactDOM = require('react-dom')
const rce = React.createElement.bind()
let TotalController = require('../controller/TotalController.js')

let total = React.createClass({
    render: function() {
        return (
            rce(TotalController, null)
        )
    }
})

ReactDOM.render(rce(total, null), document.getElementById('main')) 

const React = require('react')
const rce = React.createElement.bind()

let Total = (props) => {

    return (
        rce('div', {
                'id': 'total'
            },
            rce('canvas', {
                'id': 'backgroundCanvas',
                'width': '500',
                'height': '500',
                'style': {
                    'zIndex': '10'
                },
            }),
            rce('canvas', {
                'id': 'mainCanvas',
                'width': props.canvWidth,
                'height': props.canvHeight,
                'style': {
                    'zIndex': '20'
                },
                'onClick': props.clickHandler
            }),
            rce('button', {
                'type': 'button',
                'className': 'btn btn-default',
                'data-toggle': 'modal',
                'data-target': '#myModal',
                'id': 'modalBtn',
                'style': {
                    'display': 'none'
                }
            }),
            rce('div', {
                    'className': 'modal fade',
                    'id': 'myModal',
                    'role': 'dialog',
                    'style': {
                        'marginTop': '100px'
                    }
                },
                rce('div', {
                        'className': 'modal-dialog modal-sm',
                        'style': {
                            'width': '330px'
                        }
                    },
                    rce('div', {
                            'className': 'modal-content',
                            'style': {
                                'width': '330px',
                                'height': '190px'
                            }
                        },
                        rce('div', {
                                'className': 'modal-body',
                                'style': {
                                    'height': '125px',
                                    'width': '330px'
                                }
                            },
                            rce('canvas', {
                                'id': 'ooxxCanv',
                                'width': '300',
                                'height': '110',
                                'style': {
                                    'position': 'absolute'
                                }
                            })
                        ),
                        rce('div', {
                                'className': 'modal-footer'
                            },
                            rce('button', {
                                'type': 'button',
                                'className': 'btn btn-default',
                                'data-dismiss': 'modal',
                                'dangerouslySetInnerHTML': {
                                    '__html': 'X'
                                },
                                'onClick': props.chooseChess
                            }),
                            rce('button', {
                                'type': 'button',
                                'className': 'btn btn-default',
                                'data-dismiss': 'modal',
                                'dangerouslySetInnerHTML': {
                                    '__html': 'O'
                                },
        'onClick': props.chooseChess
                            })
                        )
                    )
                )
            )
        )
    )
}

module.exports = Total
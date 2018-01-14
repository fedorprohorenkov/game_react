(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// Initialization State
function initState() {
    var colors = ["cardFace1", "cardFace1", "cardFace2", "cardFace2", "cardFace3", "cardFace3", "cardFace4", "cardFace4", "cardFace5", "cardFace5", "cardFace6", "cardFace6", "cardFace7", "cardFace7", "cardFace8", "cardFace8"];
    var shuffled = colors.shuffle();
    var initCards = [];

    for (var i = 0; i < 16; i++) {
        initCards[i] = {
            id: i,
            clickable: true,
            faceStyle: shuffled[i],
            opened: false
        };
    }

    var initialState = {
        cards: initCards,
        first: -1,
        second: -1,
        score: 0
    };

    return initialState;
}

//Redux
var store = Redux.createStore(function (state, action) {
    switch (action.type) {
        case 'FIRST_CARD':
            state.cards[action.data]["clickable"] = false;
            state.cards[action.data]["opened"] = true;
            state.first = action.data;

            return state;
        case 'SECOND_CARD':
            state.cards[action.data]["clickable"] = false;
            state.cards[action.data]["opened"] = true;
            state.second = action.data;
            setTimeout(function () {
                store.dispatch(compareCards());
            }, 600);
            return state;
        case 'COMPARE_CARDS':
            if (state.cards[state.first]["faceStyle"] == state.cards[state.second]["faceStyle"]) {
                state.first = -1;
                state.second = -1;
                state.score += 1;

                if (state.score == 8) {
                    setTimeout(function () {
                        store.dispatch(gameOver());
                    }, 1000);
                }
            } else {
                state.cards[state.first]["clickable"] = true;
                state.cards[state.first]["opened"] = false;
                state.cards[state.second]["clickable"] = true;
                state.cards[state.second]["opened"] = false;
                state.first = -1;
                state.second = -1;
            }

            return state;
        case 'GAME_OVER':
            state = initState();
            return state;
        default:
            console.log(state);
            return state || initState();
    }
});

//Actions
var firstCard = function firstCard(id) {
    return { type: 'FIRST_CARD', data: id };
};
var secondCard = function secondCard(id) {
    return { type: 'SECOND_CARD', data: id };
};
var compareCards = function compareCards() {
    return { type: 'COMPARE_CARDS', data: null };
};
var gameOver = function gameOver() {
    return { type: 'GAME_OVER', data: null };
};

//React
var Board = function Board(props) {
    return React.createElement(
        "div",
        { className: "board" },
        props.children
    );
};
var Card = React.createClass({
    displayName: "Card",
    render: function render() {
        var styleCard = this.props.card['opened'] ? 'card flipped' : 'card';
        var styleBack = "face back " + this.props.card['faceStyle'];
        return React.createElement(
            "div",
            { className: "flip", onClick: this.sendCardEvent },
            React.createElement(
                "div",
                { className: styleCard },
                React.createElement("div", { className: "face front" }),
                React.createElement("div", { className: styleBack })
            )
        );
    },
    sendCardEvent: function sendCardEvent(event) {
        if (this.props.card['clickable']) {
            if (this.props.first == -1) {
                this.props.firstDispatcher(this.props.card['id']);
            }
            if (this.props.first != -1 && this.props.second == -1) {
                this.props.secondDispatcher(this.props.card['id']);
            }
        }
    }
});

function run() {
    var state = store.getState();
    ReactDOM.render(React.createElement(
        Board,
        null,
        React.createElement(Card, { card: state.cards[0], first: state.first, second: state.second, firstDispatcher: function firstDispatcher(id) {
                return store.dispatch(firstCard(id));
            }, secondDispatcher: function secondDispatcher(id) {
                return store.dispatch(secondCard(id));
            } }),
        React.createElement(Card, { card: state.cards[1], first: state.first, second: state.second, firstDispatcher: function firstDispatcher(id) {
                return store.dispatch(firstCard(id));
            }, secondDispatcher: function secondDispatcher(id) {
                return store.dispatch(secondCard(id));
            } }),
        React.createElement(Card, { card: state.cards[2], first: state.first, second: state.second, firstDispatcher: function firstDispatcher(id) {
                return store.dispatch(firstCard(id));
            }, secondDispatcher: function secondDispatcher(id) {
                return store.dispatch(secondCard(id));
            } }),
        React.createElement(Card, { card: state.cards[3], first: state.first, second: state.second, firstDispatcher: function firstDispatcher(id) {
                return store.dispatch(firstCard(id));
            }, secondDispatcher: function secondDispatcher(id) {
                return store.dispatch(secondCard(id));
            } }),
        React.createElement("div", { className: "clearfix" }),
        React.createElement(Card, { card: state.cards[4], first: state.first, second: state.second, firstDispatcher: function firstDispatcher(id) {
                return store.dispatch(firstCard(id));
            }, secondDispatcher: function secondDispatcher(id) {
                return store.dispatch(secondCard(id));
            } }),
        React.createElement(Card, { card: state.cards[5], first: state.first, second: state.second, firstDispatcher: function firstDispatcher(id) {
                return store.dispatch(firstCard(id));
            }, secondDispatcher: function secondDispatcher(id) {
                return store.dispatch(secondCard(id));
            } }),
        React.createElement(Card, { card: state.cards[6], first: state.first, second: state.second, firstDispatcher: function firstDispatcher(id) {
                return store.dispatch(firstCard(id));
            }, secondDispatcher: function secondDispatcher(id) {
                return store.dispatch(secondCard(id));
            } }),
        React.createElement(Card, { card: state.cards[7], first: state.first, second: state.second, firstDispatcher: function firstDispatcher(id) {
                return store.dispatch(firstCard(id));
            }, secondDispatcher: function secondDispatcher(id) {
                return store.dispatch(secondCard(id));
            } }),
        React.createElement("div", { className: "clearfix" }),
        React.createElement(Card, { card: state.cards[8], first: state.first, second: state.second, firstDispatcher: function firstDispatcher(id) {
                return store.dispatch(firstCard(id));
            }, secondDispatcher: function secondDispatcher(id) {
                return store.dispatch(secondCard(id));
            } }),
        React.createElement(Card, { card: state.cards[9], first: state.first, second: state.second, firstDispatcher: function firstDispatcher(id) {
                return store.dispatch(firstCard(id));
            }, secondDispatcher: function secondDispatcher(id) {
                return store.dispatch(secondCard(id));
            } }),
        React.createElement(Card, { card: state.cards[10], first: state.first, second: state.second, firstDispatcher: function firstDispatcher(id) {
                return store.dispatch(firstCard(id));
            }, secondDispatcher: function secondDispatcher(id) {
                return store.dispatch(secondCard(id));
            } }),
        React.createElement(Card, { card: state.cards[11], first: state.first, second: state.second, firstDispatcher: function firstDispatcher(id) {
                return store.dispatch(firstCard(id));
            }, secondDispatcher: function secondDispatcher(id) {
                return store.dispatch(secondCard(id));
            } }),
        React.createElement("div", { className: "clearfix" }),
        React.createElement(Card, { card: state.cards[12], first: state.first, second: state.second, firstDispatcher: function firstDispatcher(id) {
                return store.dispatch(firstCard(id));
            }, secondDispatcher: function secondDispatcher(id) {
                return store.dispatch(secondCard(id));
            } }),
        React.createElement(Card, { card: state.cards[13], first: state.first, second: state.second, firstDispatcher: function firstDispatcher(id) {
                return store.dispatch(firstCard(id));
            }, secondDispatcher: function secondDispatcher(id) {
                return store.dispatch(secondCard(id));
            } }),
        React.createElement(Card, { card: state.cards[14], first: state.first, second: state.second, firstDispatcher: function firstDispatcher(id) {
                return store.dispatch(firstCard(id));
            }, secondDispatcher: function secondDispatcher(id) {
                return store.dispatch(secondCard(id));
            } }),
        React.createElement(Card, { card: state.cards[15], first: state.first, second: state.second, firstDispatcher: function firstDispatcher(id) {
                return store.dispatch(firstCard(id));
            }, secondDispatcher: function secondDispatcher(id) {
                return store.dispatch(secondCard(id));
            } }),
        React.createElement("div", { className: "clearfix" })
    ), root);
}

run();
store.subscribe(run);

//For test
//window.firstDispatcher = () => store.dispatch(firstCard(1))
//window.secondDispatcher = () => store.dispatch(secondCard(5))
//window.compareDispatcher = () => store.dispatch(compareCards())

},{}]},{},[1]);

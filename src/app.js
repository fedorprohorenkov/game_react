// Initialization State
function initState() {
    let colors = ["cardFace1", "cardFace1", "cardFace2", "cardFace2", "cardFace3", "cardFace3", "cardFace4", "cardFace4", "cardFace5", "cardFace5", "cardFace6", "cardFace6", "cardFace7", "cardFace7", "cardFace8", "cardFace8"]
    let shuffled = colors.shuffle()
    let initCards = []

    for (let i = 0; i < 16; i++) {
        initCards[i] = {
            id: i,
            clickable: true,
            faceStyle: shuffled[i],
            opened: false
        }
    }

    let initialState = {
        cards: initCards,
        first: -1,
        second: -1,
        score: 0
    }

    return initialState
}



//Redux
const store = Redux.createStore((state, action) => {
    switch (action.type){
        case 'FIRST_CARD':
            state.cards[action.data]["clickable"] = false
            state.cards[action.data]["opened"] = true
            state.first = action.data

            return state;
        case 'SECOND_CARD':
            state.cards[action.data]["clickable"] = false
            state.cards[action.data]["opened"] = true
            state.second = action.data
            setTimeout(function(){
                store.dispatch(compareCards())
            },600)
            return state;
        case 'COMPARE_CARDS':
            if(state.cards[state.first]["faceStyle"] == state.cards[state.second]["faceStyle"]){
                state.first = -1
                state.second = -1
                state.score += 1

                if(state.score == 8){
                    setTimeout(function(){
                        store.dispatch(gameOver())
                    },1000)
                }
            } else {
                state.cards[state.first]["clickable"] = true
                state.cards[state.first]["opened"] = false
                state.cards[state.second]["clickable"] = true
                state.cards[state.second]["opened"] = false
                state.first = -1
                state.second = -1
            }

            return state;
        case 'GAME_OVER':
            state = initState()
            return state;
        default:
            console.log(state)
            return state || initState()
    }
});

//Actions
const firstCard = id => ({ type: 'FIRST_CARD', data: id })
const secondCard = id => ({ type: 'SECOND_CARD', data: id })
const compareCards = () => ({ type: 'COMPARE_CARDS', data: null })
const gameOver = () => ({ type: 'GAME_OVER', data: null })


//React
const Board = (props) => {
    return (<div className="board">
        {props.children}
    </div>);
};
var Card  = React.createClass({
    render(){
        let styleCard = this.props.card['opened']? 'card flipped' : 'card'
        let styleBack = "face back " + this.props.card['faceStyle']
        return (
            <div  className="flip" onClick={this.sendCardEvent}>
                <div className={styleCard}>
                    <div className="face front"></div>
                    <div className={styleBack}></div>
                </div>
            </div>
        );
    },
    sendCardEvent(event){
        if(this.props.card['clickable']) {
            if(this.props.first == -1){
                this.props.firstDispatcher(this.props.card['id'])
            }
            if(this.props.first != -1 && this.props.second == -1){
                this.props.secondDispatcher(this.props.card['id'])
            }
        }
    }
});

function run() {
    let state = store.getState()
    ReactDOM.render((<Board>
        <Card card={state.cards[0]} first={state.first} second={state.second} firstDispatcher={id => store.dispatch(firstCard(id))} secondDispatcher={id => store.dispatch(secondCard(id))} />
        <Card card={state.cards[1]} first={state.first} second={state.second} firstDispatcher={id => store.dispatch(firstCard(id))} secondDispatcher={id => store.dispatch(secondCard(id))} />
        <Card card={state.cards[2]} first={state.first} second={state.second} firstDispatcher={id => store.dispatch(firstCard(id))} secondDispatcher={id => store.dispatch(secondCard(id))} />
        <Card card={state.cards[3]} first={state.first} second={state.second} firstDispatcher={id => store.dispatch(firstCard(id))} secondDispatcher={id => store.dispatch(secondCard(id))} />
        <div className="clearfix"></div>
        <Card card={state.cards[4]} first={state.first} second={state.second} firstDispatcher={id => store.dispatch(firstCard(id))} secondDispatcher={id => store.dispatch(secondCard(id))} />
        <Card card={state.cards[5]} first={state.first} second={state.second} firstDispatcher={id => store.dispatch(firstCard(id))} secondDispatcher={id => store.dispatch(secondCard(id))} />
        <Card card={state.cards[6]} first={state.first} second={state.second} firstDispatcher={id => store.dispatch(firstCard(id))} secondDispatcher={id => store.dispatch(secondCard(id))} />
        <Card card={state.cards[7]} first={state.first} second={state.second} firstDispatcher={id => store.dispatch(firstCard(id))} secondDispatcher={id => store.dispatch(secondCard(id))} />
        <div className="clearfix"></div>
        <Card card={state.cards[8]} first={state.first} second={state.second} firstDispatcher={id => store.dispatch(firstCard(id))} secondDispatcher={id => store.dispatch(secondCard(id))} />
        <Card card={state.cards[9]} first={state.first} second={state.second} firstDispatcher={id => store.dispatch(firstCard(id))} secondDispatcher={id => store.dispatch(secondCard(id))} />
        <Card card={state.cards[10]} first={state.first} second={state.second} firstDispatcher={id => store.dispatch(firstCard(id))} secondDispatcher={id => store.dispatch(secondCard(id))} />
        <Card card={state.cards[11]} first={state.first} second={state.second} firstDispatcher={id => store.dispatch(firstCard(id))} secondDispatcher={id => store.dispatch(secondCard(id))} />
        <div className="clearfix"></div>
        <Card card={state.cards[12]} first={state.first} second={state.second}  firstDispatcher={id => store.dispatch(firstCard(id))} secondDispatcher={id => store.dispatch(secondCard(id))} />
        <Card card={state.cards[13]} first={state.first} second={state.second} firstDispatcher={id => store.dispatch(firstCard(id))} secondDispatcher={id => store.dispatch(secondCard(id))} />
        <Card card={state.cards[14]} first={state.first} second={state.second} firstDispatcher={id => store.dispatch(firstCard(id))} secondDispatcher={id => store.dispatch(secondCard(id))} />
        <Card card={state.cards[15]} first={state.first} second={state.second} firstDispatcher={id => store.dispatch(firstCard(id))} secondDispatcher={id => store.dispatch(secondCard(id))} />
        <div className="clearfix"></div>
    </Board>), root);
}

run()
store.subscribe(run)


//For test
//window.firstDispatcher = () => store.dispatch(firstCard(1))
//window.secondDispatcher = () => store.dispatch(secondCard(5))
//window.compareDispatcher = () => store.dispatch(compareCards())

// Redux has come to be the status quo for managing application-level state on front end

// 29.1 Using connect
// create Redux with createStore

import {createStore} from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp, {initialStateVariable: "derp"})

// use connect to connect component to Redux store and pull props from store to component
import {connect} from 'react-redux'
const VisibleTodoList = connect(
    mapStateToProps,
    mapDispalyToProps
)(TodoList)

export default VisibleTodoList

// define actions that allow your components to send messages to Redux store

// actionTypes
export const ADD_TODO = 'ADD_TODO'

export function addTodo(text) {
    return {type: ADD_TODO, text }
}

// handle these messages and create a new state for the store in reducer functions
function todoApp(state = initialState, action) {
    switch(action.type) {
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {
                visibilityFilter: action.filter
            })
        default: return state
    }
}
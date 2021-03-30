import React, {Component, Fragment} from 'react';

class TodoList extends Component {
    render() {
        return (
            <Fragment>
                <div>
                    <input/>
                    <button>submit</button>
                </div>
                <ul>
                    <li>get up at 7 am</li>
                    <li>have class at 8 am</li>
                    <li>take break at 1 pm</li>
                </ul>
            </Fragment>
        )
    }
}

export default TodoList;
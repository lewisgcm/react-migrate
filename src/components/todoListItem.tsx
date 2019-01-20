import * as React from "react";

import { Todo } from "../models/todo";

const style = require( "./todoListItem.scss" );

interface TodoListItemProps {
    todo: Todo;
    onDeleteTodo: (todo: Todo) => void;
}

interface TodoListItemState {
    todo: Todo;
}

export class TodoListItem extends React.Component<TodoListItemProps, TodoListItemState> {

    constructor( props: TodoListItemProps ) {
        super( props );
        this.state = {
            todo: props.todo,
        };
    }

    public render() {
        return <li className={style.TodoListItem}>
            {this.state.todo.title}
            <span onClick={( e ) => this.handleOnDelete()}>X</span>
        </li>;
    }

    private handleOnDelete() {
        this.props.onDeleteTodo( this.state.todo );
    }
}

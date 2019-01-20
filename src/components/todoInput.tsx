import * as React from "react";

const style = require( "./todoInput.scss" );

export interface TodoInputProps {
    onAddTodo: (todo: string) => void;
}

interface TodoInputState {
    todo: string;
}

export class TodoInput extends React.Component<TodoInputProps, TodoInputState> {

    constructor( props: TodoInputProps ) {
        super( props );
        this.state = {
            todo: "",
        };
    }

    public render() {
        return <div className={style.TodoInput}>
            <input
                placeholder="Type a todo and press 'enter' to add"
                value={this.state.todo}
                onChange={( e ) => this.handleChange( e )}
                onKeyPress={( e ) => this.handleKeyPress( e )} >
            </input>
        </div>;
    }

    private handleKeyPress( e: React.KeyboardEvent ) {
        if ( e.key === "Enter" && this.state.todo.length > 0 ) {
            this.props.onAddTodo( this.state.todo );
            this.setState({ todo: "" });
        }
    }

    private handleChange( e: React.ChangeEvent<HTMLInputElement> ) {
        this.setState({
            todo: e.target.value,
        });
    }
}

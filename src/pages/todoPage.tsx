import * as React from "react";
import * as ReactDOM from "react-dom";

import { TodoInput } from "../components/todoInput";
import { TodoListItem } from "../components/todoListItem";
import { Todo } from "../models/todo";
import { HttpClient } from "../services/httpClient";
import { TodoService } from "../services/todoService";

const style = require( "./todoPage.scss" );

export interface TodoPageProps {
    todoService: TodoService;
}

export interface TodoPageState {
    todos: Todo[];
}

export class TodoPage extends React.Component<TodoPageProps, TodoPageState> {

    constructor( props: TodoPageProps ) {
        super( props );
        this.state = {
            todos: [],
        };
    }

    public render() {
        return <div className={style.TodoPage}>
            <h1>My Todo Page</h1>
            <TodoInput onAddTodo={(t) => this.handleAddTodo(t)} ></TodoInput>
            <ul>
                {this.state.todos.map(
                    ( todo ) => <TodoListItem
                        key={todo.id}
                        todo={todo}
                        onDeleteTodo={(t) => this.handleDeleteTodo(t)} >
                    </TodoListItem>,
                )}
            </ul>
        </div>;
    }

    // Populate our todos when the page component is mounted
    public componentDidMount() {
        this.props.todoService
            .getAll()
            .subscribe(
                ( todos ) => {
                    this.setState({
                        todos,
                    });
                },
            );
    }

    // Handle the addition of a todo, i.e make an API call and save it.
    // We only update our state when we get a response.
    private handleAddTodo( todoTitle: string ) {
        this.props.todoService
            .add( todoTitle )
            .subscribe(
                ( todo ) => {
                    this.setState({
                        todos: [
                            ...this.state.todos,
                            todo,
                        ],
                    });
                },
            );
    }

    // Handle the deletion of a todo, i.e make the API call.
    // Again only update our state when its removed.
    private handleDeleteTodo( todo: Todo ) {
        this.props.todoService
            .delete( todo.id )
            .subscribe(
                () => {
                    this.setState({
                        todos: this.state
                            .todos
                            .filter( (t) => t.id !== todo.id ),
                    });
                },
            );
    }
}

export function createTodoPage( elementId: string ) {
    ReactDOM.render(
        <TodoPage todoService={new TodoService( new HttpClient() )}/>,
        document.getElementById( elementId ),
    );
}

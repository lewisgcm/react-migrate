import * as React from "react";
import { create } from "react-test-renderer";
import { of } from "rxjs";
import { instance, mock, when } from "ts-mockito";

import { TodoInput } from "../components/todoInput";
import { TodoListItem } from "../components/todoListItem";
import { Todo } from "../models/todo";
import { TodoService } from "../services/todoService";
import { TodoPage } from "./todoPage";

test( "Empty todo page", () => {
    const mockedTodoService = mock( TodoService );
    when( mockedTodoService.getAll() ).thenReturn( of([]) );

    const todoPage = create( <TodoPage todoService={instance( mockedTodoService )} /> );
    expect( todoPage ).toMatchSnapshot();
});

test( "Todo page with items", () => {
    const todo = {
        id: 0,
        userId: 1,
        title: "My todo",
        completed: true,
    } as Todo;

    const mockedTodoService = mock( TodoService );
    when( mockedTodoService.getAll() ).thenReturn( of([ todo ]) );

    const todoPage = create( <TodoPage todoService={instance( mockedTodoService )} /> );

    expect( todoPage ).toMatchSnapshot();
});

test( "Add todo", () => {
    const todo = {
        id: 0,
        userId: 1,
        title: "my todo",
        completed: true,
    } as Todo;
    const mockedTodoService = mock( TodoService );
    when( mockedTodoService.getAll() ).thenReturn( of([]) );
    when( mockedTodoService.add( "my todo" ) ).thenReturn( of( todo ) );

    const todoPage = create( <TodoPage todoService={instance( mockedTodoService )} /> );
    const input = todoPage.root
        .findByType( TodoInput )
        .find( (e) => e.type === "input" );

    input.props.onChange({ target: { value: "my todo" } });
    input.props.onKeyPress({ key: "Enter" });

    expect( todoPage ).toMatchSnapshot();
});

test( "Remove todo", () => {
    const todo = {
        id: 0,
        userId: 1,
        title: "my todo",
        completed: true,
    } as Todo;

    const mockedTodoService = mock( TodoService );
    when( mockedTodoService.getAll() ).thenReturn( of([ todo ]) );
    when( mockedTodoService.delete( 0 ) ).thenReturn( of({}) );

    const todoPage = create( <TodoPage todoService={instance( mockedTodoService )} /> );
    todoPage.root
        .findByType( TodoListItem )
        .find( (e) => e.type === "span" )
        .props.onClick({});

    expect( todoPage ).toMatchSnapshot();
});

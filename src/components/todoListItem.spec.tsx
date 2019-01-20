import * as React from "react";
import { create } from "react-test-renderer";

import { Todo } from "../models/todo";
import { TodoListItem } from "./todoListItem";

test( "Render todo list item", () => {
    const todo = {
        id: 0,
        userId: 1,
        title: "My todo",
        completed: true,
    } as Todo;

    const todoListItem = create( <TodoListItem todo={todo} onDeleteTodo={() => { /**/ }} /> );
    expect( todoListItem ).toMatchSnapshot();
});

test( "Delete todo list item", () => {
    const todo = {
        id: 0,
        userId: 1,
        title: "My todo",
        completed: true,
    } as Todo;

    const mockHandleDelete = jest.fn();
    const todoListItem = create( <TodoListItem todo={todo} onDeleteTodo={mockHandleDelete} /> );
    todoListItem.root.find( (e) => e.type === "span" ).props.onClick({});

    expect( todoListItem ).toMatchSnapshot();
    expect( mockHandleDelete ).toHaveBeenCalled();
});

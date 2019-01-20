import * as faker from "faker";
import { Observable, of } from "rxjs";
import { first } from "rxjs/operators";

import { Todo } from "../models/todo";
import { HttpClient } from "./httpClient";

export class TodoService {

    constructor(private httpClient: HttpClient) {
    }

    public getAll(): Observable<Todo[]> {
        return this.httpClient
            .Get<Todo[]>( "/api/todo/index.json" );
    }

    public get(id: number): Observable<Todo> {
        return this.httpClient
            .Get<Todo>( `/api/todo/${id}.json` );
    }

    // This is just a fake stub for adding a todo
    public add(title: string): Observable<Todo> {
        const fakeId = faker.random.number( 1000 );
        return of({
            id: fakeId,
            title,
            userId: fakeId,
            completed: false,
        }).pipe(
            first(),
        );
    }

    // Another fake stub for removing a todo
    public delete( todoId: number ): Observable<{}> {
        return of({}).pipe( first() );
    }
}

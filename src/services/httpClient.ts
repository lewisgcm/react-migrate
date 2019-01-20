import axios, { AxiosResponse } from "axios";
import { from, Observable } from "rxjs";
import { first, map } from "rxjs/operators";

export class HttpClient {
    public Get<T>( url: string ): Observable<T> {
        return from(
            axios.request<T>({
                method: "GET",
                url,
            }),
        ).pipe(
            map(
                ( response: AxiosResponse<T> ) => {
                    return response.data;
                },
            ),
            first(),
        );
    }
}

type BaseRequest<T, V> = (params ? : T) => Promise<Response>;

type SuccessResponse<V> = {
    code: "success";
    data: V;
};

type ErrorResponse<E = Error> = {
    code: "error";
    error: E;
};

type BaseResponse<V, E> = Promise<SuccessResponse<V> | ErrorResponse<E>>;

export const requestHandler = <T, V, E = Error>(request: BaseRequest<T, V>) =>
    async (params ? : T): BaseResponse<V, E> => {
        try {
            const response = await request(params);
            const data = await response.json();

            if (response.ok) {
                return { code: "success", data };
            } else {
                throw new Error(`Request failed with status: ${response.status}`);
            };

        } catch (error) {
            return { code: "error", error : error as E };
        };
    };

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE"
    body?: any
    headers?: Record<string, string>
}

class ApiClient {
    private async fetch<T>(
        endPoint: string,
        options: FetchOptions = {}
    ) : Promise<T>  {

        const {method="GET", headers = {}, body } = options

        const defaultHeaders = {
            "Content-Type": "application-json",
            ...headers
        }

        const responce = await fetch(`/api${endPoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined
        })

        if(!responce.ok) {
            throw new Error(await responce.json())
        } 

        return responce.json()
    }
}
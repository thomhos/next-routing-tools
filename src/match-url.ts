import { Route, RoutesMap } from './route'

export interface MatchedUrl {
    pathname: string
    query: object
    params: object
}

export const values = <T extends object, K extends keyof T>(obj: T): Array<T[K]> =>
    Object.keys(obj).map((k: K) => obj[k])

export const matchUrl = (routes: RoutesMap, url: string): Route | undefined => {
    if (!routes) {
        throw Error('You must provide routes!')
    }
    if (!url) {
        throw Error('You must provide a url!')
    }

    const matchedRoute = values(routes).filter(r => r.match(url))
    return matchedRoute && matchedRoute.length ? matchedRoute.pop() : undefined
}

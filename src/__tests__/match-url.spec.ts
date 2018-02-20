import { route, matchUrl, values } from '../'

describe('Match', () => {
    it('Creates an array of a map object', () => {
        const obj = { foo: { foo: 'foo' }, bar: { bar: 'bar' } }
        const arr = values(obj)

        expect(arr).toEqual([{ foo: 'foo' }, { bar: 'bar' }])
    })

    it('Creates an array of an empty map object', () => {
        const obj = {}
        const arr = values(obj)

        expect(arr).toEqual([])
    })

    it('Throws if no map provided', () => {
        try {
            // @ts-ignore
            const arr = values()
        } catch (e) {
            expect(e.message).toEqual('Cannot convert undefined or null to object')
        }
    })

    it('Matches a route', () => {
        const routes = {
            index: route('/', '/'),
            about: route('/about', '/about'),
            aboutPage: route('/about/:page', '/about-single'),
        }
        const R = matchUrl(routes, '/about')

        if (R) {
            expect(R.path).toEqual('/about')
            expect(R.page).toEqual('/about')
        } else {
            expect(R).toBeUndefined()
        }
    })

    it('Matches a route with param', () => {
        const routes = {
            index: route('/', '/'),
            about: route('/about', '/about'),
            aboutPage: route('/about/:page', '/about-single'),
        }
        const R = matchUrl(routes, '/about/something')

        if (R) {
            expect(R.path).toEqual('/about/:page')
            expect(R.page).toEqual('/about-single')
        } else {
            expect(R).toBeUndefined()
        }
    })

    it('Returns undefined when no match', () => {
        const routes = {
            index: route('/', '/'),
            about: route('/about', '/about'),
            aboutPage: route('/about/:page', '/about-single'),
        }
        const R = matchUrl(routes, '/foo')

        expect(R).toBeUndefined()
    })

    it('throws if no routes provided', () => {
        try {
            // @ts-ignore
            const R = matchUrl()
        } catch (e) {
            expect(e.message).toEqual('You must provide routes!')
        }
    })

    it('throws if no url provided', () => {
        try {
            // @ts-ignore
            const R = matchUrl({})
        } catch (e) {
            expect(e.message).toEqual('You must provide a url!')
        }
    })
})

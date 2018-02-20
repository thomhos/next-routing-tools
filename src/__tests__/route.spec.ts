import pathToRegex from 'path-to-regexp'
import { parse } from 'url'

import { route, stripParams, mergeParamsAndQuery } from '../'

describe('Create routes', () => {
    it('creates a route', () => {
        const indexRoute = route('/')

        expect(indexRoute.path).toEqual('/')
        expect(indexRoute.page).toEqual('/')
        expect(indexRoute.regex instanceof RegExp).toBe(true)
    })
})

describe('Match routes', () => {
    it('can match a route', () => {
        const indexRoute = route('/')

        expect(indexRoute.match('/')).toBe(true)
    })

    it('can match a route with a param', () => {
        const indexRoute = route('/blog/:slug', '/blog')

        expect(indexRoute.match('/blog/foooo')).toBe(true)
    })

    it('can match a route with multiple params', () => {
        const indexRoute = route('/blog/:slug/:action', '/blog')

        expect(indexRoute.match('/blog/foooo/comment')).toBe(true)
        expect(indexRoute.match('/blog/foooo')).toBe(false)
        expect(indexRoute.match('/blog/foooo/comment/success')).toBe(false)
    })
})

describe('Parse routes', () => {
    it('can parse a route', () => {
        const indexRoute = route('/blog')

        expect(indexRoute.parse('/blog')).toEqual({
            href: '/blog',
            paramsAndQuery: {},
            basepath: '/blog',
        })
    })

    it('can parse a route with params', () => {
        const indexRoute = route('/blog/:slug', '/blog')

        expect(indexRoute.parse('/blog/thing')).toEqual({
            href: '/blog?slug=thing',
            paramsAndQuery: {
                slug: 'thing',
            },
            basepath: '/blog',
        })
    })

    it('can parse a route with params and query', () => {
        const indexRoute = route('/blog/:slug', '/blog')

        expect(indexRoute.parse('/blog/thing?foo=bar')).toEqual({
            href: '/blog?foo=bar&slug=thing',
            paramsAndQuery: {
                slug: 'thing',
                foo: 'bar',
            },
            basepath: '/blog',
        })
    })

    it("can parse a route it doesn't know", () => {
        const indexRoute = route('/blog/:slug', '/blog')

        expect(indexRoute.parse('/')).toEqual({
            href: '/',
            paramsAndQuery: {},
            pathname: '/',
        })
    })

    it('can parse a route without path', () => {
        const indexRoute = route('/blog')

        // @ts-ignore
        expect(indexRoute.parse()).toEqual({
            href: null,
            paramsAndQuery: {},
            pathname: null,
        })
    })
})

describe('Handles errors', () => {
    it('throws if no page provided', () => {
        try {
            // @ts-ignore
            const indexRoute = route('/blog/:slug/:action')
        } catch (e) {
            expect(e.message).toEqual('You must define a page for this route')
        }
    })

    it('throws if no path provided', () => {
        try {
            // @ts-ignore
            const indexRoute = route()
        } catch (e) {
            expect(e.message).toEqual('You must define a path for this route')
        }
    })
})

describe('Strip params', () => {
    it('strips params from url', () => {
        let keys: pathToRegex.Key[] = []

        const path = '/blog/:slug'
        const url = '/blog/thing'
        const regex = pathToRegex(path, keys)

        const pathname = regex.exec(url)

        if (pathname) {
            const params = pathname.slice(1)
            expect(stripParams(params, url)).toEqual('/blog')
        }
    })

    it('strips multiple params from url', () => {
        let keys: pathToRegex.Key[] = []

        const path = '/blog/:slug/:action'
        const url = '/blog/thing/comment'
        const regex = pathToRegex(path, keys)

        const pathname = regex.exec(url)

        if (pathname) {
            const params = pathname.slice(1)
            expect(stripParams(params, url)).toEqual('/blog')
        }
    })

    it('strips multiple params from longer url', () => {
        let keys: pathToRegex.Key[] = []

        const path = '/blog/new/sorted/:slug/:action'
        const url = '/blog/new/sorted/thing/comment'
        const regex = pathToRegex(path, keys)

        const pathname = regex.exec(url)

        if (pathname) {
            const params = pathname.slice(1)
            expect(stripParams(params, url)).toEqual('/blog/new/sorted')
        }
    })

    it('strips path with hyphens', () => {
        let keys: pathToRegex.Key[] = []

        const path = '/blog-posts/:slug'
        const url = '/blog-posts/title'
        const regex = pathToRegex(path, keys)

        const pathname = regex.exec(url)

        if (pathname) {
            const params = pathname.slice(1)
            expect(stripParams(params, url)).toEqual('/blog-posts')
        }
    })

    it('returns path if no params', () => {
        let keys: pathToRegex.Key[] = []

        const path = '/blog'
        const url = '/blog'
        const regex = pathToRegex(path, keys)

        const values = regex.exec(url)

        if (values) {
            const params = values.slice(1)
            expect(stripParams(params, url)).toEqual('/blog')
        }
    })
})

describe('Merges params and query', () => {
    it('returns object if no params or query', () => {
        let keys: pathToRegex.Key[] = []

        const path = '/blog'
        const { pathname = '', query } = parse('/blog', true)
        const regex = pathToRegex(path, keys)

        const values = regex.exec(pathname)

        if (values) {
            const params = values.slice(1)
            expect(mergeParamsAndQuery(params, keys, query)).toEqual({})
        }
    })

    it('merges query only', () => {
        let keys: pathToRegex.Key[] = []

        const path = '/blog'
        const { pathname = '', query } = parse('/blog?foo=bar', true)
        const regex = pathToRegex(path, keys)

        const values = regex.exec(pathname)

        if (values) {
            const params = values.slice(1)
            expect(mergeParamsAndQuery(params, keys, query)).toEqual({ foo: 'bar' })
        }
    })

    it('merges special query only', () => {
        let keys: pathToRegex.Key[] = []

        const path = '/blog'
        const { pathname = '', query } = parse('/blog?foo=bar&foo=baz', true)
        const regex = pathToRegex(path, keys)

        const values = regex.exec(pathname)

        if (values) {
            const params = values.slice(1)
            expect(mergeParamsAndQuery(params, keys, query)).toEqual({ foo: ['bar', 'baz'] })
        }
    })

    it('merges query and params', () => {
        let keys: pathToRegex.Key[] = []

        const path = '/blog/:slug'
        const { pathname = '', query } = parse('/blog/thing?foo=bar&foo=baz', true)
        const regex = pathToRegex(path, keys)

        const values = regex.exec(pathname)

        if (values) {
            const params = values.slice(1)
            expect(mergeParamsAndQuery(params, keys, query)).toEqual({
                slug: 'thing',
                foo: ['bar', 'baz'],
            })
        }
    })

    it('merges multiple query and multiple params', () => {
        let keys: pathToRegex.Key[] = []

        const path = '/blog/:slug/:action'
        const { pathname = '', query } = parse(
            '/blog/thing/comment?hello=world&foo=bar&foo=baz',
            true,
        )
        const regex = pathToRegex(path, keys)

        const values = regex.exec(pathname)

        if (values) {
            const params = values.slice(1)
            expect(mergeParamsAndQuery(params, keys, query)).toEqual({
                slug: 'thing',
                action: 'comment',
                foo: ['bar', 'baz'],
                hello: 'world',
            })
        }
    })

    it('merges multiple query and multiple params in a longer path', () => {
        let keys: pathToRegex.Key[] = []

        const path = '/some/blog/:slug/:action'
        const { pathname = '', query } = parse(
            '/some/blog/thing/comment?hello=world&foo=bar&foo=baz',
            true,
        )
        const regex = pathToRegex(path, keys)

        const values = regex.exec(pathname)

        if (values) {
            const params = values.slice(1)
            expect(mergeParamsAndQuery(params, keys, query)).toEqual({
                slug: 'thing',
                action: 'comment',
                foo: ['bar', 'baz'],
                hello: 'world',
            })
        }
    })
})

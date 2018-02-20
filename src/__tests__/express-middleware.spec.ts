import { Request, Response } from 'express'
import { route, handleExpress } from '../'

const mockApp = {
    render(req: Request, res: Response, page: string, query: any) {
        return {
            req,
            res,
            page,
            query,
        }
    },
    getRequestHandler: () => (req: Request, res: Response, query: any) => {
        return {
            req,
            res,
            query,
        }
    },
}

describe('Express handler', () => {
    it('Handles a request', () => {
        const routes = {
            index: route('/', '/'),
        }
        // @ts-ignore
        const handle = handleExpress(routes, mockApp)

        // @ts-ignore
        const result = handle({ url: '/' }, {})

        expect(result).toEqual({
            req: { url: '/' },
            res: {},
            page: '/',
            query: {},
        })
    })

    it('Handles a request with a param', () => {
        const routes = {
            index: route('/:thing', '/'),
        }
        // @ts-ignore
        const handle = handleExpress(routes, mockApp)

        // @ts-ignore
        const result = handle({ url: '/foo' }, {})

        expect(result).toEqual({
            req: { url: '/foo' },
            res: {},
            page: '/',
            query: { thing: 'foo' },
        })
    })

    it("Handles a request that's not a route", () => {
        const routes = {
            index: route('/', '/'),
        }
        // @ts-ignore
        const handle = handleExpress(routes, mockApp)

        // @ts-ignore
        const result = handle({ url: '/foo' }, {})

        expect(result).toEqual({
            req: { url: '/foo' },
            res: {},
            query: {
                protocol: null,
                slashes: null,
                auth: null,
                host: null,
                port: null,
                hostname: null,
                hash: null,
                search: '',
                query: {},
                pathname: '/foo',
                path: '/foo',
                href: '/foo',
            },
        })
    })

    it('Handles a request without a url', () => {
        const routes = {
            index: route('/', '/'),
        }
        // @ts-ignore
        const handle = handleExpress(routes, mockApp)

        try {
            // @ts-ignore
            const result = handle({ url: undefined }, {})
        } catch (e) {
            expect(e.message).toEqual('You must provide a url!')
        }
    })
})

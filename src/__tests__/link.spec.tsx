import React from 'react'
import { create } from 'react-test-renderer'

import { Link, route, RoutesMap, RouteProvider } from '../'

const renderWithContext = (routes: RoutesMap) => (Comp: JSX.Element) =>
    create(<RouteProvider routes={routes}>{Comp}</RouteProvider>)

describe('Link', () => {
    it('has the correct properties', () => {
        expect(Link.contextTypes).toHaveProperty('routes')
    })

    it('renders a basic route', () => {
        const routes = { index: route('/', '/') }
        const link = renderWithContext(routes)(
            <Link href={routes.index.path}>
                <a>Test</a>
            </Link>,
        )

        const snap = link.toJSON()
        expect(snap).toMatchSnapshot()
    })

    it('renders a dynamic route', () => {
        const routes = { blogPost: route('/blog/:id', '/blog') }
        const link = renderWithContext(routes)(
            <Link href="/blog/thing">
                <a>Test</a>
            </Link>,
        )

        const snap = link.toJSON()
        expect(snap).toMatchSnapshot()
    })

    it('renders a multi dynamic route', () => {
        const routes = { blogPost: route('/blog/:id/:action', '/blog') }
        const link = renderWithContext(routes)(
            <Link href="/blog/thing/comment">
                <a>Test</a>
            </Link>,
        )

        const snap = link.toJSON()
        expect(snap).toMatchSnapshot()
    })

    it('renders a dynamic route with query', () => {
        const routes = { blogPost: route('/blog/:id', '/blog') }
        const link = renderWithContext(routes)(
            <Link href="/blog/thing?foo=bar">
                <a>Test</a>
            </Link>,
        )

        const snap = link.toJSON()
        expect(snap).toMatchSnapshot()
    })

    it('renders an external route', () => {
        const routes = { blogPost: route('/blog/:id', '/blog') }
        const link = renderWithContext(routes)(
            <Link href="/external">
                <a>Test</a>
            </Link>,
        )

        const snap = link.toJSON()
        expect(snap).toMatchSnapshot()
    })

    it('renders an external route with query', () => {
        const routes = { blogPost: route('/blog/:id', '/blog') }
        const link = renderWithContext(routes)(
            <Link href="/external?foo=bar">
                <a>Test</a>
            </Link>,
        )

        const snap = link.toJSON()
        expect(snap).toMatchSnapshot()
    })
})

import React from 'react'
import propTypes from 'prop-types'
import { create } from 'react-test-renderer'

import { route, RoutesMap, RouteProvider } from '../'

class ProviderTester extends React.Component {
    public context: { routes: RoutesMap }

    static contextTypes = {
        routes: propTypes.object,
    }

    public render() {
        return <div>routes: {JSON.stringify(this.context.routes)}</div>
    }
}

describe('RouteProvider', () => {
    it('Has a context type', () => {
        expect(RouteProvider.childContextTypes).toHaveProperty('routes')
    })

    it('Renders', () => {
        const routes = {
            index: route('/', '/'),
        }
        const comp = create(
            <RouteProvider routes={routes}>
                <ProviderTester />
            </RouteProvider>,
        )
        const tree = comp.toJSON()
        expect(tree).toMatchSnapshot()
    })
})

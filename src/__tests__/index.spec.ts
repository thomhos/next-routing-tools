import * as pkg from '../'

describe('Express handler', () => {
    it('Exports everything', () => {
        expect(typeof pkg.handleExpress).toEqual('function')
        expect(typeof pkg.matchUrl).toEqual('function')
        expect(typeof pkg.route).toEqual('function')
        expect(typeof pkg.Route).toEqual('function')
        expect(typeof pkg.values).toEqual('function')
    })
})

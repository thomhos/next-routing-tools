import * as pkg from '../'
import * as express from '../express'

describe('Package', () => {
    it('Exports everything', () => {
        expect(typeof pkg.matchUrl).toEqual('function')
        expect(typeof pkg.route).toEqual('function')
        expect(typeof pkg.Route).toEqual('function')
        expect(typeof pkg.values).toEqual('function')
    })
})

describe('Express package', () => {
    it('Exports everything', () => {
        expect(typeof express.handle).toEqual('function')
    })
})

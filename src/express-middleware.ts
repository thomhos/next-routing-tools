import { Request, Response } from 'express'
import { Server } from 'next'
import { parse } from 'url'

import { RoutesMap } from './route'
import { matchUrl } from './match-url'

/**
 *
 * @param routes
 * @param app
 */
export const handleExpress = (routes: RoutesMap, app: Server) => (req: Request, res: Response) => {
    const url = req.url || ''
    const route = matchUrl(routes, url)

    if (route) {
        const { paramsAndQuery } = route.parse(url)
        return app.render(req, res, route.page, paramsAndQuery)
    } else {
        const handle = app.getRequestHandler()
        return handle(req, res, parse(req.url, true))
    }
}

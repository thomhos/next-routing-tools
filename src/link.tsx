import React from 'react'
import propTypes from 'prop-types'
import NextLink, { LinkState } from 'next/link'
import { RoutesMap } from './route'
import { matchUrl } from './match-url'

export type PartialLinkState = Pick<
    LinkState,
    'prefetch' | 'shallow' | 'replace' | 'onError' | 'passHref' | 'children'
>

export interface LinkProps extends PartialLinkState {
    href: string
}

export class Link extends React.Component<LinkProps> {
    public context: { routes: RoutesMap }

    static contextTypes = {
        routes: propTypes.object,
    }

    public render() {
        const { href: url } = this.props
        const routes = this.context.routes || {}
        const route = matchUrl(routes, url)

        if (route) {
            const { href } = route.parse(url)

            return <NextLink {...this.props} href={href} as={url} />
        }

        return <NextLink {...this.props} />
    }
}

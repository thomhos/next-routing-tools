import React from "react";
import propTypes from "prop-types";
import NextLink, { LinkState } from "next/link";
import { RoutesMap } from "./route";
import { matchUrl } from "./match-url";

export type LinkProps = LinkState;

export class Link extends React.Component<LinkProps> {
  public context: { routes: RoutesMap };

  static contextTypes = {
    routes: propTypes.object
  };

  public render() {
    const url = this.props.href;
    const routes = this.context.routes || {};
    const route = matchUrl(routes, url as string);

    if (route) {
      const { href } = route.parse(url as string);

      return <NextLink {...this.props} href={href} as={url} />;
    }

    return <NextLink {...this.props} />;
  }
}

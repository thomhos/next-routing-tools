import React from "react";
import propTypes from "prop-types";

import { RoutesMap } from "./route";

export interface RouteProviderProps {
  routes: RoutesMap;
}

export class RouteProvider extends React.Component<RouteProviderProps> {
  static childContextTypes = {
    routes: propTypes.object
  };

  static propTypes = {
    routes: propTypes.object
  };

  public getChildContext() {
    return {
      routes: this.props.routes
    };
  }

  public render() {
    return this.props.children;
  }
}

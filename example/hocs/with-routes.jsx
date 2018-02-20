import React from "react";

import { RouteProvider } from "../../";
import routes from "../routes";

export function withRoutes(Component) {
  return class withRoutesHoc extends React.Component {
    static async getInitialProps(ctx) {
      return Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {};
    }

    render() {
      return (
        <RouteProvider routes={routes}>
          {JSON.stringify(this.props)}
          <Component {...this.props} />
        </RouteProvider>
      );
    }
  };
}

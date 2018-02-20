import { withRoutes } from "../hocs/with-routes";

class BlogSingle extends React.Component {
  render() {
    return <div>Hello blog item</div>;
  }
}

export default withRoutes(BlogSingle);

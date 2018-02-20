import { Link } from "../../dist";

import { withRoutes } from "../hocs/with-routes";

export default withRoutes(() => (
  <div>
    Hello world -
    <Link href="/blog">
      <a>Blog</a>
    </Link>
  </div>
));

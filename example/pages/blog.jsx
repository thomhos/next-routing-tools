import { Link } from "../../dist";

import { withRoutes } from "../hocs/with-routes";

export default withRoutes(() => (
  <div>
    Hello blog -{" "}
    <Link href="/blog/the-greatest-thing">
      <a>Articlea</a>
    </Link>
  </div>
));

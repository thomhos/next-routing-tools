# WORK IN PROGRESS

TODO

* handle href as object instead of string
* more integration tests
* include polyfills or not?

## Define routes

```
import { route } from 'next-routing-tools'

const routes = {
    index: route('/'),
    about: route('/about'),
    blog: route('/blog'),
    blogPost: route('/blog/:slug', '/blog-single')
}
```

## Server-side

```
import { handleExpress } from 'next-routing-tools'

const server = express()
const app = next()

// If you want to do more than just render you can use this.
server.get(routes.blogPost.path, (req, res) => {
    // do more stuff here
    app.render(req, res, '/blog-single', { slug: req.params.slug })
})

// Otherwise just let the routes be handled automatically
server.get('*', handleExpress(routes, app))
```

## Client-side

```
import { RouteProvider } from 'next-routing-tools'

// Provide routes
<RouteProvider routes={routes}>
    <Component {...props} />
</RouteProvider>

import { Link } from 'next-routing-tools'

// Then somewhere in your app use
<Link href='/blog/fooo' />
```

Heavily inspired by next-routes. But as I was using typescript I wanted a slightly different api.
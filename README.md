# Next routing tools!

Easy dynamic routing, with first-class typescript support.

TODO:
* handle href as object instead of string

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
import { handle } from 'next-routing-tools/express'

const server = express()
const app = next()

app.prepare().then(() => {
    // let the routes be handled automatically
    server.get('*', handle(routes, app))

    // Or, if you want to do more than just render you can use this.
    server.get(routes.blogPost.path, (req, res) => {
        // do more stuff here
        app.render(req, res, '/blog-single', { slug: req.params.slug })
    })
})
```

## Client-side

```
import { RouteProvider } from 'next-routing-tools'

// Provide routes
<RouteProvider routes={routes}>
    <Component {...props} />
</RouteProvider>

-- 

import { Link } from 'next-routing-tools'

// Then somewhere in your app use
<Link href='/blog/fooo' />
```

Heavily inspired by next-routes (thanks!). But as I was using typescript I wanted a slightly different api.

# Development

* Install dependencies: `npm i`
* Run tests: `npm run test`
* Run build: `npm run build`
* Run example: `npm run example`
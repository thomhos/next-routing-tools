# Next routing tools!

Easy dynamic routing, with first-class typescript support.

## Define routes

You have to define all possible routes in advance.
The first argument of the route is the path (as seen in the browser).
The second argument is the page (relative from the /pages directory) that should be rendered in Next.

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

Import the routes and the handler (in this case for express).
Then let the handler take on all requests.

If you want to do some more custom things before rendering,
you can do so by just using the values from a route.

```
import { handle } from 'next-routing-tools/express'
import { routes } from './routes'

const server = express()
const app = next()

app.prepare().then(() => {
    // let the routes be handled automatically
    server.get('*', handle(routes, app))

    // Or, if you want to do more than just render you can use this.
    server.get(routes.blogPost.path, (req, res) => {
        // do more stuff here
        app.render(req, res, routes.blogPost.page, { slug: req.params.slug })
    })
})
```

## Client-side

On the client side you have to first set up the RouteProvider.
This will make sure all Link components have access to the routes available in this app.

You can then use the Link component and provide an href which includes the params (and optionally query params).

I'm still figuring out what's the best approach for also providing routes as objects, or just parameters as object.
If you have any ideas for this API, please create an issue and I can take a look.

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
<Link href='/blog/fooo?something=true' />
```

Heavily inspired by next-routes (thanks!). But as I was using typescript I wanted a slightly different api.

# Development

* Install dependencies: `npm i`
* Run tests: `npm run test`
* Run build: `npm run build`
* Run example: `npm run example`
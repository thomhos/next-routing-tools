# WORK IN PROGRESS

TODO

* handle href as object instead of string
* more integration tests
* include polyfills or not?

## Define routes

```
import { route } from 'next-router'
const routes = {
    index: route('/'),
    about: route('/about'),
    blog: route('/blog'),
    blogPost: route('/blog/:slug', '/blog-single')
}

// returns a route class
route('/blog')
{
    get page() {
        return this._path
    }

    get path() {
        return this._path
    }
}
```

## Server-side

```
const server = express()
const app = next()

// If you want to do more than just render you can use this.
server.get(routes.blogPost, (req, res) => {
    // do more stuff here
    app.render(req, res, '/blog', { slug: req.params.slug })
})

// Otherwise just let the routes be handled automatically
server.get(handle(routes, app))
```

## Client-side

```
// Provide routes
<RouteProvider routes={routes}>
    <App />
</RouteProvider>

// Then somewhere in your app use
<Link href='/blog/fooo' />
<Link href={{ path: routes.blogPost, params: { slug: 'foooo' } }}>
```

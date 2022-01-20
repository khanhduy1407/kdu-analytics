## Page tracking

Page tracking is the most important feature of Google Analytics and you can achieve that in different ways

### Enable page auto tracking

The most easy way to track your application, is to pass your KduRouter instance to the plugin and let it handle everything for you

```js
import Kdu from 'kdu'
import KduRouter from 'kdu-router'
import KduAnalytics from 'kdu-analytics'

const router = new KduRouter({
  router: // your routes
})

Kdu.use(KduAnalytics, {
  id: 'UA-XXX-X',
  router
})
```

### Manual page tracking

The standard way is just passing the current page path

```js
this.$ga.page('/')
```

passing as an object literal

```js
this.$ga.page({
  page: '/',
  title: 'Home page',
  location: window.location.href
})
```

or you can even pass the KduRouter instance scoped in your component and the plugin will automatically detect the current route name, path and location: just be sure to add the `name` property in your route object

```js
this.$ga.page(this.$router)
```

Google Analytics docs: [page tracking](https://developers.google.com/analytics/devguides/collection/analyticsjs/pages)

### Use screenview with autotracking

It is also possible to use autotracking and screen tracking by passing true to the `screeview` property in the `autoTracking` object

```js
import Kdu from 'kdu'
import KduAnalytics from 'kdu-analytics'

Kdu.use(KduAnalytics, {
  id: 'UA-XXX-X',
  autoTracking: {
    screenview: true
  }
})
```

### Disable pageview hit on page load

Page auto tracking sends a pageview event on page load, but it is possible to disable that

```js
import Kdu from 'kdu'
import KduRouter from 'kdu-router'
import KduAnalytics from 'kdu-analytics'

const router = new KduRouter({
  router: // your routes
})

Kdu.use(KduAnalytics, {
  id: 'UA-XXX-X',
  router,
  autoTracking: {
    pageviewOnLoad: false
  }
})
```

### Disable page auto tracking

To disable auto tracking we can just remove the KduRouter instance, but if you need to track only in specific environment or situations, it is also possible to disable page auto tracking like so

```js
Kdu.use(KduAnalytics, {
  id: 'UA-XXX-X',
  router,
  autoTracking: {
    page: false
  }
})
```

### Ignore routes on page auto tracking

To disable auto tracking for specific routes, you need to pass an array of strings to the plugin options.
The string needs to be the route `name` or the route `path`.

```js
Kdu.use(KduAnalytics, {
  router,
  ignoreRoutes: ['home', '/contacts']
})
```

### Auto track with custom data

When auto-tracking is possible to pass a function with a custom object shape to use as a tracker.

The `pageViewTemplate` passes the current route as parameter

```js
Kdu.use(KduAnalytics, {
  id: 'UA-XXX-X',
  router,
  autoTracking: {
    pageviewTemplate (route) {
      return {
        page: route.path,
        title: document.title,
        location: window.location.href
      }
    }
  }
})
```

It is also possible to add custom data structure for each route, using the meta object

```js
import Kdu from 'kdu'
import KduAnalytics from 'kdu-analytics'
import KduRouter from 'kdu-router'

const router = new KduRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: {...},
      meta: {
        analytics: {
          pageviewTemplate (route) {
            return {
              title: 'This is my custom title',
              page: route.path,
              location: 'www.mydomain.com'
            }
          }
        }
      }
    }
  ]
})

```
important: the route pageviewTemplate has always priority over the global one.


## Avoid transforming route query object into querystring
It is possible to avoid route query to be sent as querystring using the `transformQueryString` property

```js
Kdu.use(KduAnalytics, {
  id: 'UA-XXX-X',
  router,
  autoTracking: {
    transformQueryString: false
  }
})
```

## Remove kdu-router base option
When a base path is added to the KduRouter instance, the path is merged to the actual router path during the automatic tracking: however it is still possible to remove this behaviour modifying the `prependBase` property in the configuration object

```js
Kdu.use(KduAnalytics, {
  id: 'UA-XXX-X',
  router,
  autoTracking: {
    prependBase: false
  }
})
```

## Customize router updates
On every route change, the plugin will track the new route: when we change hashes, query strings or other parameters.

To avoid router to update and start tracking when a route has the same path of the previous one, it is possible to use the `skipSamePath` property in the `autoTracking` object

```js
Kdu.use(KduAnalytics, {
  id: 'UA-XXX-X',
  router,
  autoTracking: {
    skipSamePath: true
  }
})
```

For other use cases it is also possible to use the `shouldRouterUpdate`, accessable in the plugin configuartion object, inside the `autoTracking` property.
The methods has the previous and current route as parameters and it needs to return a truthy or falsy value.

```js
Kdu.use(KduAnalytics, {
  id: 'UA-XXX-X',
  router,
  autoTracking: {
    shouldRouterUpdate (to, from) {
      // Here I'm allowing tracking only when
      // next route path is not the same as the previous
      return to.path !== from.path
    }
  }
})
```

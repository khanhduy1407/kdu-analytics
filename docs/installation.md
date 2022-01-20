## Get started

### Installation
```bash
npm install kdu-analytics
```

Start using it your Kdu application
```js
import Kdu from 'kdu'
import KduAnalytics from 'kdu-analytics'

Kdu.use(KduAnalytics, {
  id: 'UA-XXX-X'
})
```

**Important**

For all the ES5 users out there, this package uses a default export so if you want to use `require` instead of `import` you should import the plugin like this

```js
const KduAnalytics = require('kdu-analytics').default

Kdu.use(KduAnalytics, { ... })
```

### Usage
it is possible to use the api in two different ways:
 - within the component scope
 - importing methods separately

#### Component scope

```js
export default {
  name: 'MyComponent',

  methods: {
    track () {
      this.$ga.page('/')
    }
  }
}
```

#### Import methods

To be able to use methods import, make sure you install kdu-analytics **before** you want to use them

```js
import { page } from 'kdu-analytics'

export default {
  name: 'MyComponent',

  methods: {
    track () {
      page('/')
    }
  }
}
```

#### API
- event
- ecommerce
- set
- page
- query
- screenview
- time
- require
- exception
- social

## Track multiple accounts

Pass an array of strings for a multiple tracking system. Every hit will be fired twice: each time with a different tracker name

```js
import Kdu from 'kdu'
import KduAnalytics from 'kdu-analytics'

Kdu.use(KduAnalytics, {
  id: ['UA-XXX-A', 'UA-XXX-B']
})
```

## Use functions or/and Promises

It is also possible to pass a function, a Promise or a function that returns a Promise: as soon as it returns always a string or an array of strings

```js
import Kdu from 'kdu'
import KduAnalytics from 'kdu-analytics'
import axios from 'axios'

// a function
Kdu.use(KduAnalytics, {
  id () {
    return 'UA-XXX-A'
  }
})

// a Promise
Kdu.use(KduAnalytics, {
  id: axios.get('/api/foo').then(response => {
    return response.data
  })
})

// a function that returns a Promise
Kdu.use(KduAnalytics, {
  id: () => axios.get('/api/foo').then(response => {
    return response.data
  })
})
```

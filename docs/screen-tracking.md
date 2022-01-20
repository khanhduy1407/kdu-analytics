## Screen tracking

Screen hits can be sent using the `screenview` method.

By passing a string it will track the page by sending a screenview event with the string as screenName property.

```js
export default {
  name: 'MyComponent',

  methods: {
    track () {
      this.$ga.screenview('home')
    }
  }
}
```

it is also possible to pass an object literal to fully customize the event

```js
export default {
  name: 'MyComponent',

  methods: {
    track () {
      this.$ga.screenview({
        screenName: 'home',
        ... // other properties
      })
    }
  }
}
```

## Screen autotracking

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

**Route name property is mandatory**
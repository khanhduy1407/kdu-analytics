## Set

Sets a single field and value pair or a group of field/value pairs on a tracker object.

```js
this.$ga.set(fieldName, fieldValue)
```

also possible to pass an object literal

```js
this.$ga.set({ fieldName: fieldValue })
```

### Set multiple fields before first hit
Adding the `set` property to the configuration object, we can set multiple fields automatically before the first hit

```js
import Kdu from 'kdu'
import KduAnalytics from 'kdu-analytics'

Kdu.use(KduAnalytics, {
  id: 'UA-XXX-X',
  set: [
    { field: 'fieldname', value: 'fieldvalue' }
  ]
})
```

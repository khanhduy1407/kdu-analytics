## Event batches

It is possible to fire event using a queue that will be processed on a certain rate.
The gap between each cycle and the amount of events fired on each cycle is totally customizable: default options are 2 events every 500ms.

```js
import Kdu from 'kdu'
import KduAnalytics from 'kdu-analytics'

Kdu.use(KduAnalytics, {
  id: 'UA-XXX-X',
  batch: {
    enabled: true, // enable/disable
    amount: 2, // amount of events fired
    delay: 500 // delay in milliseconds
  }
})
```
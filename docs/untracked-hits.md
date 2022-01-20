## Untracked hits

Due to different types of connections, loading Google Analytics script and having the application up and running at the same time can be difficult and leading to untracked hits.

KduAnalytics takes care of this eventuality by storing all untracked events and track them later on, but if for some reasons you don't like that, is possible to turn this feature off

```js
import Kdu from 'kdu'
import KduAnalytics from 'kdu-analytics'

Kdu.use(KduAnalytics, {
   id: 'UA-XXX-X',
   autotracking: {
     untracked: false
   }
})
```
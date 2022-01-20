## Kduxs and Google Analytics

To be able to use kdu-analytics from your Kduxs store, just import the methods you need and fire it directly from the store

## First step
Make sure to have your kdu-analytics package installed **before** start using it in your store

```js
// main.js
import Kdu from 'kdu'
import store from './store'
import App from './App'
import KduAnalytics from 'kdu-analytics'

Kdu.use(KduAnalytics, {
  id: 'UA-xxxx-1'
})

new Kdu({
  store,
  render: h => h(App)
}).$mount('#app')
```

## Second step
Start using kdu-analytics API in your store

```js
// store.js
import Kdu from 'Kdu'
import Kduxs from 'kduxs'
import { event } from 'Kdu-analytics'

Kdu.use(Kduxs)

export default new Kduxs.Store({
  state: {
    counter: 0
  },
  actions: {
    increase ({ commit, state }) {
      commit('increase', state.counter + 1)
    }
  },
  mutations: {
    increase (state, payload) {
      state.counter = payload
      event('user-click', 'increase', 'counter', state.counter)
    }
  }
})
```

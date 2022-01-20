## v-ga

This directive allows us to centralize all track events in one object and share it across the entire application without needs to add extra logic to our component methods

Taking as an example a button that only has to log a name in the console

```html
<template>
    <button @click="logName">Log me</button>
</template>

<script>
   export default {
      name: 'myComponent',
      data () {
         return {
            name: 'John'
         }
      },
      methods: {
         logName () {
            console.log(this.name)
         }
      }
   }
</script>
```

To start tracking the value of `name` we can start by adding a method in the commands object that handles this action

```js
import Kdu from 'kdu'
import KduAnalytics from 'kdu-analytics'

Kdu.use(KduAnalytics, {
   id: 'UA-XXX-X',
   commands: {
      trackName (name = 'unknown') {
         this.$ga.event('randomClicks', 'click', 'name', name)
      }
   }
})
```
Lets take in mind that every function we write in the `commands` object is also bound to the current component scope, so that we have access to the Kdu instance prototype object and eventually to methods, data and computed values of the component itself. __(I do not recommend to use any component specific properties to avoid the method to be coupled to a specific component structure)__

Then we only need to add the `v-ga` directive to your element and access the method from the `commands` list that now is shared in the `$ga` object

```html
<template>
   <button 
      v-ga="$ga.commands.trackName.bind(this, name)" 
      @click="logName">
	Log me
   </button>
</template>

<script>
   export default {
      name: 'myComponent',
      data () {
         return {
            name: 'John'
         }
      },
      methods: {
         logName () {
            console.log(this.name)
         }
      }
   }
</script>
```

By default, the directive is executed when the element is clicked. However, if you want to change the event type for the logging, you can add the proper event as a modifier.

```html
<template>
   <input
      v-model="name"
      v-ga.focus="$ga.commands.trackFocus.bind(this, 'name')" />
</template>

<script>
   export default {
      name: 'myComponent',
      data () {
         return {
            name: 'John'
         }
      },
      methods: {
         logName () {
            console.log(this.name)
         }
      }
   }
</script>
```

If there's no need to pass any arguments, we could also just pass the name of the method as a string, and the plugin will look it up for us

```html
<template>
   <button v-ga="'trackName'">Click me</button>
</template>

<script>
   export default {
      name: 'myComponent'
   }
</script>
```

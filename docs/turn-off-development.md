## Turn off during development

Stop sending hit to your domain during development

Example:

```js
Kdu.use(KduAnalytics, {
  id: 'UA-XXX-X',
  debug: {
    sendHitTask: false
  }
})
```

or assign directly your NODE_ENV variable to enable/disable it automatically

```js
Kdu.use(KduAnalytics, {
  id: 'UA-XXX-X',
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  }
})
```

Google Analytics docs: [debugging](https://developers.google.com/analytics/devguides/collection/analyticsjs/debugging)

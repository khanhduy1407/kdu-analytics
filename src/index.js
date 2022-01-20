import bootstrap from './bootstrap'
import lib from './lib'
import { update } from './config'
import * as helpers from './helpers'
import ga from 'directives/ga'
import { autotracking as expectionAutotracking } from 'lib/exception'
import kduxsMiddleware from './kduxs-middleware'

export default function install (Kdu, options = {}) {
  update({ ...options, $kdu: Kdu })

  Kdu.directive('ga', ga)
  Kdu.prototype.$ga = Kdu.$ga = lib

  expectionAutotracking(Kdu)
  bootstrap()
}

// Kduxs middleware
export const analyticsMiddleware = kduxsMiddleware

// Helpers
export const onAnalyticsReady = helpers.onAnalyticsReady

// Event library
export const event = lib.event
export const ecommerce = lib.ecommerce
export const set = lib.set
export const page = lib.page
export const query = lib.query
export const screenview = lib.screenview
export const time = lib.time
export const require = lib.require
export const exception = lib.exception
export const social = lib.social



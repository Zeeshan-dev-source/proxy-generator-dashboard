// Payment method badges are loaded as raw SVG so the on/off state can change their opacity
import stripeSvg from '../assets/admin/pay-stripe.svg?raw'
import bitcoinSvg from '../assets/admin/pay-bitcoin.svg?raw'
import visaSvg from '../assets/admin/pay-visa.svg?raw'
import bitpaySvg from '../assets/admin/pay-bitpay.svg?raw'
import applePaySvg from '../assets/admin/pay-applepay.svg?raw'

export const siteDefaults = { title: '', description: '' }

// Sample keys from the design until the API is connected. Stripe and Bitcoin are enabled in the design.
const sampleKey = '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx'
export const paymentMethods = [
  { id: 'stripe', name: 'Stripe', svg: stripeSvg, width: 68, enabled: true, key: sampleKey },
  { id: 'bitcoin', name: 'Bitcoin', svg: bitcoinSvg, width: 68, enabled: true, key: sampleKey },
  { id: 'visa', name: 'Visa', svg: visaSvg, width: 68, enabled: false, key: sampleKey },
  { id: 'bitpay', name: 'Bitpay', svg: bitpaySvg, width: 68, enabled: false, key: sampleKey },
  { id: 'applepay', name: 'Apple Pay', svg: applePaySvg, width: 69, enabled: false, key: sampleKey },
]

export const resellers = [
  { id: 'reseller-1', name: 'Reseller 1', username: '', apiKey: '', endpoint: '' },
  { id: 'reseller-2', name: 'Reseller 2', username: '', apiKey: '', endpoint: '' },
  { id: 'reseller-3', name: 'Reseller 3', username: '', apiKey: '', endpoint: '' },
]

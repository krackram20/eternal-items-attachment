import { IOClients } from '@vtex/api'
import { Checkout } from './cart'
import { MessagesGQL } from './messages'

import Status from './status'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }
  public get checkout() {

    return this.getOrSet('checkout', Checkout)
  }
  public get messages() {
    return this.getOrSet('messages', MessagesGQL)
  }
}

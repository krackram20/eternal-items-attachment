import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export class Checkout extends JanusClient {
    constructor(context: IOContext, options?: InstanceOptions) {
        super(context, { ...options })
    }

  public orderForm = (orderFormId: string): any => {
      if(!orderFormId) {
        return
      }
      return this.http.post(
          `/api/checkout/pub/orderForm/${orderFormId}`,
          { expectedOrderFormSections: ['items', 'salesChannel'] },
          {
            headers: {
              'vtexidclientautcookie': this.context.authToken
            }
          }
      )
  }

  public addAttachment = (orderFormId: string, name: string, index: number) => {
      return this.http.post(
          `/api/checkout/pub/orderForm/${orderFormId}/items//${index}/attachments/Hungarian%20Name`,
          {  content: { name } },
          {
            headers: {
              'vtexidclientautcookie': this.context.authToken
            }
          }
      )
  }

  public associateAttachment = (SkuId: number) => {
      return this.http.post(
          `/api/catalog/pvt/skuattachment`,
          {  AttachmentId: 5, SkuId },
          {
            headers: {
              'vtexidclientautcookie': this.context.authToken
            }
          }
      )
  }


}

import { json } from 'co-body'

export async function addAttachment(ctx: Context, next: () => Promise<any>) {

  const { clients: { checkout, messages } } = ctx
  const body = await json(ctx.req)
  const orderForm = await checkout.orderForm(body?.orderFormId)
  const { items } = orderForm

  if (items.length === 0) {
    ctx.status = 200
    ctx.body = { data: []}
  }

  const res = await Promise.all(
    items.map(async (item:any, index: number) => {
      try {

        if( !item.attachmentOfferings.some(( obj:any) =>
          obj.name === 'Hungarian Name' )) {
         return { message: `sku ${item.id } not associated to attachment 5`, index, sku: item.id }
        }

        const gqlResponse = await messages.getTranslation(
          {
            "args2": {
              "indexedByFrom": [
                {
                 "from": "ro-RO",
                 "messages": [
                    {
                      "content": item.name,
                      "context": item.id
                    }
                  ]
                }
              ],
              "to": "hu-HU"
            }
          }
        )

        const { data }:any = gqlResponse

        if (data?.translate.length === 0) {
          return { translation: 'No translation available'}
        }

        const translation = data?.translate[0]

        await checkout.addAttachment(body.orderFormId, translation, index)

        return { translation, index, sku: item.id }

      } catch(e) {
        return { error: e.message,  sku: item.id}
      }
    })
  )


  ctx.status = 200
  ctx.body = { data: res}

  await next()
}

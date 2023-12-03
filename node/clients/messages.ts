import { AppGraphQLClient, InstanceOptions, IOContext } from '@vtex/api'

const MESSAGES_GRAPHQL_APP = 'vtex.messages@1.x'

export class MessagesGQL extends AppGraphQLClient {
  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super(MESSAGES_GRAPHQL_APP, ctx, opts)
  }

  public async getTranslation(saveArgs: any) {
    return this.graphql.query({
      query: `query GetTranslation($args2: TranslateArgs!) {
        translate(args: $args2)
      }
      `,
      variables: {
        ...saveArgs,
      },
    })
  }
}

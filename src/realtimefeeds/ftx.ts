import { Filter } from '../types'
import { RealTimeFeedBase } from './realtimefeed'

export class FtxRealTimeFeed extends RealTimeFeedBase {
  protected wssURL = 'wss://ftx.com/ws/'

  protected mapToSubscribeMessages(filters: Filter<string>[]): any[] {
    return filters
      .map((filter) => {
        if (!filter.symbols || filter.symbols.length === 0) {
          throw new Error('FtxRealTimeFeed requires explicitly specified symbols when subscribing to live feed')
        }

        return filter.symbols.map((symbol) => {
          return {
            op: 'subscribe',
            channel: filter.channel,
            market: symbol
          }
        })
      })
      .flatMap((c) => c)
  }

  protected messageIsError(message: any): boolean {
    return message.type === 'error'
  }
}

export class FtxUSRealTimeFeed extends FtxRealTimeFeed {
  protected wssURL = 'wss://ws.ftx.com/ws'
}

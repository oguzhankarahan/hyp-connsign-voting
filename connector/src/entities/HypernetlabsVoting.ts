import HypernetlabsVotingEntity from './HypernetlabsVotingEntity'
import Vote from './Vote'
import VotingConnectorTheGraph from '../connector'

export default class HypernetlabsVoting extends HypernetlabsVotingEntity {
  readonly appAddress: string

  constructor(appAddress: string, subgraphUrl: string, verbose = false) {
    super(new VotingConnectorTheGraph(subgraphUrl, verbose))

    this.appAddress = appAddress
  }

  async votes({ first = 1000, skip = 0 } = {}): Promise<Vote[]> {
    return this._connector.votesForApp(
      this.appAddress,
      first,
      skip
    )
  }

  onVotes(callback: Function): { unsubscribe: Function } {
    return this._connector.onVotesForApp!(
      this.appAddress,
      callback
    )
  }
}

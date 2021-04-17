export class Player {
  private static PLAYERS = new Map<string, Player>();
  public readonly serverId: string;

  public static get(serverId: string): Player {
    let player = this.PLAYERS.get(serverId);

    if (player) {
      return player;
    }

    player = new Player(serverId);
    this.PLAYERS.set(serverId, player);

    return player;
  }

  private constructor(serverId: string) {
    this.serverId = serverId;
  }
}

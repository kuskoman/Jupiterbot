import { Player } from "./player";

describe(Player.name, () => {
  it("should return the same instance for the same server id", () => {
    const serverId = "serverId";
    const player1 = Player.get(serverId);
    const player2 = Player.get(serverId);

    expect(player1).toBe(player2);
  });

  it("should return different instances for different server ids", () => {
    const player1 = Player.get("1");
    const player2 = Player.get("2");

    expect(player1).not.toBe(player2);
  });
});

import { StreamDispatcher, VoiceConnection } from "discord.js";
import { Logger } from "../../utils/logger";
import { MusicQueue } from "./queue";
import { Song } from "./song";

export class Player {
  private static PLAYERS = new Map<string, Player>();

  private readonly queue: MusicQueue = new MusicQueue();
  private isPlaying = false;
  private dispatcher: StreamDispatcher | null = null;
  private readonly logger: Logger;

  public static get(serverId: string): Player {
    let player = this.PLAYERS.get(serverId);

    if (player) {
      return player;
    }

    player = new Player(serverId);
    this.PLAYERS.set(serverId, player);

    return player;
  }

  private constructor(public readonly serverId: string) {
    this.logger = new Logger(Player.name, serverId);
  }

  public async play({ connection, song }: PlayInput) {
    if (!this.queue.isEmpty() || this.isPlaying) {
      return this.queue.addSong(song);
    }

    this.queue.addCurrentSong(song);
    this.dispatcher = connection
      .play(song.getStream())
      .on("start", () => {
        this.isPlaying = true;
        this.logger.info(`Playing ${song.name} on ${connection.channel.id}.`);
      })
      .on("finish", () => {
        this.logger.debug(`Finished playing ${song.name} on ${connection.channel.id}.`);
        const newSong = this.queue.getSong();
        if (!newSong) {
          return (this.isPlaying = false);
        }

        return this.play({ song: newSong, connection });
      });
  }

  public async skip() {
    if (!this.isPlaying) {
      return null; // todo: handle skipping to next song and playing it
    }

    this.endDispatcher();
  }

  private endDispatcher() {
    if (this.dispatcher) {
      this.dispatcher.end();
    }
  }
}

interface PlayInput {
  connection: VoiceConnection;
  song: Song;
}

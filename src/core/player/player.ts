import { Message, StreamDispatcher, VoiceConnection } from "discord.js";
import { logger } from "../../utils/logger";
import { MusicQueue } from "./queue";
import { Song } from "./song";

export class Player {
  private static PLAYERS = new Map<string, Player>();
  private readonly queue: MusicQueue = new MusicQueue();
  private isPlaying = false;
  private dispatcher: StreamDispatcher | null = null;

  public static get(serverId: string): Player {
    let player = this.PLAYERS.get(serverId);

    if (player) {
      return player;
    }

    player = new Player(serverId);
    this.PLAYERS.set(serverId, player);

    return player;
  }

  private constructor(public readonly serverId: string) {}

  public async play({ connection, song }: PlayInput) {
    if (!this.queue.isEmpty() || this.isPlaying) {
      return this.queue.addSong(song);
    }

    this.queue.addCurrentSong(song);
    this.dispatcher = connection
      .play(song.getStream())
      .on("start", () => {
        this.isPlaying = true;
        logger.info(`Bot playing ${song.name} on ${connection.channel.id}.`);
      })
      .on("finish", () => {
        const newSong = this.queue.getSong();
        if (!newSong) {
          return (this.isPlaying = false);
        } else {
          return this.play({ song: newSong, connection });
        }
      });
  }
}

interface PlayInput {
  connection: VoiceConnection;
  song: Song;
}

Message;

import { shuffleArray } from "../../utils/randomUtils";
import { Song } from "./song";

export class MusicQueue {
  private songList: Song[] = [];
  private currentSong: Song | null = null;
  private lastSong: Song | null = null;

  /** adds new song to the last position of queue */
  public addSong(song: Song) {
    this.songList.push(song);
  }

  /** sets song as first song, ignoring songList. can be used to instert song to first position */
  public addCurrentSong(song: Song) {
    this.lastSong = this.currentSong;
    this.currentSong = song;
  }

  /** removes one song from queue and returns it */
  public getSong(): Song | null {
    const song = this.songList.shift() || null;

    if (this.currentSong) {
      this.lastSong = this.currentSong;
    }

    this.currentSong = song;

    return song;
  }

  /** removes song from given index */
  public removeSong(index: number) {
    this.songList.splice(index, 1);
  }

  /** indicates if there are songs to be played after current one */
  public isEmpty(): Boolean {
    return this.songList.length === 0;
  }

  public getLastSong(): Readonly<Song | null> {
    return this.lastSong;
  }

  public getCurrentSong(): Readonly<Song | null> {
    return this.currentSong;
  }

  public getAllSongs(): Readonly<Song[]> {
    return this.songList;
  }

  /** makes order of songs in queue random */
  public shuffle() {
    this.songList = shuffleArray(this.songList);
  }

  /** resets all dynamic properties except lastSong */
  public reset() {
    this.songList = [];
    this.lastSong = this.currentSong || this.lastSong;
    this.currentSong = null;
  }
}

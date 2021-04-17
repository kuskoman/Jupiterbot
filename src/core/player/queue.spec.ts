import { MusicQueue } from "./queue";
import { Song } from "./song";
import * as faker from "faker";

describe(MusicQueue.name, () => {
  it("should act as FIFO stack", () => {
    const queue = new MusicQueue();
    const [firstSong, secondSong, thirdSong] = getManySongs(3);
    [firstSong, secondSong, thirdSong].forEach((s) => queue.addSong(s));

    expect(queue.getSong()).toBe(firstSong);
    expect(queue.getSong()).toBe(secondSong);
    expect(queue.getSong()).toBe(thirdSong);
  });

  describe("isEmpty method", () => {
    it("should return true if queue is empty", () => {
      const queue = new MusicQueue();

      expect(queue.isEmpty()).toBe(true);
    });

    it("should return false if queue is not empty", () => {
      const queue = new MusicQueue();
      queue.addSong(getSong());

      expect(queue.isEmpty()).toBe(false);
    });
  });

  describe("getCurrent method", () => {
    it("should return null if there is no currently played song", () => {
      const queue = new MusicQueue();

      expect(queue.getCurrentSong()).toBeNull();

      queue.addSong(getSong());
      expect(queue.getCurrentSong()).toBeNull();
    });

    it("should return currently played song if there is one", () => {
      const queue = new MusicQueue();
      const firstSong = getSong();
      queue.addSong(firstSong);
      queue.getSong();

      expect(queue.getCurrentSong()).toBe(firstSong);

      const secondSong = getSong();
      queue.addSong(secondSong);
      // second song is not played yet
      expect(queue.getCurrentSong()).toBe(firstSong);

      queue.getSong();
      expect(queue.getCurrentSong()).toBe(secondSong);

      queue.getSong();
      // there are no more songs in queue
      expect(queue.getCurrentSong()).toBe(null);
    });
  });

  describe("getLastSong", () => {
    it("should return null if there is no last song", () => {
      const queue = new MusicQueue();

      expect(queue.getLastSong()).toBe(null);

      queue.addSong(getSong());
      expect(queue.getLastSong()).toBe(null);
    });

    it("should properly return last played song", () => {
      const queue = new MusicQueue();
      const songs = getManySongs(2);

      songs.forEach((s) => queue.addSong(s));

      [1, 2].forEach(() => {
        queue.getSong();
      });

      expect(queue.getLastSong()).toBe(songs[0]);

      queue.getSong();
      expect(queue.getLastSong()).toBe(songs[1]);

      // last song should not change as long as there are no new songs
      queue.getSong();
      expect(queue.getLastSong()).toBe(songs[1]);
    });
  });

  describe("removeSong method", () => {
    it("should remove song from given index", () => {
      const queue = new MusicQueue();
      const songs = getManySongs(4);

      songs.forEach((s) => queue.addSong(s));

      queue.removeSong(1);
      expect(queue.getSong()).toBe(songs[0]);
      expect(queue.getSong()).toBe(songs[2]);
      expect(queue.getSong()).toBe(songs[3]);
    });
  });

  describe("getAllSongs method", () => {
    it("should return empty array if there are no songs", () => {
      const queue = new MusicQueue();
      expect(queue.getAllSongs()).toStrictEqual([]);
    });

    it("should return all songs", () => {
      const queue = new MusicQueue();
      const songs = getManySongs(10);

      songs.forEach((s) => queue.addSong(s));

      expect(queue.getAllSongs()).toStrictEqual(songs);
    });
  });
});

const getSong = (): Song => {
  const song: Song = {
    name: faker.music.genre(),
    id: faker.random.alphaNumeric(5),
    addedBy: faker.random.alphaNumeric(2),
    getStream: jest.fn(),
  };

  return song;
};

const getManySongs = (count: number) => {
  const songs: Song[] = [];
  for (let i = 0; i < count; i++) {
    songs.push(getSong());
  }

  return songs;
};

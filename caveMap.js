class CaveMap {
  constructor(width, height, treshold = 44) {
    const map = [];
    for (let x = 0; x < width; x++) {
      map[x] = [];
      for (let y = 0; y < height; y++) {
        if (x == 0 || x == width - 1 || y == 0 || y == height - 1)
          map[x][y] = 1;
        else {
          const r = Math.random() * 100;
          map[x][y] = r > treshold ? 0 : 1;
        }
      }
    }
    this.tiles = map;
    this.width = width;
    this.height = height;
    this.treshold = treshold;
  }

  smoothMap(smoothTimes) {
    for (let time = 0; time < smoothTimes; time++)
      for (let x = 0; x < this.width; x++)
        for (let y = 0; y < this.height; y++) {
          const wallCount = this.getCountNeighboringWall(x, y);
          if (wallCount > 4)
            this.tiles[x][y] = 1;
          else if (wallCount < 4)
            this.tiles[x][y] = 0;
        }
  }

  getCountNeighboringWall(mapX, mapY) {
    let wallCount = 0;
    for (let x = mapX - 1; x <= mapX + 1; x++)
      for (let y = mapY - 1; y <= mapY + 1; y++) {
        if (!(x == mapX && y == mapY))
          if (x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1)
            wallCount += 1;
          else
            wallCount += this.tiles[x][y];
      }
    return wallCount;
  }

  removeAloneTiles(neighborWallCount = 0) {
    for (let x = 0; x < this.width; x++)
      for (let y = 0; y < this.height; y++)
        if (this.tiles[x][y] == 1 && this.getCountNeighboringWall(x, y) <= neighborWallCount)
          this.tiles[x][y] = 0;
  }

  forTiles(action) {
    for (let x = 0; x < this.width; x++)
      for (let y = 0; y < this.height; y++)
        action(this.tiles[x][y], x, y);
  }
}
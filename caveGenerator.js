function caveGenerator(width, height, treshold = 47, smoothTimes = 5) {
  const map = new CaveMap(width, height, treshold);
  map.smoothMap(smoothTimes);
  map.removeAloneTiles(3);
  return map;
}
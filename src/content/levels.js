import levelsData from './levels.json';
import { rooms } from './rooms.js';

const planModules = import.meta.glob('../assets/levels/level-*.png', {
  eager: true,
  import: 'default',
});

function planFor(levelNumber) {
  const entry = Object.entries(planModules).find(([path]) => path.includes(`level-${levelNumber}.png`));
  return entry?.[1];
}

export const levels = Object.fromEntries(
  Object.entries(levelsData).map(([levelNumber, level]) => {
    const roomList = level.roomIds.map((id) => rooms[String(id)]).filter(Boolean);

    // Group hotspots by their displayed point number: several rooms (e.g.
    // shared labs down one corridor) can sit at the same physical dot on
    // the plan, so a click opens all of them rather than guessing one.
    const points = level.points.map((point) => {
      const roomIds = roomList
        .filter((r) => (r.mapPoint ?? r.id) === point.displayNumber)
        .map((r) => r.id);
      const pointRoomIds = roomIds.length > 0 ? roomIds : [point.roomId];
      return {
        ...point,
        roomIds: pointRoomIds,
        rooms: pointRoomIds.map((id) => rooms[String(id)]).filter(Boolean),
      };
    });

    return [
      levelNumber,
      {
        level: level.level,
        planImage: planFor(levelNumber),
        rooms: roomList,
        points,
      },
    ];
  }),
);

export const levelNumbers = Object.keys(levels)
  .map(Number)
  .sort((a, b) => a - b);

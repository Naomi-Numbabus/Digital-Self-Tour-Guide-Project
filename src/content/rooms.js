import roomsData from './rooms.json';

// Mirrors how the source photography is organised: one folder per room.
// Using import.meta.glob keeps every photo an optimised, fingerprinted Vite
// asset instead of a raw string path that the bundler can't see.
const photoModules = import.meta.glob('../assets/rooms/room-*/photo-*.jpg', {
  eager: true,
  import: 'default',
});

const imagesByRoom = {};
for (const [path, url] of Object.entries(photoModules)) {
  const match = path.match(/room-(\d+)\/photo-(\d+)\.jpg$/);
  if (!match) continue;
  const [, roomId, photoNum] = match;
  (imagesByRoom[roomId] ??= []).push({ num: Number(photoNum), url });
}
for (const list of Object.values(imagesByRoom)) list.sort((a, b) => a.num - b.num);

export const rooms = Object.fromEntries(
  Object.entries(roomsData).map(([id, room]) => {
    const photos = imagesByRoom[id] ?? [];
    return [
      id,
      {
        ...room,
        images: photos.map((p, i) => ({
          src: p.url,
          alt: `${room.name} — photo ${i + 1} of ${photos.length}`,
        })),
      },
    ];
  }),
);

export function getRoom(id) {
  return rooms[String(id)];
}

export function searchRooms(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return Object.values(rooms).filter(
    (room) =>
      room.name.toLowerCase().includes(q) ||
      room.code.toLowerCase().includes(q) ||
      room.type.toLowerCase().includes(q) ||
      room.aliases?.some((a) => a.toLowerCase().includes(q)),
  );
}

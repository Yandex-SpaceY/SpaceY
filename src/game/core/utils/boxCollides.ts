import { TCoordinates, TSize } from 'game/core/types';

function collides(
  x: number, y: number,
  r: number, b: number,
  x2: number, y2: number,
  r2: number, b2: number
): boolean {
  return !(r <= x2 || x > r2 || b <= y2 || y > b2);
}

export default function boxCollides(
  pos: TCoordinates,
  size: TSize,
  pos2: TCoordinates,
  size2: TSize,
): boolean {
  return collides(
    pos.x, pos.y,
    pos.x + size.width, pos.y + size.height,
    pos2.x, pos2.y,
    pos2.x + size2.width, pos2.y + size2.height
  );
}

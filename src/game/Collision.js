/**
 * AABB 충돌 판정
 */
export function checkCollision(entity, basket) {
  const entityLeft = entity.x - entity.width / 2;
  const entityRight = entity.x + entity.width / 2;
  const entityTop = entity.y - entity.height / 2;
  const entityBottom = entity.y + entity.height / 2;

  const halfW = basket.visualHalfW ?? basket.width / 2;
  const halfH = basket.height / 2;
  const basketLeft = basket.x - halfW;
  const basketRight = basket.x + halfW;
  const basketTop = basket.y - halfH;
  const basketBottom = basket.y + halfH;

  return (
    entityLeft < basketRight &&
    entityRight > basketLeft &&
    entityTop < basketBottom &&
    entityBottom > basketTop
  );
}

/**
 * AABB 충돌 판정
 */
export function checkCollision(word, basket) {
  const wordLeft = word.x - word.width / 2;
  const wordRight = word.x + word.width / 2;
  const wordTop = word.y - word.height / 2;
  const wordBottom = word.y + word.height / 2;

  const basketLeft = basket.x - basket.width / 2;
  const basketRight = basket.x + basket.width / 2;
  const basketTop = basket.y - basket.height / 2;
  const basketBottom = basket.y + basket.height / 2;

  return (
    wordLeft < basketRight &&
    wordRight > basketLeft &&
    wordTop < basketBottom &&
    wordBottom > basketTop
  );
}

function getRandomNumber() {
  const random = Math.random();
  if (random < 0.5) {
    return 0; // 50% chance to return 0
  } else if (random < 0.85) {
    return 1; // 35% chance to return 1
  } else {
    return 2; // 15% chance to return 2
  }
}

export default getRandomNumber;

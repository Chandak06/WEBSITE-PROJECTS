async function getUserStatus(redisClient, userId) {
  const isOnline = await redisClient.sIsMember("online_users", userId);

  if (isOnline) {
    return { status: "online" };
  }

  const lastSeen = await redisClient.get(`last_seen:${userId}`);

  return {
    status: "offline",
    lastSeen,
  };
}
module.exports = { getUserStatus };

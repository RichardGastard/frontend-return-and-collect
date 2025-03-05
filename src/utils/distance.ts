export type LatitudeLongitude = {
  latitude: number;
  longitude: number;
};

// Not sure if usefull
enum Vehicles {
  WALKING,
  BICYCLE,
  CAR,
  MOTOBIKE,
}

export function computeDistanceInMeters(
  start: LatitudeLongitude,
  stop: LatitudeLongitude
) {
  const R = 6371000;
  const phi1 = start.latitude * (Math.PI / 180);
  const phi2 = stop.latitude * (Math.PI / 180);

  const deltaPhi = (stop.latitude - start.latitude) * (Math.PI / 180);
  const deltaLambda = (stop.longitude - start.longitude) * (Math.PI / 180);

  const a =
    Math.sin(deltaPhi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const meters = Math.round(R * c);
  const kilometers = Math.round(meters / 1000);
  return { meters, kilometers };
}

export function computeTravelTime(meters: number, kmsPerHour: number) {
  const timeInSeconds = meters / (kmsPerHour / 3.6);
  const days = Math.floor(timeInSeconds / (3600 * 24));
  const hours = Math.floor((timeInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor(((timeInSeconds % (3600 * 24)) % 3600) / 60);
  const seconds = Math.floor(((timeInSeconds % (3600 * 24)) % 3600) % 60);
  return { days, hours, minutes, seconds };
}

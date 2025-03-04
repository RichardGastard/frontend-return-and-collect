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
  const sinPart = Math.sin(start.latitude) * Math.sin(stop.latitude);
  const cosPart =
    Math.cos(start.latitude) *
    Math.cos(stop.latitude) *
    Math.cos(stop.longitude - start.longitude);
  return Math.acos(sinPart + cosPart) * 6371 * 1000;
}

export function computeTravelTime(meters: number, kmsPerHour: number) {
  const timeInSeconds = meters / (kmsPerHour / 3.6);
  const days = Math.floor(timeInSeconds / (3600 * 24));
  const hours = Math.floor((timeInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor(((timeInSeconds % (3600 * 24)) % 3600) / 60);
  const seconds = Math.floor(((timeInSeconds % (3600 * 24)) % 3600) % 60);
  return { days, hours, minutes, seconds };
}

class Car {
  constructor(entryTime, carNumber) {
    this.entryTime = entryTime;
    this.carNumber = carNumber;
    this.isInParkingLot = true;
    this.totalParkingTime = 0;
  }

  enter(time) {
    this.entryTime = time;
    this.isInParkingLot = true;
  }

  exit(exitTime) {
    this.totalParkingTime += Car.calculateMinutes(this.entryTime, exitTime);
    this.isInParkingLot = false;
  }

  static calculateMinutes(start, end) {
    const [startHour, startMin] = start.split(":").map(Number);
    const [endHour, endMin] = end.split(":").map(Number);
    return endHour * 60 + endMin - (startHour * 60 + startMin);
  }
}

function solution(fees, records) {
  const [basicTime, basicFee, unitTime, unitFee] = fees;
  const cars = new Map();

  for (const record of records) {
    const [time, carNumber, action] = record.split(" ");

    if (action === "IN") {
      if (!cars.has(carNumber)) {
        cars.set(carNumber, new Car(time, carNumber));
      } else {
        cars.get(carNumber).enter(time);
      }
    } else if (action === "OUT") {
      cars.get(carNumber).exit(time);
    }
  }

  for (const car of cars.values()) {
    if (car.isInParkingLot) {
      car.exit("23:59");
    }
  }

  return Array.from(cars.values())
    .sort((a, b) => a.carNumber.localeCompare(b.carNumber))
    .map((car) => {
      if (car.totalParkingTime <= basicTime) {
        return basicFee;
      }

      const extraMinutes = car.totalParkingTime - basicTime;
      const extraUnits = Math.ceil(extraMinutes / unitTime);
      return basicFee + extraUnits * unitFee;
    });
}

solution(
  [180, 5000, 10, 600],
  [
    "05:34 5961 IN",
    "06:00 0000 IN",
    "06:34 0000 OUT",
    "07:59 5961 OUT",
    "07:59 0148 IN",
    "18:59 0000 IN",
    "19:09 0148 OUT",
    "22:59 5961 IN",
    "23:00 5961 OUT",
  ]
);

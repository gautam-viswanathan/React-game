const express = require("express");
const router = express.Router();
const { cities, vehicles, cops, copStories } = require("../data");
router.use(express.json());

router.get("/vehicle", (req, res) => {
  let availableVehicle;
  let updateVehicle = copStories[copStories.length - 1];
  if (copStories.length > 1) {
    const selectedVehicles = copStories.map((item) => item.vehicle);
    const restingVehicle = vehicles.filter(
      (item) => !selectedVehicles.includes(item.kind)
    );
    const distance = cities.find((city) =>
      Object.values(city).includes(updateVehicle.location)
    );
    availableVehicle = restingVehicle.filter(
      (data) => data.range >= distance.distance * 2
    );
    console.log(copStories.length);
    if (availableVehicle.length > 0) {
      res.send({ vehicle: availableVehicle, index: copStories.length });
    } else {
      res.send({ vehicle: [], index: copStories.length });
    }
  } else {
    const distance = cities.find((city) =>
      Object.values(city).includes(updateVehicle.location)
    );
    availableVehicle = vehicles.filter(
      (data) => data.range >= distance.distance * 2
    );
    if (availableVehicle.length > 0) {
      res.send({ vehicle: availableVehicle, index: copStories.length });
    } else {
      res.send({ vehicle: [], index: copStories.length });
    }
  }
  console.log(availableVehicle);
});

router.post("/vehicles/update", (req, res) => {
  let updateVehicle = copStories[copStories.length - 1];
  let vehicle = req.body.vehicle;
  updateVehicle["vehicle"] = vehicle;
  res.send({ message: "updated successfully" });
});

router.get("/cops", (req, res) => {
  if (copStories && copStories.length > 0) {
    let assignedCops = copStories.map((item) => item.name);
    const availableCops = cops.filter(
      (item) => !assignedCops.includes(item.name)
    );
    console.log(availableCops);
    res.send({ cops: availableCops });
  } else {
    res.send({ cops: cops });
  }
});

router.post("/cop/update", (req, res) => {
  let cop = req.body.copName;
  copStories.push({ name: cop });
  res.send({ message: "cop updated" });
});

router.get("/locations", (req, res) => {
  console.log(copStories);
  if (copStories.length > 0) {
    const assignedCities = copStories.map((item) => item.location);
    const availableCities = cities.filter(
      (city) => !assignedCities.includes(city.name)
    );
    res.send({ availableCities: availableCities });
  } else {
    res.send({ availableCities: cities });
  }
});

router.post("/location/update", (req, res) => {
  let updateCop = copStories[copStories.length - 1];
  let location = req.body.location;
  updateCop["location"] = location;
  res.send({ message: "updated successfully" });
});

router.get("/capture", (req, res) => {
  const randomIndex = Math.floor(Math.random() * cities.length);
  const fugitiveLocation = cities[randomIndex];
  console.log(fugitiveLocation, "hello");
  const capture = copStories.find((city) =>
    Object.values(city).includes(fugitiveLocation.name)
  );
  if (capture !== undefined) {
    res.send({
      captured: capture,
      cops: copStories,
      fugitive: fugitiveLocation,
    });
  } else {
    res.send({ captured: false, cops: copStories, fugitive: fugitiveLocation });
  }
});

router.post("/endgame", (req, res) => {
  copStories.length = 0;
  res.send({ message: "successfully ended" });
});

module.exports = router;

const cities = [
  {
    name: "Yapkashnagar",
    distance: 60,
    description:
      "the Neon Oasis Glowing alleys and rooftop races, powered by solar energy.",
    image: "Yapkashnagar",
  },
  {
    name: "Lihaspur",
    distance: 50,
    description:
      "the Misty Labyrinth Ancient temples shrouded in fog, whispers of forgotten tech.",
    image: "Lihaspur",
  },
  {
    name: "Narmis City",
    distance: 40,
    description:
      "he Steel Jungle Towering skyscrapers and hidden underground networks",
    image: "Narmis",
  },
  {
    name: "Shekharvati",
    distance: 30,
    description:
      " the Sun-Kissed Valley Rolling hills and forgotten mining tunnels. ",
    image: "Shekharvati",
  },
  {
    name: "Nuravgram",
    distance: 20,
    description:
      "the Quirky Village Talking robots and malfunctioning AI guardians.",
    image: "Nuravgram",
  },
];

const vehicles = [
  { kind: "EV Bike", range: 60, count: 2, image: "Bike" },
  { kind: "EV Car", range: 100, count: 1, image: "Car" },
  { kind: "EV SUV", range: 120, count: 1, image: "SUV" },
];

const cops = [
  { name: "Cop 1", number: 1, image: "Cop1" },
  { name: "Cop 2", number: 2, image: "Cop2" },
  { name: "Cop 3", number: 3, image: "Cop3" },
];
const copStories = [];

module.exports = { cities, vehicles, cops, copStories };

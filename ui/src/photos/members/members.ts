const MEMBERS: any = {
  core: [
    {
      key: 1,
      name: "Urs WIEDEMANN",
      profile: require("./profiles/Urs_Wiedemann.jpg"),
      position: "Chair",
      department: "TH",
    },
    {
      key: 2,
      name: "Maria DIMOU",
      profile: require("./profiles/Maria_Dimou.png"),
      position: "Advisor",
      department: "IT",
    },

    {
      key: 3,
      name: "Marika FLYGAR",
      profile: require("./profiles/Marika_Flygar.jpg"),
      position: "Administrative Assistant",
      department: "DG",
    },
  ],
  departments: [
    {
      key: 4,
      name: "André DAVID",
      profile: require("./profiles/AndreDavid.JPG"),
      position: "Chair High Energy Physics Working Group",
      department: "EP",
    },

    {
      key: 5,
      name: "Massimo GIOVANNOZZI",
      profile: require("./profiles/MassimoGiovanozzi.png"),
      position: "Chair Applied Physics Working Group",
      department: "BE",
    },

    {
      key: 6,
      name: "Giacomo Tenaglia",
      profile: require("./profiles/Giacomo_Tenaglia.jpeg"),
      position: "",
      department: "IT",
    },

    {
      key: 7,
      name: "Bertrand NICQUEVERT",
      profile: require("./profiles/Bertrand_Nicquevert.jpeg"),
      position: "",
      department: "EN",
    },

    {
      key: 8,
      name: "Valeria PEREZ REALE",
      profile: require("./profiles/Valeria_Perez_Reale.png"),
      position: "",
      department: "TE",
    },

    {
      key: 9,
      name: "Antonio PERILLO-MARCONE ",
      profile: require("./profiles/Antonio_Perillo_Marcone.jpeg"),
      position: "",
      department: "SY",
    },
  ],
  users: [
    {
      key: 10,
      name: "To be appointed",
      profile: "",
      position: "",
      department: "EP",
    },
  ],

  "staff association": [
    {
      key: 11,
      name: "Lynda MEICHTRY",
      profile: require("./profiles/Lynda-Meichtry.jpg"),
      position: "",
      department: "DG",
    },
  ],
  observers: [
    {
      key: 12,
      name: "Maria FIASCARIS",
      profile: require("./profiles/Maria_Fiascaris.jpeg"),
      position: "Learning & Development",
      department: "HR",
    },
    {
      key: 13,
      name: "Martijn Mulders",
      profile: require("./profiles/Martijn_Mulders.jpg"),
      position: "CERN School of Physics",
      department: "EP",
    },
    {
      key: 14,
      name: "Sebastian LOPIENSKI",
      profile: require("./profiles/Sebastian_Lopienski.jpeg"),
      position: "CERN School of Computing",
      department: "IT",
    },
    {
      key: 15,
      name: "Frank TECKER",
      profile: require("./profiles/Frank_Tecker.jpg"),
      position: "CERN Accelerator School",
      department: "BE",
    },
  ],
};

export function getMemebers() {
  return MEMBERS;
}

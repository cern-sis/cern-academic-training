const baseUrl = "./profiles/";

const members = [
  {
    key: 1,
    name: "Urs WIEDEMANN",
    profile: baseUrl + "Urs_Wiedemann.jpg",
    position: "Chair",
    department: "TH",
  },
  {
    key: 2,
    name: "Maria DIMOU",
    profile: baseUrl + "Maria_Dimou.png",
    position: "Advisor",
    department: "IT",
  },

  {
    key: 3,
    name: "Marika FLYGAR",
    profile: baseUrl + "Marika_Flygar.jpg",
    position: "Administrative Assistant",
    department: "DG",
  },

  {
    key: 4,
    name: "André DAVID",
    profile: baseUrl + "Andre_David.png",
    position: "Chair High Energy Physics Working Group",
    department: "EP",
  },

  {
    key: 5,
    name: "Massimo GIOVANNOZZI",
    profile: baseUrl + "MassimoGiovanozzi.png",
    position: "Chair Applied Physics Working Group",
    department: "BE",
  },

  {
    key: 6,
    name: "Maria ARSUAGA RIOS",
    profile: baseUrl + "Maria-Arsuaga-Rios.png",
    position: "",
    department: "IT",
  },

  {
    key: 7,
    name: "Bertrand NICQUEVERT",
    profile: baseUrl + "Bertrand_Nicquevert.jpeg",
    position: "",
    department: "EN",
  },

  {
    key: 8,
    name: "Valeria PEREZ REALE",
    profile: baseUrl + "Valeria_Perez_Reale.png",
    position: "",
    department: "TE",
  },

  {
    key: 9,
    name: "Antonio PERILLO-MARCONE ",
    profile: baseUrl + "Antonio_Perillo_Marcone.jpeg",
    position: "",
    department: "SY",
  },

  {
    key: 10,
    name: "Evangelia DIMOVASILI",
    profile: baseUrl + "Evangelia_Dimovasili.jpeg",
    position: "",
    department: "EP",
  },
  {
    key: 11,
    name: "Lynda MEICHTRY",
    profile: baseUrl + "Lynda-Meichtry.jpg",
    position: "",
    department: "DG",
  },
  {
    key: 12,
    name: "Maria FIASCARIS",
    profile: baseUrl + "Maria_Fiascaris.jpeg",
    position: "",
    department: "HR",
  },
  {
    key: 13,
    name: "Martijn Mulders",
    profile: baseUrl + "Martijn_Mulders.jpg",
    position: "",
    department: "EP",
  },
  {
    key: 14,
    name: "Sebastian LOPIENSKI",
    profile: baseUrl + "Sebastian_Lopienski.jpeg",
    position: "",
    department: "IT",
  },
  {
    key: 15,
    name: "Frank TECKER",
    profile: baseUrl + "Frank_Tecker.jpg",
    position: "",
    department: "BE",
  },
];

export function getMembers() {
  return members;
}

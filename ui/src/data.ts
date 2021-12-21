const lectures = [
  {
    key: 1,
    speaker: "de Jong, Michiel",
    speaker_details: "",
    title: "REMOTE: Federated Data Architectures",
    date: "2021-09-30",
    event_details: "https://indico.cern.ch/event/1049666/",
    video: "https://cds.cern.ch/video/2782916?showTitle=true",
    thumbnail:
      "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/2021/1049666/1049666-presenter-cover.png",
    abstract:
      "While we often still coordinate trade by settling against a third party currency that is globally trusted, other techniques of coordinating trade are slowly on the rise. Community currencies like the Swiss WIR make use of interpersonal trust relationships to coordinate trade. The EU is investing heavily into the Peppol e-Invoicing network. Invoices that health care providers send to health insurers could benefit from a similar interconnection of bookkeeping systems, with real-time data sharing. In fact, any place where one party sends an invoice to another party, can probably be made more efficient by linking both bookkeeping systems involved. This can be done with anything from simple webhooks to advanced CRDT collaboration protocols. And unlike cryptocurrencies, which are still controlled by rent extractors, Federated Bookkeeping promises to let both trade and credit happen along the same in-network trust lines, and this is a powerful insight. Can Federated Bookkeeping be the real post-capitalist fintech revolution that we initially thought cryptocurrencies would be?",
  },

  {
    key: 2,
    speaker: "Tovey, Daniel",
    speaker_details: "University of Sheffield (GB)",
    title: "Dark Matter searches",
    date: "2021-06-29",
    event_details: "https://indico.cern.ch/event/870611/",
    video: "https://cds.cern.ch/video/2774416?showTitle=true",
    thumbnail:
      "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/2021/870611/870611-thumbnail-179x101-at-90-percent.jpg",
    abstract:
      "Dark Matter is one of the most compelling motivations for physics beyond the Standard Model. This lecture series will review the status and prospects for Dark Matter searches, covering both direct and indirect searches. The lectures will review searches over the full mass range of possible Dark Matter candidates, covering the different techniques used in these searches. In addition future prospects for these searches will be presented.",
  },

  {
    key: 3,
    speaker: "Ellis, Richard Keith",
    speaker_details: "University of Durham (GB)",
    title: "Shaping the future of High-Energy Physics - Theory",
    date: "2021-11-01",
    event_details: "https://indico.cern.ch/event/720800/",
    video: "https://cds.cern.ch/video/2790159?showTitle=true",
    thumbnail:
      "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/2021/720800/720800-presenter-legacy.jpg",
    abstract:
      "These CERN Academic Training Lectures aim at providing a broad scholarly overview of the scientific and technological considerations that led to the recommendations of the European Strategy for particle physics and that motivate now its implementations. The programme consists of three lectures with ample time for discussion, targeting the three main pillars underlying future progress in high-energy physics",
  },

  {
    key: 4,
    speaker: "Sphicas, Paris",
    speaker_details: "CERN/Athens",
    title: "Shaping the future of High-Energy Physics - Experiment",
    date: "2021-11-02",
    event_details: "https://indico.cern.ch/event/720801/",
    video: "https://cds.cern.ch/video/2790052?showTitle=true",
    thumbnail:
      "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/2021/720801/720801-presenter-legacy.jpg",
    abstract:
      "These CERN Academic Training Lectures aim at providing a broad scholarly overview of the scientific and technological considerations that led to the recommendations of the European Strategy for particle physics and that motivate now its implementations. The programme consists of three lectures with ample time for discussion, targeting the three main pillars underlying future progress in high-energy physics",
  },

  {
    key: 5,
    speaker: "Deghaye, Stephane",
    speaker_details: "CERN",
    title: "Controlling the CERN Accelerator Complex",
    date: "2021-11-29",
    event_details: "https://indico.cern.ch/event/1054889/",
    video: "https://cds.cern.ch/video/2791747?showTitle=true",
    thumbnail:
      "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/2021/1054889/1054889-presentation-legacy.jpg",
    abstract:
      "This lecture will introduce the system used to control the CERN Accelerator complex, spanning from particle sources to the LHC, including the CERN experimental areas. The overall architecture of the control system will be described, together with the variety of technologies employed. The lecture will also cover the challenges associated with keeping things running reliably, whilst adapting to a changing technological landscape and evolving requirements.",
  },

  {
    key: 6,
    speaker: "Spearman, PhD, Mark",
    speaker_details: "Factory Physics",
    title:
      "Factory Physics: Methods for Efficient Project Management in a Scientific Environment",
    date: "2021-10-26",
    event_details: "https://indico.cern.ch/event/1065791/",
    video: "https://cds.cern.ch/video/2790354?showTitle=true",
    thumbnail:
      "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/2021/1065791/1065791-presenter-legacy.png",
    abstract:
      "Factory physics is systematic description of the underlying behaviour of manufacturing systems and is key to the development of effective production management strategies.  Operations Science is a generalization of Factory Physics and applies to all operations including large and complex construction projects.  Indeed, the creation of the LHC was one of the largest and most complex operations in history. Much of the focus in project management has been adherence to a schedule and reacting when the schedule begins to slip.  While schedule adherence is importance the practice of monitor and react is ineffective.  More important is understanding the production system that delivers the construction project.  Operations Science teaches that while schedules tell what should happen, the production system tells what can and will happen—maintain the correct rate and the dates will be met.  To do this, it is essential that the production system be properly designed and efficiently executed.  In this lecture, Mark will describe how Factory Physics and Operations Science address these issues.",
  },

  {
    key: 7,
    speaker: "Söldner-Rembold, Stefan",
    speaker_details: "University of Manchester",
    title: "Neutrino physics at Accelerators",
    date: "2021-05-26",
    event_details: "https://indico.cern.ch/event/1037417/",
    video: "https://cds.cern.ch/video/2767702?showTitle=true",
    thumbnail:
      "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/2021/1037417/1037417-thumbnail-179x101-at-90-percent.jpg",
    abstract:
      "The neutrino was discovered experimentally over 60 years ago, but it remains a particle that has not given up all its secrets just yet. Oscillations between the flavour states are now well established and studied in great detail in a large number of experiments. An interesting hint from the Nova and T2K experiments is that neutrinos and antineutrinos may not oscillate in the same way, given a perhaps strong CP violation in the neutrino sector. That would be extremely relevant for models attempting to explain the matter-antimatter asymmetry in the Universe. These lectures will report the present understanding of neutrino physics and oscillations and will also discuss the potential of the (near) future experiments that are being constructed or planned.",
  },

  {
    key: 8,
    speaker: "Gonella, Francesco",
    speaker_details: "Università Ca' Foscari Venezia",
    title: "Symbolism and dynamics of the systems",
    date: "2021-05-18",
    event_details: "https://indico.cern.ch/event/1004678/",
    video: "https://cds.cern.ch/video/2766925?showTitle=true",
    thumbnail:
      "http://mediaarchive.cern.ch/MediaArchive/Video/Public/Conferences/2021/1004678/1004678-thumbnail-179x101-at-90-percent.jpg",
    abstract:
      "Here I introduce the Stock-and-Flow diagrams, that use a symbolic representation taken from energetics. I will show how to draw a comprehensive diagram including only stocks, flows and processes, and how the choice of these sets of elements and of the (spatial and temporal) boundary actually reflects the reason why one wants to study the system at issue. The reality described by a systemic diagram is not “a photograph” of that system, as is typical of many reductionist approaches like for example those of Biology and of particle Physics. Instead, the systemic diagram is a virtual photograph of its dynamical structure. A particular attention will be then dedicated to the concept of feedback and to the role of hierarchical feedback networks, that is the characteristic that ultimately determines the whole system dynamics. I will introduce how to define the analytical expressions of flows, processes and interactions. From these, a set of interconnected differential equations may be established, from which a computational simulator can be set up using finite differences methods.",
  },
];

export function getLectures() {
  return lectures;
}

export function getLecture(key: number) {
  return lectures.find((lecture) => lecture.key === key);
}

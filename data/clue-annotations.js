/**
 * CLUE ANNOTATIONS DATA
 *
 * Each clue is an array of segment objects:
 *   { text: "...", type: "def" | "fodder" | "indicator" | "aux" }
 *
 * Types:
 *   def       → Definition (green, underlined)
 *   fodder    → Fodder / abbreviation source / substitution source (red)
 *   indicator → Wordplay indicator (blue, italic)
 *   aux       → Auxiliary / connector / surface-only words (normal)
 */

const CLUE_ANNOTATIONS = {

    // ===== ACROSS =====

    "1A": {
        number: 1,
        direction: "across",
        answer: "APOPHIS",
        length: "(7)",
        segments: [
            { text: "Sappho", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "and", type: "aux" },
            { text: " ", type: "aux" },
            { text: "I", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "dancing around", type: "indicator" },
            { text: " ", type: "aux" },
            { text: "a", type: "aux" },
            { text: " ", type: "aux" },
            { text: "dangerous rock close to the Earth", type: "def" }
        ]
    },

    "4A": {
        number: 4,
        direction: "across",
        answer: "AXIS",
        length: "(4)",
        segments: [
            { text: "Line of Rotation", type: "def" },
            { text: " ", type: "aux" },
            { text: "is", type: "aux" },
            { text: " ", type: "aux" },
            { text: "a", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "Best Grade", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "containing", type: "indicator" },
            { text: " ", type: "aux" },
            { text: "a", type: "aux" },
            { text: " ", type: "aux" },
            { text: "Roman Eleven", type: "fodder" }
        ]
    },

    "6A": {
        number: 6,
        direction: "across",
        answer: "EXOPLANET",
        length: "(9)",
        segments: [
            { text: "Former partner", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "and", type: "aux" },
            { text: " ", type: "aux" },
            { text: "original poster", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "leant", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "uncomfortably", type: "indicator" },
            { text: " ", type: "aux" },
            { text: "upon", type: "aux" },
            { text: " ", type: "aux" },
            { text: "a", type: "aux" },
            { text: " ", type: "aux" },
            { text: "foreign world", type: "def" }
        ]
    },

    "8A": {
        number: 8,
        direction: "across",
        answer: "TYCHO",
        length: "(5)",
        segments: [
            { text: "Thank you", type: "fodder" },
            { text: ", ", type: "aux" },
            { text: "Iconic Danish hero", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "ends", type: "indicator" },
            { text: " ", type: "aux" },
            { text: "Kepler's mentor", type: "def" }
        ]
    },

    "11A": {
        number: 11,
        direction: "across",
        answer: "SATELLITE",
        length: "(9)",
        segments: [
            { text: "We launch these to observe the earth", type: "def" },
            { text: ", ", type: "aux" },
            { text: "with", type: "aux" },
            { text: " ", type: "aux" },
            { text: "twisted", type: "indicator" },
            { text: " ", type: "aux" },
            { text: "tales", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "and", type: "aux" },
            { text: " ", type: "aux" },
            { text: "broken", type: "indicator" },
            { text: " ", type: "aux" },
            { text: "tile", type: "fodder" }
        ]
    },

    "13A": {
        number: 13,
        direction: "across",
        answer: "MARS",
        length: "(4)",
        segments: [
            { text: "Two mooned Planet", type: "def" },
            { text: " ", type: "aux" },
            { text: "has", type: "aux" },
            { text: " ", type: "aux" },
            { text: "Female Horses", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "without", type: "indicator" },
            { text: " ", type: "aux" },
            { text: "Energy", type: "fodder" }
        ]
    },

    "14A": {
        number: 14,
        direction: "across",
        answer: "GEMINID",
        length: "(7)",
        segments: [
            { text: "Twins", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "take", type: "indicator" },
            { text: " ", type: "aux" },
            { text: "a", type: "aux" },
            { text: " ", type: "aux" },
            { text: "D", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "for", type: "aux" },
            { text: " ", type: "aux" },
            { text: "Annual December shower", type: "def" }
        ]
    },

    // ===== DOWN =====

    "1D": {
        number: 1,
        direction: "down",
        answer: "ASTEROID",
        length: "(8)",
        segments: [
            { text: "A", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "class of muscle enhancing drugs", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "for", type: "aux" },
            { text: " ", type: "aux" },
            { text: "a class of rocks!", type: "def" }
        ]
    },

    "2D": {
        number: 2,
        direction: "down",
        answer: "ORION",
        length: "(5)",
        segments: [
            { text: "Prominent constellation", type: "def" },
            { text: " ", type: "aux" },
            { text: "is", type: "aux" },
            { text: " ", type: "aux" },
            { text: "ON", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "around", type: "indicator" },
            { text: " ", type: "aux" },
            { text: "Brazilian city", type: "fodder" }
        ]
    },

    "3D": {
        number: 3,
        direction: "down",
        answer: "HALLEY",
        length: "(6)",
        segments: [
            { text: "Hindustan Aeronautics Limited", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "has", type: "aux" },
            { text: " ", type: "aux" },
            { text: "odds of", type: "indicator" },
            { text: " ", type: "aux" },
            { text: "Leery", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "rock with 76 year time period", type: "def" }
        ]
    },

    "4D": {
        number: 4,
        direction: "down",
        answer: "ALBEDO",
        length: "(6)",
        segments: [
            { text: "It is", type: "aux" },
            { text: " ", type: "aux" },
            { text: "Doable", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "to scatter", type: "indicator" },
            { text: " ", type: "aux" },
            { text: "celestial glow", type: "def" }
        ]
    },

    "5D": {
        number: 5,
        direction: "down",
        answer: "ISS",
        length: "(3)",
        segments: [
            { text: "Earth's biggest manmade companion", type: "def" },
            { text: " ", type: "aux" },
            { text: "is", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "of", type: "aux" },
            { text: " ", type: "aux" },
            { text: "middling", type: "indicator" },
            { text: " ", type: "aux" },
            { text: "caste", type: "fodder" }
        ]
    },

    "7D": {
        number: 7,
        direction: "down",
        answer: "REDDENED",
        length: "(8)",
        segments: [
            { text: "Re:", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "Double", type: "indicator" },
            { text: " ", type: "aux" },
            { text: "D's.", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "Need", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "Wavelength increased as one speeds away.", type: "def" }
        ]
    },

    "8D": {
        number: 8,
        direction: "down",
        answer: "THALES",
        length: "(6)",
        segments: [
            { text: "Ancient Greek Astronomer", type: "def" },
            { text: " ", type: "aux" },
            { text: "has", type: "aux" },
            { text: " ", type: "aux" },
            { text: "warm", type: "aux" },
            { text: " ", type: "aux" },
            { text: "beers", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "after", type: "indicator" },
            { text: " ", type: "aux" },
            { text: "Thursday", type: "fodder" }
        ]
    },

    "9D": {
        number: 9,
        direction: "down",
        answer: "HELIUM",
        length: "(6)",
        segments: [
            { text: "Dress border", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "around", type: "indicator" },
            { text: " ", type: "aux" },
            { text: "Lithium", type: "fodder" },
            { text: ", ", type: "aux" },
            { text: "Uranium", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "gives", type: "aux" },
            { text: " ", type: "aux" },
            { text: "first product of fusion", type: "def" }
        ]
    },

    "10D": {
        number: 10,
        direction: "down",
        answer: "TITAN",
        length: "(5)",
        segments: [
            { text: "Part of Bronze", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "gets", type: "aux" },
            { text: " ", type: "aux" },
            { text: "\"at\"", type: "fodder" },
            { text: ", ", type: "aux" },
            { text: "back", type: "indicator" },
            { text: ", ", type: "aux" },
            { text: "inside", type: "indicator" },
            { text: " ", type: "aux" },
            { text: "Gassy giant's largest companion", type: "def" }
        ]
    },

    "12D": {
        number: 12,
        direction: "down",
        answer: "ETA",
        length: "(3)",
        segments: [
            { text: "Tea", type: "fodder" },
            { text: " ", type: "aux" },
            { text: "brewed", type: "indicator" },
            { text: " ", type: "aux" },
            { text: "as", type: "aux" },
            { text: " ", type: "aux" },
            { text: "astronauts say", type: "aux" },
            { text: " ", type: "aux" },
            { text: "the time to go somewhere", type: "def" }
        ]
    }
};
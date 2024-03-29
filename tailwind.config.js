/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            mukta: ["Mukta", "arial"],
        },
        extend: {
            colors: {
                cinza: "#D9D9D9",
                "cinza-claro-1": "#A7A5A5",
                "cinza-claro-2": "#f8f8f8",
                "cinza-claro-3": "#808080",
                "verde-padrao": "#00CC69",
                "verde-claro-1": "#00FF85",
                "verde-claro-2": "#4DFFA9",
                "verde-claro-3": "rgba(17, 173, 14, 0.25)",
                "verde-claro-4": "#92E3A9",
                "verde-escuro-1": "#008042",
                "verde-escuro-2": "#268054",
                blur: "rgba(0, 0, 0, 0.400)",
                "verde-switch": "#264D47",
            },
            spacing: {
                8.5: "2.13rem",
                12.5: "3.25rem",
                12.3: "3.15rem",
                13: "3.42rem",
                15: "3.65rem",
                18: "4.5rem",
                22: "5.5rem",
                30: "7.5rem",
                42: "10.5rem",
                46: "11.5rem",
                55.5: "219px",
                84: "21rem",
                88: "22rem",
                100: "25rem",
                112: "28rem",
                120: "30rem",
                144: "36rem",
                168: "42rem",
                184: "46rem",
                176: "44rem",
                200: "50rem",
                240: "60rem",
                288: "72rem",
                "70per": "70%",
                "30per": "30%",
            },
            gridTemplateColumns: {
                "10x20": "10rem 20rem",
                "11.5x11.5": "11.5rem 11.5rem",
                "13.5x13.5": "13.5rem 13.5rem",
                "16x16": "16rem 16rem",
                "24x24": "24rem 24rem",
            },
            dropShadow: {
                all: "5px 4px 10px rgba(0, 0, 0, 0.25)",
                "all-icon": "0px 3px 1.5px rgba(0, 0, 0, 0.25)",
                "all-inp": "3px 2px 2px rgba(0, 0, 0, 0.25)",
            },
        },
        scale: {
            101: "1.01",
            102: "1.02",
            103: "1.03",
            104: "1.04",
        },
        screens: {
            min50: { min: "50px" },
            max50: { max: "50px" },
            min100: { min: "100px" },
            max100: { max: "100px" },
            min150: { min: "150px" },
            max150: { max: "150px" },
            min200: { min: "200px" },
            max200: { max: "200px" },
            min250: { min: "250px" },
            max250: { max: "250px" },
            min300: { min: "300px" },
            max300: { max: "300px" },
            min350: { min: "350px" },
            max350: { max: "350px" },
            min400: { min: "400px" },
            max400: { max: "400px" },
            min450: { min: "450px" },
            max450: { max: "450px" },
            min500: { min: "500px" },
            max500: { max: "500px" },
            min550: { min: "550px" },
            max550: { max: "550px" },
            min600: { min: "600px" },
            max600: { max: "600px" },
            min650: { min: "650px" },
            max650: { max: "650px" },
            min700: { min: "700px" },
            max700: { max: "700px" },
            min750: { min: "750px" },
            max750: { max: "750px" },
            min800: { min: "800px" },
            max800: { max: "800px" },
            min850: { min: "850px" },
            max850: { max: "850px" },
            min876: { min: "876px" },
            max876: { max: "876px" },
            min900: { min: "900px" },
            max900: { max: "900px" },
            min950: { min: "950px" },
            max950: { max: "950px" },
            min1000: { min: "1000px" },
            max1000: { max: "1000px" },
            min1050: { min: "1050px" },
            max1050: { max: "1050px" },
            min1100: { min: "1100px" },
            max1100: { max: "1100px" },
            min1150: { min: "1150px" },
            max1150: { max: "1150px" },
            min1180: { min: "1180px" },
            max1180: { max: "1180px" },
            min1200: { min: "1200px" },
            max1200: { max: "1200px" },
            min1250: { min: "1250px" },
            max1250: { max: "1250px" },
            min1300: { min: "1300px" },
            max1300: { max: "1300px" },
            min1350: { min: "1350px" },
            max1350: { max: "1350px" },
            min1400: { min: "1400px" },
            max1400: { max: "1400px" },
        },
    },
    plugins: [],
};

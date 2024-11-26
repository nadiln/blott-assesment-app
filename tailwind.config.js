// module.exports = {
//     content: [],
//     content: ["./App/**/*.{js,jsx,ts,tsx}"],
//     theme: {
//         extend: {
//             colors: {
//                 "bg-screen-surface": "#FFFFFF",
//             },
//             // fontFamily: {

//             //     thin: ["PlusJakartaSans_100Thin", "sans-serif"],
//             //     medium: ["PlusJakartaSans_500Medium", "sans-serif"],
//             //     semibold: ["PlusJakartaSans_600SemiBold", "sans-serif"],
//             // },
//         },
//         // colors: {
//         //     "bg-solid-black": "#080E1E",
//         //     "bg-sub-text-color": "#646464E",
//         //     "bg-text-color": "#FFFFFF",
//         // }
//     },
//     plugins: [],
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./App/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                "primary": "#523AE4",
                "bg-screen-surface": "#FFFFFF",
            },
        },
    },
    plugins: [],
}
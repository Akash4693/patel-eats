"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeStore = void 0;
var zustand_1 = require("zustand");
var middleware_1 = require("zustand/middleware");
exports.useThemeStore = (0, zustand_1.create)()((0, middleware_1.persist)(function (set) { return ({
    theme: "light", // Default theme
    setTheme: function (theme) {
        var root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem("vite-ui-theme", theme);
        set({ theme: theme });
    },
    loadThemeFromStorage: function (storageKey, defaultTheme) {
        var storedTheme = localStorage.getItem(storageKey) || defaultTheme;
        set({ theme: storedTheme });
    },
    initializeTheme: function () {
        if (typeof window !== "undefined") {
            var storedTheme = localStorage.getItem("vite-ui-theme");
            var themeToApply = storedTheme;
            // Apply the theme to the HTML root element
            var root = window.document.documentElement;
            root.classList.remove("light", "dark");
            root.classList.add(themeToApply);
            set({ theme: themeToApply });
        }
    },
}); }, {
    name: "theme-store", // Name of the storage key
    storage: (0, middleware_1.createJSONStorage)(function () { return localStorage; }), // Use localStorage for persistence
}));

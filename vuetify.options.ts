// vuetify.config.ts
import {defineVuetifyConfiguration} from 'vuetify-nuxt-module/custom-configuration'

export default defineVuetifyConfiguration({
    /* vuetify options */
    icons: {
        defaultSet: 'mdi',
        sets: ['mdi', 'fa']
    },
    theme: {
        defaultTheme: 'dark',
        themes: {
            dark: {
                dark: true,
                colors: {
                    background: '#171d25', // Dark background
                    surface: '#1a293a',
                    primary: '#132b4a',
                    secondary: '#dd7700',
                    accent: '#156b9c',
                    positive: '#28a745',
                    negative: '#dc3545',
                    info: '#17a2b8',
                    warning: '#ffc107',
                    error: '#dc3545'
                },
                variables: {
                    'border-color': '#000000',
                    'border-opacity': 0.12,
                    'high-emphasis-opacity': 0.87,
                    'medium-emphasis-opacity': 0.60,
                    'disabled-opacity': 0.38,
                    'idle-opacity': 0.04,
                    'hover-opacity': 0.04,
                    'focus-opacity': 0.12,
                    'selected-opacity': 0.08,
                    'activated-opacity': 0.12,
                    'pressed-opacity': 0.12,
                    'dragged-opacity': 0.08,
                    'theme-kbd': '#212529',
                    'theme-on-kbd': '#FFFFFF',
                    'theme-code': '#F5F5F5',
                    'theme-on-code': '#000000'
                }
            },
            light: {
                dark: false,
                colors: {
                    background: '#f0f0f0', // Light background
                    surface: '#FFFFFF',
                    primary: '#132d4e',    // Primary dark blue
                    secondary: '#1f4f70',  // Complementary secondary blue
                    accent: '#166c9d',     // Accent blue
                    positive: '#28a745',   // Green for positive actions
                    negative: '#dc3545',   // Red for negative actions
                    info: '#17a2b8',       // Teal-blue for informational messages
                    warning: '#ffc107',    // Yellow/orange for warnings
                    error: '#dc3545'       // Using same as negative
                },
                variables: {
                    'border-color': '#000000',
                    'border-opacity': 0.12,
                    'high-emphasis-opacity': 0.87,
                    'medium-emphasis-opacity': 0.60,
                    'disabled-opacity': 0.38,
                    'idle-opacity': 0.04,
                    'hover-opacity': 0.04,
                    'focus-opacity': 0.12,
                    'selected-opacity': 0.08,
                    'activated-opacity': 0.12,
                    'pressed-opacity': 0.12,
                    'dragged-opacity': 0.08,
                    'theme-kbd': '#212529',
                    'theme-on-kbd': '#FFFFFF',
                    'theme-code': '#F5F5F5',
                    'theme-on-code': '#000000'
                }
            },
        }
    }
})
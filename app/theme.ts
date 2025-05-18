export const theme = {
  colors: {
    // Brand Colors
    brand: {
      primary: "#0072BC", // PartnerLinQ Blue
      secondary: "#005A94", // Darker Blue
      accent: "#00A0DC", // Light Blue
    },

    // UI Colors
    ui: {
      background: "#f8fafc",
      foreground: "#1a1a1a",
      glass: {
        background: "rgba(255, 255, 255, 0.7)",
        border: "rgba(255, 255, 255, 0.2)",
      },
      header: {
        text: "#0072BC",
        poweredBy: "#6B7280",
      },
    },

    // Message Colors
    message: {
      user: {
        background: "#0072BC",
        text: "#FFFFFF",
      },
      ai: {
        background: "rgba(255, 255, 255, 0.7)",
        text: "#1a1a1a",
        name: "#0072BC",
      },
    },

    // Gradient Colors
    gradient: {
      primary: "hsl(214.74, 95%, 87%)",
      secondary: "hsl(218.18, 85%, 91%)",
      overlay: {
        start: "rgba(59, 130, 246, 0.05)",
        end: "rgba(147, 197, 253, 0.05)",
      },
    },

    // Interactive Elements
    interactive: {
      button: {
        background: "#0072BC",
        hover: "#005A94",
        text: "#FFFFFF",
      },
      input: {
        background: "rgba(255, 255, 255, 0.5)",
        border: "#E2E8F0",
        focus: {
          border: "#0072BC",
          ring: "rgba(0, 114, 188, 0.2)",
        },
      },
    },
  },

  // Animation Durations
  animation: {
    fast: "0.2s",
    normal: "0.3s",
    slow: "0.5s",
  },

  // Blur Effects
  blur: {
    light: "5px",
    medium: "10px",
    heavy: "20px",
  },
};

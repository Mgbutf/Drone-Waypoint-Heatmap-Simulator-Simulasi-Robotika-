# UAV Telemetry & Volumetric Heatmap Simulator

A lightweight, browser-based 3D simulation for Unmanned Aerial Vehicle (UAV) flight path tracking and volumetric data visualization. Built to demonstrate spatial data rendering, procedural environment mapping, and 3D camera calibration for high-altitude asset monitoring.

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Tech Stack](https://img.shields.io/badge/Tech-Three.js%20%7C%20TailwindCSS-blue)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Features

- **Procedural 3D Rendering**: Generates an interactive sci-fi holographic grid environment.
- **Dynamic Waypoint Interpolation**: Calculates and animates smooth UAV flight paths across multiple 3D coordinate nodes (X, Y, Z).
- **Volumetric Heatmap Blocks**: Visualizes data density dynamically. Block scale and color intensity scale procedurally based on altitude variables.
- **Calibrated Orbit Camera**: Pre-configured high-altitude camera target ensuring mid-air assets and flight paths remain in focus without clipping.
- **Real-time Telemetry UI**: HUD overlay calculating and displaying real-time altitude metrics seamlessly integrated over the WebGL canvas.

## 🛠️ Tech Stack

- **Graphics**: [Three.js](https://threejs.org/) (ES Modules)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via CDN for rapid deployment)
- **Architecture**: Vanilla JavaScript / HTML5 Canvas

## ⚙️ Installation & Usage

Since this project utilizes ES Modules to import Three.js, it must be run on a local HTTP server to avoid CORS restrictions.

1. **Clone the repository**
```bash
   git clone [https://github.com/chsianturi/drone-waypoint-simulator.git](https://github.com/chsianturi/drone-waypoint-simulator.git)
   cd drone-waypoint-simulator

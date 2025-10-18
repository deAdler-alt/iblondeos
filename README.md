# iBlondeOS - Orbital Shield Interface

---

## The Problem

With adversaries developing anti-satellite weapons, orbital jammers, and cyberattacks, Europe's space assets (navigation, communications, and Earth observation) are under threat. This challenge addresses the need for solutions that contribute to protect space assets from fast-developing threats through detection and analysis capacity (support to space domain awareness) and countermeasures.

## ️ Our Solution: The Orbital Shield
**iBlondeOS** is a web application that simulates and visualizes space domain awareness in real-time.

It features a live 3D interface (built with **React Three Fiber**) connected to a backend (Node.js/Socket.io) that runs a threat simulation. The dashboard provides a "mission control" experience, allowing an operator to instantly see when an asset is compromised.

##  Key Features
* **Real-time 3D Visualization:** An interactive globe surrounded by simulated satellite assets, built with `three.js`.
* **Live Threat Simulation:** A backend service (`Socket.io`) continuously simulates threats, such as proximity alerts from unknown objects.
* **Dynamic Alert System:**
    * **Visual:** Threatened assets instantly turn red and pulse with a "Bloom" effect.
    * **UI:** The sidebar updates with a live list of active alerts.
    * **Popups:** Real-time "toast" notifications appear on new threats.
* **Dynamic Orbital Graph:** A dynamic graph overlays the 3D scene, drawing lines from Earth to all assets and showing their (simulated) distance. Threat lines are highlighted in red.
* **Interactive UI:** Click on any satellite in the 3D scene to highlight it in the asset list.
* **Full-Stack Architecture:** A decoupled React frontend and a Node.js (Express) backend.

##  Tech Stack
* **Frontend:**
    * React
    * React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
    * Socket.io-client
    * `react-toastify` (for popup alerts)
* **Backend:**
    * Node.js
    * Express.js
    * Socket.io
* **3D Effects:**
    * `@react-three/postprocessing` (for the "Bloom" glow effect)

## How to Run Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites
* Node.js (v18 or later)
* npm

### Installation & Launch

1.  **Clone the repo:**
    ```sh
    git clone [github.com/deAdler-alt/iblondeos](https://github.com/deAdler-alt/iblondeos.git)
    cd 
    ```

2.  **Set up the Backend (Terminal 1):**
    ```sh
    cd server
    npm install
    npm start
    ```
    *The server will be running on `http://localhost:3001`*

3.  **Set up the Frontend (Terminal 2):**
    ```sh
    cd client
    npm install
    npm start
    ```
    *The application will open automatically on `http://localhost:3000`*

## The Team
* **iBlondeOS**

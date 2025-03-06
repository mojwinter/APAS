from picamera2 import Picamera2
import cv2
import numpy as np
import asyncio
import websockets
import json
import threading
import time
from util import get_parking_spots_bboxes, empty_or_not

# Initialize Camera
picam2 = Picamera2()
picam2.configure(picam2.create_preview_configuration(main={"size": (640, 480)}))
picam2.start()

# Load parking mask
mask_path = "/home/mwinter/apas-project/parkingdetection/mask_crop.png"
mask = cv2.imread(mask_path, 0)  # Read as grayscale

if mask is None:
    print(f"Error: Could not load mask image from {mask_path}")
    exit()

# Resize mask to match the frame size (640, 480)
mask_resized = cv2.resize(mask, (640, 480))

# Convert to 3-channel for overlay, just taking grayscale and making it rgb
mask_colored = cv2.merge([mask_resized, mask_resized, mask_resized])

# Detect parking spots from the mask
connected_comp = cv2.connectedComponentsWithStats(mask_resized, 4, cv2.CV_32S)
spots = get_parking_spots_bboxes(connected_comp)
spots_status = [None for _ in spots]

print(f"Detected {len(spots)} parking spots.")
frame_number = 0

# Store connected WebSocket clients
clients = set()

async def websocket_handler(websocket, path):
    """Handles incoming WebSocket connections and sends parking updates."""
    clients.add(websocket)
    print("Client connected!")  # Debugging connection
    try:
        async for message in websocket:
            if message == "ping":
                await websocket.send("pong")  # Keep connection alive
    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected.")
    finally:
        clients.remove(websocket)

async def send_updates():
    """Sends parking status updates to all connected clients every second."""
    global frame_number
    last_update_time = time.time()

    while True:
        now = time.time()
        elapsed = now - last_update_time

        if elapsed >= 1:  # Ensure updates every exactly 1 second
            last_update_time = now  # Reset timer

            print(f"[DEBUG] Running send_updates() at frame {frame_number}")  # Debug print

            frame = picam2.capture_array()
            frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

            for spot_inx, spot in enumerate(spots):
                x1, y1, w, h = spot
                spot_crop = frame[y1:y1 + h, x1:x1 + w, :]
                spot_status = empty_or_not(spot_crop)
                spots_status[spot_inx] = spot_status

            # Convert to JSON
            parking_data = {f"spot_{i}": "empty" if status else "occupied" for i, status in enumerate(spots_status)}

            print("[DEBUG] Sending WebSocket Data:", parking_data)  # Debugging print

            # Send updates through the WebSocket (Fixed asyncio issue)
            if clients:
                await asyncio.gather(*[asyncio.create_task(client.send(json.dumps(parking_data))) for client in clients])

        await asyncio.sleep(5)  # Small sleep to prevent CPU overuse, it was getting hot

async def start_websocket_server():
    """Starts the WebSocket server."""
    print("Starting WebSocket server...")
    server = await websockets.serve(websocket_handler, "0.0.0.0", 8765)
    print("WebSocket server started on ws://0.0.0.0:8765")
    await server.wait_closed()

def show_camera_feed():
    """Runs the camera feed in a separate thread to avoid blocking asyncio."""
    global frame_number
    while True:
        frame = picam2.capture_array()
        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

        # Apply mask overlay with transparency
        overlay = cv2.addWeighted(frame, 0.7, mask_colored, 0.3, 0)

        if frame_number % 10 == 0:  # Updates every 10 frames for smoother updates
            for spot_inx, spot in enumerate(spots):
                x1, y1, w, h = spot
                spot_crop = frame[y1:y1 + h, x1:x1 + w, :]
                spot_status = empty_or_not(spot_crop)
                spots_status[spot_inx] = spot_status

        for spot_indx, spot in enumerate(spots):
            x1, y1, w, h = spots[spot_indx]
            spot_status = spots_status[spot_indx] if spots_status[spot_indx] is not None else False  # Default to occupied
            color = (0, 255, 0) if spot_status else (0, 0, 255)  # Green if empty, Red if occupied
            overlay = cv2.rectangle(overlay, (x1, y1), (x1 + w, y1 + h), color, 2)

        # Display the overlayed frame
        cv2.imshow('Parking Spot Detection', overlay)

        # Prevent blocking by checking key press without pausing execution
        if cv2.waitKey(1) == ord('q'):
            return  # Exit the thread properly

        frame_number += 1

    picam2.stop()
    cv2.destroyAllWindows()

async def main():
    """Runs the WebSocket server and parking updates while keeping the camera feed running."""
    camera_thread = threading.Thread(target=show_camera_feed, daemon=True)
    camera_thread.start()

    # Run WebSocket server and updates separately
    asyncio.create_task(start_websocket_server())  # No longer blocking
    asyncio.create_task(send_updates())  # Runs independently
    while True:
        await asyncio.sleep(1)  # Keeps the event loop alive

# Run everything
asyncio.run(main())

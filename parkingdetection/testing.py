import asyncio
import websockets
import json
import time

# Number of parking spots (Assumed, change as needed)
NUM_SPOTS = 10  # Adjust this to match your actual parking spot count

def generate_mock_parking_data(toggle):
    """Generates mock parking data alternating between even and odd spots occupied."""
    return {f"spot_{i}": "occupied" if (i % 2 == toggle) else "empty" for i in range(NUM_SPOTS)}

# Store connected WebSocket clients
clients = set()

async def websocket_handler(websocket, path):
    """Handles incoming WebSocket connections and sends parking updates."""
    clients.add(websocket)
    print("Client connected!")
    try:
        async for message in websocket:
            if message == "ping":
                await websocket.send("pong")  # Keep connection alive
    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected.")
    finally:
        clients.remove(websocket)

async def send_mock_updates():
    """Sends mock parking status updates to all connected clients every 5 seconds."""
    toggle = 0
    while True:
        parking_data = generate_mock_parking_data(toggle)
        toggle = 1 - toggle  # Flip toggle between 0 and 1

        print("[DEBUG] Sending Mock WebSocket Data:", parking_data)

        if clients:
            await asyncio.gather(*[asyncio.create_task(client.send(json.dumps(parking_data))) for client in clients])

        await asyncio.sleep(5)  # Send every 5 seconds

async def start_websocket_server():
    """Starts the WebSocket server."""
    print("Starting Mock WebSocket server...")
    server = await websockets.serve(websocket_handler, "0.0.0.0", 8765)
    print("Mock WebSocket server started on ws://0.0.0.0:8765")
    await server.wait_closed()

async def main():
    """Runs the WebSocket server and mock updates."""
    asyncio.create_task(start_websocket_server())  # Start WebSocket server
    asyncio.create_task(send_mock_updates())  # Send mock updates continuously
    while True:
        await asyncio.sleep(1)  # Keeps the event loop alive

if __name__ == "__main__":
    asyncio.run(main())

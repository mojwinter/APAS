## Project Overview:

Automated Parking Availability System (APAS):

APAS is a parking availability system designed to recognize occupancy of a parking garage and display the information on through web applications and mobile devices to allow for reserving and payment of parking for visiting clients.

The system leverages machine learning for vehicle detection, using a YOLOv8 object detection model implemented in PyTorch. The model runs directly on a Raspberry Pi 4 hardware platform with wide-angle cameras, capturing video at 30 FPS and providing inference with approximately 120 ms latency.
Real-time updates are provided via a WebSocket server built with Node.js, allowing connected clients to receive instantaneous status changes. The React.js–based web application serves as the user interface, offering features such as live parking visualization, reservation booking, and payment processing.
APAS Tech Stack:

![image](https://github.com/user-attachments/assets/44b4a90a-2d17-4017-a289-30a5b00a0aff)

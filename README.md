# Project Overview:

Automated Parking Availability System (APAS):

APAS is a smart parking management system that detects and displays the real-time occupancy of a parking garage, enabling users to view availability, make reservations, and process payments through web and mobile applications.

The system leverages machine learning for vehicle detection, using a YOLOv8 object detection model implemented in PyTorch. The model runs directly on a Raspberry Pi 4 hardware platform with wide-angle cameras, capturing video at 30 FPS and providing inference with approximately 120 ms latency.

Real-time updates are provided via a WebSocket server built with Node.js, allowing connected clients to receive instantaneous status changes. The React.js–based web application serves as the user interface, offering features such as live parking visualization, reservation booking, and payment processing.


# APAS System Architecture:
![image](https://github.com/user-attachments/assets/d184cead-4589-4f3a-adee-d0dafb46bb36)

## Image Detection
![image](https://github.com/user-attachments/assets/8bf7dd97-6b4f-4b5c-94bf-7d76f83a9073)

The system architecture of the Raspberry Pi involves the main image detection script that handles all 
camera modules and execution of the model as well as WebSocket handling for broadcasting. This script 
is executed in a python virtual environment and loads the model, mask and utility script from the home 
directory of the Raspberry Pi. Two wide angle RPI Camera Module 3s connect to the two Mini 22-pins on 
the board of the Raspberry Pi; however, in the final implementation only one was used, as the burden on 
the system caused by one single camera was immense and handling two became out of the scope of the project.

## Mobile App
![image](https://github.com/user-attachments/assets/7d5bb09a-870d-491b-ba91-e1de8c91bb1a)

The client-facing app interface acts as a core visual and interactive layer for clients to interact with the 
parking system. Although the app has multiple pages for finding and booking parking the design is 
considered a single-page application (SPA) as the application handles routing using JavaScript to 
intercept navigation events and dynamically render components without full page reload.

## Admin Dashboard
![image](https://github.com/user-attachments/assets/90b82c2b-5f7d-4845-bcaa-aab977328041)

The Admin Dashboard acts as centralized hub for stakeholders such as parking operators and 
management to access real-time system data, monitor usage patterns and perform administrative actions. 
Through a clean, component-driven UI, the dashboard provides insights into revenue trends, occupancy 
rates and session activity across all locations.

The architecture of the dashboard is designed around a modular, scalable frontend built with modern 
JavaScript frameworks, and a WebSocket-driven communication layer that bridges client-side booking 
events with live detection data from a Raspberry Pi.

# Layouts

## Mobile App

### Inactive Parking View
![image](https://github.com/user-attachments/assets/7b6e28c9-f725-4d98-956c-e3152b793c25)
![image](https://github.com/user-attachments/assets/754092eb-466c-4a5a-9455-178a5c9e5244)
![image](https://github.com/user-attachments/assets/ffbc0e1e-4334-4eb0-8dbf-08b9223690d1)

On app first load, users are presented with the Home page, displaying a welcoming interface and highlighting key quick actions available, in addition to recent locations for shortcutting repetitive user actions. These quick actions include a “Find Parking” tab, which directs users to browse available parking locations, as well as a “History” tab, navigating to active and past parking sessions.
The bottom navigation bar allows users to navigate to other key pages such as the history page leading to the same page as the quick action. This page shows a chronological list of active and completed parking sessions, including:

-	Location name and address
-	Date and time of the session
-	Zone and spot number
-	Total amount paid
  
Currently each entry is marked with the “Completed” status badge, indicating each session has expired.
The last section on the navigation bar is the profile page which servers as a single location for users to manage their credentials, such as display name, email address and payment details for bookings and renewals. Other miscellaneous features are offered such as past notifications from the system and security and privacy notices involving the disclosure of image detection and the usage of data.

### Finding Parking View
![findparkingv4](https://github.com/user-attachments/assets/a8b3bc3f-8f20-4302-a6a3-64b686cbfe03)

The find parking view allows users to easily locate parking lots based on their current location or desired destination. As shown in figure above, users begin by browsing a list of nearby parking locations, where each listing provides the following essential information:

- Name and address of the parking facility
- Hourly rate (e.g. $2.50/hr)
- Distance form the user’s current location
- Number of available spots
- User rating, manually imported from Google Maps
  
After selecting their desired location, the user is navigated to the parking booking page. This seamless navigation system guides the user from exploration to action with a single tap, emphasizing ease of use and intuitive interaction. By structuring the app this way with a scrollable list of available locations and lot availability, combined with bookings one tap away, helps ensure that users are consistently engaged throughout the discovery and booking process. The underlying location availability display is tracked through a parking context system that can access the state of each parking spot and keep a real-time count for available and taken spots.

![bookparking](https://github.com/user-attachments/assets/e66599fd-aec2-4795-8d62-09a67a3f6fcb)

In the “Book Parking” interface the user can configure the details of their reservation. As illustrated in the above figure, this screen allows users to first choose their desired parking duration in the form of a dropdown menu. The app offers multiple time options depending on the parking location, for this example ranging from 30 minutes to 4 hours, with the corresponding price displayed next to each selection. This flexible pricing model accommodates the needs of different, from short errands to long-term stays.

Once a duration is selected, the system automatically calculates and displays the start and end time of the session, easing trip planning in a clear summary before booking. 

Below the time slot selection, users are presented with a visual parking map with numbered spots corresponding to real lot’s layout. Spots are clearly labelled between taken, available and currently selected through intuitive colour-coding. This visual feedback ensures that users can identify available spaces and choose a spot more suitable for their use case, such as closer to a certain retail store or desired location.

This well-structured process ensures that users can efficiently secure a parking space with minimal effort, all while having full transparency over availability and cost.

### Active Parking View

![image](https://github.com/user-attachments/assets/7c138f7e-5c87-4709-91f5-b25380f3a33d)

After successfully booking a parking spots, the session immediately appears in the “Parking History” tab. As illustrated in the figure above, ongoing parking session are clearly labelled as active, allowing users to easily differentiate between ongoing parking bookings and expired bookings.

Clicking on an active parking booking brings users to the “Parking Details” page that presents a live countdown timer showing the remaining duration of their session, offering real-time monitoring for customers. Underneath this section is a live parking map which displays the state of all parking spots including a “You” label for the users currently occupied spot for that session. Additional context is offered in the form of parking details such as location, date and start/end times to help users keep track of their current reservation. This screen ensures that users can monitor their active bookings and revisit key information as needed, allowing them to stay informed throughout their entire parking experience under the ecosystem.

![image](https://github.com/user-attachments/assets/3d43bf88-28bc-4839-bb0f-26044a00c188)

When a user has an active parking session, the homepage dynamically updates to reflect their booking in real-time. As shown in the figure above, the standard homepage embeds an active parking banner, providing an at-a-glance summary of the current booking. This includes details such the parking zone, location and session time alongside a live countdown timer indicating how much time is remaining on their reservation.

The countdown ensures that users are constantly aware of their active session without needing to navigate to the “History” tab and “Parking Details” screen. This way the most relevant and time pertinent information is accessible upfront, reinforcing a user-centered approach built with the user’s habits and intentions in mind.

## Admin Dashboard

### Main Dashboard
![image](https://github.com/user-attachments/assets/32845a2a-b820-4b84-a7f7-4fcbf3881289)

The web app dashboard provides a centralized view for administrators to monitor parking activity in real time. At the top, key stats are displayed including total revenue, active sessions, occupied spots, and the overall occupancy rate.
The middle of the dashboard features charts for a revenue overview and an occupancy rate chart that tracks how usage fluctuates over a 24-hour period. Below, a table shows active parking sessions, listing the user ID, location, parking zone, session times, payment amounts, and parking status. This allows admins to quickly manage ongoing sessions or resolve any issues.
Overall, the dashboard is clean, intuitive, and designed to help lot managers make informed decisions based on real-time data.

### Locations View
![image](https://github.com/user-attachments/assets/9f00d03b-2e0c-4036-a139-395c35a3a37e)

The Locations page in the web app lets administrators manage parking facilities. Each location card displays a photo, name, address, hourly rate, making it easy to monitor which how many spots are currently in use.
At the bottom of the page, there’s a real-time parking map for the specified parking zone. Each space is color-coded to show its status: green for available, red for expired, and blue for occupied.

### Parking Spots View
![image](https://github.com/user-attachments/assets/894a298b-989a-4c2c-ab8d-0cc506b0da93)

The Parking Spots page gives administrators a detailed, table view of all parking spots. Each row shows the spot ID, location, current status, assigned user, remaining time, hourly rate, and available actions.
At the top, a notification highlights how many spots have expired, helping admins quickly spot violations or overstays. Expired spots are marked in red, with options to send a warning or end the session manually. Active spots display a time estimate for when the session will end.
This page is essential for real-time parking enforcement and session tracking, giving admins full control over who’s parked where and for how long.

### Parking Sessions View
![image](https://github.com/user-attachments/assets/6da84545-e154-4bbc-a872-0a011b00761c)

The Parking Sessions page provides a full log of all past and active parking sessions across every location. Each entry includes the session ID, user, parking lot, specific spot, start and end times, total amount charged, status, and payment state.
Session statuses and payments are color-coded, making it easy to quickly scan for any incomplete or problematic sessions. Admins can also filter by status, location, or time.

### Users View
![image](https://github.com/user-attachments/assets/fab4c396-4c5c-4f1c-adc1-866c0e1b3d98)

The users page is the hub for managing registered parking users. Each row displays key info like name, email, phone number, total sessions, amount spent, and activity history including join date and last active date.
Admins can search, sort, or filter users quickly using the tools at the top, and they have the option to edit or delete any user from the system. This makes it easy to keep user records up to date or remove inactive accounts.

### Analytics View
![image](https://github.com/user-attachments/assets/bb6945d0-8d18-4437-a968-c744dd80ad51)

The analytics page gives admins a breakdown of key performance data across all parking locations. It includes visual insights like the revenue by location, occupancy by hour, spot status distribution, and average parking duration.
Admins can filter the data by time period and export reports directly from the page. Overall, this section helps inform decisions around pricing, availability, and overall system performance.

### System Settings View
![image](https://github.com/user-attachments/assets/4d665eff-55d1-48b0-a53d-596b6c72b6a9)

The settings page allows admins to configure key system preferences and integrations for the platform. The General tab includes basic system info like the dashboard name, email address, and time zone settings.
On the right, Parking Settings let admins adjust the default booking duration, buffer time between reservations, and enable options like parking extensions and expiration reminders.
Below, there are panels for configuring integrations including the payment gateway, notification service, and data backup schedule. 


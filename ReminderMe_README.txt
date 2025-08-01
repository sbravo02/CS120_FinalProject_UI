ReminderMe – Email Reminder Web App

Project Overview
Our web app allows users to create, schedule, and manage email reminders.
The interface is fully responsive, includes basic JS validation, and is ready to connect to the PHP + MySQL backend for full functionality.

Current Progress (Frontend – Completed)
I have completed the UI/UX implementation:

- Form to create reminders (Title, Message, Date, Time, Frequency).
- Responsive design with a modern hero banner and animations.
- Reminder list with Edit and Delete buttons.
- Basic JavaScript validation to prevent empty fields and past dates.
- Integration-ready: main.js is prepared to communicate with our PHP endpoints.

All frontend files are in the same folder for simplicity, so my part is fully ready to be integrated with the backend.

Next Steps for Backend Integration
The following tasks are required to make the app fully functional:

1. Database Setup (MySQL)
  
2. PHP Endpoints
   - Implement the backend logic in these files:
     - create_reminder.php → Insert new reminder
     - list_reminders.php → Fetch reminders for the table
     - update_reminder.php → Edit an existing reminder
     - delete_reminder.php → Remove a reminder
   - Each endpoint should:
     - Read JSON input with json_decode(file_get_contents('php://input'), true)
     - Return JSON responses with header('Content-Type: application/json')

3. Email Sending (Optional for MVP)
   - Use SendGrid or Mailgun API to send reminder emails.
   - Configure a cron job to check pending reminders every 15 minutes and send emails.

Deployment Notes
- All files are in the same folder → Easy to upload to SiteGround public_html.
- No additional routing is required.
- Frontend and backend will communicate directly through the PHP files.

Next step: Once the backend and database are ready, the app will be fully functional.
My frontend is complete and ready for integration.

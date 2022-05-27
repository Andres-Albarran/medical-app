# Medical app

This software built in node js and mongoDB serves the purpose of making easier the administration of a doctor's office by providing the doctor the opportunity to register the patients, so the doctor can send them all their medical results, so the doctor can have a easy way to acces to the medical history of the patients, and so the patients can enter into the app by using their username and password assigned by the doctor to see their medical prescriptions and history. Also the app helps the doctor to create a schedule of medical appointments, and gives the patient the date and hour of his/her appointment. In this way, the app provides the doctor a clear notion of the patient's treatments.

# Usage

1) Inside a terminal, use the following command: "npm i" to install all the dependencies.
2) Enter to the "database.js" file inside "src" and in the variable"mongodb_uri" paste your mongoDB database's link.
3) Enter to the "server.js" file inside "src" and uncomment the function "insertAdmin" that have all the login credentials of the system's administrator.
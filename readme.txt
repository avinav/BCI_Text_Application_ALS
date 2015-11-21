#Demo 
Youtube Link: [Brain Computer Interface for ALS & physically challenged patients](https://www.youtube.com/watch?v=gTEGdwiz1P8)

#Inspiration
More than 30,000 people in the U.S. are diagnosed with amyotrophic lateral sclerosis (ALS). There is no known cure for ALS and only one FDA-approved drug, riluzole, which may only add a year to a patient’s life span. Because of this disease, patients are not able to perform basic necessities in their life. We wanted to build a tool for ALS patients and for those who cannot perform physical activities, that can understand their emotions and empower them to communicate with the world.

#What it does
provides a tool for ALS patients to perform basic interactions. It uses Muse headband and alphacore board style web app to understand the patient's emotions and gestures using the EEG signals generated in their brain. Interactions that can be performed with the app includes chatting, asking basic question (like what time or date is), or calling their caretaker.

#How I built it
We used Muse to capture movement of the specific set of muscles. For now, we are focusing on eye blinks and jaw clenches to store response from patients. We are expecting that the patient can control at least one of the two muscles. We also built an alphacore board as a web app that be controlled by the patients using their gestures and emotions. The communication between patients and the rest of the world is done using Twilio API.



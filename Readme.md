# API Endpoints
##1. POST Offers 
Offers can be posted on /offers endpoint (localhost:3000/offers). For testing purposes I would suggest you to use postman to test the post service. Also a sample body Schema is given in the sample folder (sample/sampleOffer-post.txt)

# Warning:
While using the code, please be aware of changing username and password from the app/configurations/dbVanillaConfigInfo.json also make apporpriate changes to the index.js file

I am aware that hardcoding username and password like this, is not a good way. However, I plan to use hash and salt and verify these information with my server once I am through the initial development page. I hope you understand.

# Default timings 
I have used some default value for MainMenuOption, for eg:
1. Breakfast : 9:00 AM to 11:00 AM
2. Lunch : 12:00 PM to 2:00 PM
3. Dinner : 7:00 PM to 11:00 PM
4. Delivery : 11:00 AM to 11:00 PM
5. Drinks & NightLife : 10:00 PM to 2:00 AM
6. Takeout : 11:00 AM to 11:00 PM
You are free to change these values while programming 

# Sample folder
this folder contains basic and sample offer information, which I used for testing purposes. Feel free to use these sample values or create your own under the same line.

# Latest Updates
08/27/2018
8:06 PM
All things pertaining to posting an offer is done. As a use case, a logged in user can post any offer with all the validation test pre performed.

08/27/2018
2:58 AM
googleID is stored in cookies, this information is used to decide if a person should be able to see myOffers and postOffers page. Only a logged in user can see theses pages.

08/22/2018
12:03 AM
User can now login and logout (via google). I intend to addd facebook login soon.  
Anyone who visits the website can see all the offers currently available in the database.

# While posting an offer (Posting offer done)
1. check is this.state gets everything needed for the form to post (without location) (done)
2. check is server posts this offer to mlab (done)
3. if the offer is visible on the home page (done)
4. git push (done)
5. push location => repeat above steps (done)
6. git push (done)
7. validations on post offer page (from date < to date. from time < to time) (done)
8. bug testing (done)
9. post offers CSS (done)
10. git push (done)

# While getting an offer (Getting offer)
1. create a nodeJS entry point to get all offers posted by a userID
2. Create Node Backend for updation
3. Create node backend for deletion
4. git push
5. Display all these offers
6. Give the option to Delete
7. Give the option to Update
8. git push
9. perform updation and deletion
10. bug testing
11. basic css
12. git push

# Subtle information about the project structure
I have added react basic script to the server app. /Server contains nodejs server code and /client contains the frontend code.
Features: Once command to run and test the repo. Just do np run dev it starts both client and server.

# Future Updates
This will be the flow that I will follow:
### For home page (User logged out)
1. Make the Home page UI a little different for a user who is logged in and for someone who is not. A logged in user will get three option (Post offer, update/delete/modify all offers posted by him/her, and view the offer)
2. integrate google maps. Add search bar to get nearest offers
3. Filter on the offers

### Home page (User Logged in)
1. create a page for user to post offers. with validations
2. users can see the offer they posted and can edit it.

# how to run
1. git pull
2. npm install
3. npm run dev

# API Endpoints
## POST Offers 
Offers can be posted on /offers endpoint (localhost:3000/offers). For testing purposes I would suggest you to use postman to test the post service. Also a sample body Schema is given in the sample folder (sample/sampleOffer-post.txt)  
Please note down the id that is returned as a result. As that id would furthur be used to perfrom udapte and delete operation.  

## GET Offers
### Before getting any offer perfrom these checks
1. Status must be active
2. Current date must be < ValidityToDate
3. current date must be > ValidityFromDate
### These information will be displayed for each offer
1. Restaurant Name
2. Details
3. Location
4. time of offer
5. Validity  

### Sample GET requests
1. Get all Offers  
GET /offers/all  
This will list all the offers currently availale in the database, with performing certain prerequisite checks as stated above.  

2. Get all offer by Restaurant Name, Pincode or id  
GET /offers?name=xxx or GET /offers?pin=xxx or GET /offers?id=xxx  
replace xxx with the search keyword

3. Get all offers by Main menu type option
GET /offers?menu=xxx-xxx-xxx  
you can have one, two or multiple values in place of xxx  
xxx can contain following values ['breakfast','lunch','dinner','delivery', 'Drinks & NightLife','Takeout'] (Case-senstive)  
Please visit the sample/SampleOffer-GET to get a hint of how these queries will look like.    

# Warning:
While using the code, please be aware of changing username and password from the app/configurations/dbVanillaConfigInfo.json also make apporpriate changes to the index.js file

I am aware that hardcoding username and password like this, is not a good way. However, I plan to use hash and salt and verify these information with my server once I am through the initial development iteration. I hope you understand.

# Sample folder
This folder contains basic and sample offer information, which I used for testing purposes. Feel free to use these sample values or create your own under the same line.

# Validations
(Validation that will be resolved via UI constraints)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Validation with main menu  MainMenuOptionType  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Main menu option type must be one from the list  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Validation with daily time of offer  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;startTime must be before endTime(startTime to endTime)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Validation with Dates  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You can't add an offer which started before today's date  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ValidityFromDate > current date  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You can't add on offer which ended before start date  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ValidityToDate > ValidityFromDate  

(Validation in later updates) -- Requires Google Maps Integration  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Validation with location  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Location must be a proper address on google maps.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Validation with pincode  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It must be valid US pincode (later after goole map integration)  
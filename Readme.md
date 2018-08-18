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

1. Get all Offers  
GET /offers/all  
This will list all the offers currently availale in the database, with performing certain prerequisite checks as stated above.  

2. Get all offer by Restaurant Name, Pincode or id  
GET /offers?name=xxx or GET /offers?pin=xxx or GET /offers?id=xxx  
replace xxx with the search keyword

# Warning:
While using the code, please be aware of changing username and password from the app/configurations/dbVanillaConfigInfo.json also make apporpriate changes to the index.js file

I am aware that hardcoding username and password like this, is not a good way. However, I plan to use hash and salt and verify these information with my server once I am through the initial development iteration. I hope you understand.

# Sample folder
This folder contains basic and sample offer information, which I used for testing purposes. Feel free to use these sample values or create your own under the same line.

# Validations
(Validation that will be resolved via UI constraints)  
    Validation with main menu  MainMenuOptionType  
        Main menu option type must be one from the list  
    Validation with daily time of offer  
        startTime must be before endTime(startTime to endTime)  
    Validation with Dates  
        You can't add an offer which started before today's date  
            ValidityFromDate > current date  
        You can't add on offer which ended before start date  
            ValidityToDate > ValidityFromDate  

(Validation in later updates) -- Requires Google Maps Integration  
    Validation with location  
        Location must be a proper address on google maps.  
    Validation with pincode  
        It must be valid US pincode (later after goole map integration)  
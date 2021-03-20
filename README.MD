The task requires two parts:
a) The Business Logic
b) Data fetching
*This makes the process modular. Importing data fetch function will allow it to be reused by
other functions. It is critical to separate the main business logic from util functions.
The business logic function:
The bulk of the logic goes here. I started out with basic validation checks to see if the url is not
empty and the timestamp is a valid timestamp.
After the data validation, I called the fetch data function. Once the results are returned in the
callback function, I started the main processing.
To get day and time from the timestamp I used the JavaScript’s latest Intl functionality. It allowed
me to create two reusable format variables that I can use to convert timestamp to day and time.
Given that we need to print names of trucks, I iterated over the list of trucks and filtered out the
trucks that match the given timestamp criteria. The filtering out could be done using JavaScript’s
filter function, however for better readability I iterated over them using .map() function.
For the condition, I used the “start24” and “end24” keys for each truck object since my converted
time was in 24 hour format.
Finally, I sorted the array of names using .sort() function. This would mean that it would take
nlogn time to sort them.

Time and space complexity:
The time would be directly proportional to the URL fetch time + N + (N
’*logN’
), where N would
be the time taken to iterate over each truck’s data and N’ would be the number of filtered truck
names.
The space required would be proportional to the size of the JSON object fetched from the given
URL.

The data fetch function:
I started by writing the fetch data procedure, where I used the trusted Https module available in
Node.JS. It is an asynchronous function and hence I used callback function to successfully call it
from the main function.

It checks whether the URL provided is valid and returns the data in string format.
I used try/catch and URL module to check if the URL is valid. This way we know if an error has
been thrown and hence can detect if the URL is not valid.

Scope of improvement:
The only way I could think this could be improved is by fetching the data in chunks. If the data is
huge (considering millions of trucks) the Node.JS process would throw out of memory exception.
# ZEN SUBSCRIPTIONS

## backend project link
https://github.com/kbravo10/json-server-template.git

This project is to show my skills in the REACT library. This project displays a list of the subscription the user has. The user can either add or remove subscription.

## Project requirements

- You must make a single page application (only one index.html file) using create-react-app.
- Your app should use at least 3 components in a way that keeps your code well organized.
- There should be at least 2 client-side routes using React RouterLinks to an external site.. Be sure to include a nav bar or other UI element that allows users to navigate between routes. Use RESTful routing conventions where applicable
- Use a json-server to create a RESTful API for your backend and make both a GET and a POST request to the json server. Use a form to make your post request, specifically a controlled form/component. Additionally, you may choose to incorporate data from an external API but it is not required.

  - You should keep your json-server data simple: avoid nested data and associations. You'll learn how to work with more complex data in the next two phases. Focus on the frontend for this project.
  - Upon return of json from your POST request, a state update by a setState function is required!
    // in App:
    function addMovie(newMovie){
    setMovies([...movies, newMovie]) // Updating movies state.
    }

    //in Form
    const configObj = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title: "Titanic"})
    }

    fetch('http://localhost:3000/movies', configObj)
    .then(res => res.json())
    .then(data => addMovie(data)) //THIS STATE UPDATE IS REQUIRED!!!
    // clear form

## Creating project

Created a file in my local repository then ran `create-react-lab` to create create my project to be able to code it using the React library for Javascript.

## Start server

Install `npm install` to begin the project. The resources where you can find all the json data is located in my backend project that is located in my other repository.
After running my backend project(`http://localhost:3000/subscriptions` for my project purposes) i can start my front end project running `npm start`. A new window in my browser will open up displaying my html code produced by my REACT project.

## Functionality

### _ALL of the components `import React from "react"`_

### _Page loads_

Once the page loads you are greeted with a text bar to input ur name and a login button to enter the application. This is the first component `<Login />` and uses the input to create a variable with the user input to use in the next step. It also sets a state variable to `true` that tells the sets the condition enter the step.

### _Page loads_

Once the page loads you are greeted with a header at top center that displays `Welcome {name}!`. Below the header there is navigation bar that is a component `<NavBar>`.Below that there is a small message that tells the user a simple message on what the app does.

### _`<NavBar>`_

This component `imports NavLink from react-router-dom` and also imports `./main.css` on top of `react`.
This returns `<NavLink>`'s that assign a path to specific componets. When ever a NavBar option is clicked it will navigate you to that component. It also adds a path to the url making it easier for the user to be able to see what page they are currently on.

- NavLinks :
  - Home
  - Subscription
  - Add Subscription

### _`<Home />`_

Returns a `<div>` with header `<h2>` with a message to the user.

### _Subscription navlink_

This path naviagates you to the `<SubscriptionCollection />`. This componet imports `<Subscription />` component, `<UserMonth />` component, the `main.css` file, and a `useState` and `useEffect` hooks.

We then declare two `useState hooks`. One state is used to store the data reveived by the fetch request and the other state is used to store and set the state to a filter that is used to tell the fetch request what data we are requesting.

We use a `useEffect` hook to only render the fetch statement when the filter state is modified. For the fetch statement we use a GET request since we want to use the data rsponce and store it into the subscriptions state using `setSubscriptions()`.

Declare a `function onHandleSelect()` that fires up when the user chooses an option from the dropdown menu of the types of subscriptions. The user choice is retreived by getting the event.target.value. Using the value an if statement is used and depending on value the if statement sets the filter state.

`Function onHandleSubmit()` is a function used to handle a submit button that retrieves the input of a specific name of a subscription. This function then sets the filter state to the value the user inputed. Then the form is reset to empty to prevent the filter being set to incorrect desired value.

`Function handleReload()` sets the filter state to empty so the fetch request can request all of the data from the server instead of any filteres options the user migth have selected.

The component returns HTML code that is then received by the APP component. the HTML code has `<div>`s to to seperate in part of the page into sections. The bar with the search and the dropdown filters is inside a div with classname='filters'. Inside that `<div>` there are two more `<divs>`s each representing each kind of filter. `<form classname='submitbutton'>` has an `<input>` that allows the user to type inside a text box the name of the subscription they wish to see, filtering out all other subscriptions and only displaying the desired outcome.

    <form className="submitbutton" onSubmit={onHandleSubmit}>
        <input placeholder="search..." name="name"></input>
        <button type="submit">search</button>
    </form>

The `<button type=submit>` inside the same form allows the user to submit the name inside the textbox.

    <button type="submit">search</button>

The way that the program knows how to handle the submit is with an `onSubmit` event listener that tells the program to call `onHandleSubmit` and pass the event that just ocuured.

Once the user is done searching and wants to see all of the subscriptions they simply need to click "Show All Subscriptions".

    <button id="allBtn" type="click" onClick={handleReload}>
        Show All Subscriptions
    </button>

This button sets filter state to empty and allows the fetch request to request all data from the server rather than a specific one.

The dropdown slect filter allows the user to select the type of subscription they want to view

    <select onChange={onHandleSelect}>

The `<select>` element allows us to give the user `<option>`s and based on selection return the value with an `onChange` event handler. This value is also used to filter out and display the desired subscriptions.

After `<div className="typesOf">` section, if the user has not choosen any filter we then enter the `<div classname="cards">`. This section of the HTML traverses threw the subscription state(the array that is assigned the data from from the server) and sends a prop to the `<Subscription>` component.
If the array is empty, it displays a message

    <p className="emptyList">You have no Subscriptions here</p>

### _`<Subscription> componet`_

Import `Link` form `react-router-dom` and imports the `main.css`. This componets calls a `function Subscription` that has prop `sub`. It returns a `<div className="card">` that uses the sub prop to display information. The sub prop itself is an object with keys and each key is assigned to a specific value. It displays name of the subscription `<h3>{sub.type}</h3>` (type means name in this specific sititaion) followed by an image of the logo `<img className="subscriptionImage" alt="oops" src={sub.logo} />`.
At the bottom of the card it has a link that directs the user to `<SubInfo>`.

    <Link className="link" to={`/subscription/${sub.id}`}>
        View Subscription
    </Link>

This component returns a Card to the `<SubscriptionCollection>` component and displays the basic information for the user to be able to determine what subscription they are looking at and may want to click the link to.

### _`<SubInfo>` componet_

This component imports `useHistory` and `useParams` from `react-router-dom`and the `main.css`. We then use one useState hook for subscription, we declare a useHistory variable history, and we declace useParms variable params

    const [subscrption, setSubscription] = useState([]);
    const history = useHistory();
    const params = useParams();

The useHistory hook to be able to push to a desired path inside the web browser. Finally the useParams hook is used to retrieve route parameters from a component with the matching route.
A `useEffect` is used to retrieve the desired specific subscription with `params.id`. The response data is the stored into the subscription array by means of `setSubscription(data)`. The effect only renders when params.id is modified or changes.

`Function onHandleDelete()` handles an event listener when "Remove Subscription" is clicked by the user. It launches a confirm asking the user if they are sure they want to remove the object. If the user clicks okay the statement becomes true and a `DELETE fetch request` is rendered. This request find the subscription with the specific id and removes it from the server and the list of subscriptions.

    fetch(`http://localhost:3000/subscriptions/${subscrption.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

An `alert` message is then launched telling the user that the item has been removed from the list.
If the user clicked cancel then the statement is false and the user gets an alert notifying them that they have decided not to remove the subscription.
At the end of the function we use the `useHistory` hook to push the the application to the slected path that we have assigned in this case its "/subscriptions"

    history.push("/subscription");

The component returns the HTML code to the `<SubscriptionCollection>` component. `<div className="infocard">` that contains an image that displays the logo of the subscription, the name of the subscription, the price of the subscription in USD, and button used with onClick to tell the project that the user wants to remove the subscription from the list.

    <img id="infoImg" alt="none" src={subscrption.logo} />
      <h1>{subscrption.type}</h1>
      <p>Type: {subscrption.subscriptionType}</p>
      <strong className="price">Price: ${subscrption.price}</strong>
      <div className="delete">
        <button onClick={onHandleDelete}>Remove Subscription</button>
      </div>

`<button onClick={() => setUserEdit(true)}>Edit Price</button>` is a button that allows the user to change the price instead of having to create an entire new subscription.

`<form className="priceEditBtn">` takes the users new price

    <form className="priceEditBtn" onSubmit={onHandlePriceChange}>
        <label>New price: </label>
        <input type="number" min="0" step="0.01" name="newPrice"></input>
        <button type="submit">submit</button>
    </form>
This form is submited and the users new price is passed to `function onHandlePriceChange()`. The function then calls a PATCH request to modify the servers value for the specific object. 



### _`<UserMonth>` component_

This componets uses a callback function that takes two props {sub, filter}.
A forEach method is called to get sum of all the prices.

    let sum = 0;
    sub.forEach((element) => {
    sum += element.price;
    });

`Function newFilter` takes the filter prop and returns a substring that corresponds to the value of whatever filter the user selected.

    function newFilter() {
    const newText = filter.split("=")[1].toUpperCase();
    return newText;

}

This componet returns HTML code. It displays a message with the specific filter that the user has choosen. It also returns the total price of that filter objects.

    <p>
        Total spent per month on {filter === "" ? "ALL" : newFilter()}{" "}
        subsciption(s)
    </p>
    <p>{totalInDollars.format(sum)}</p>

### _`<AddSubscription>` component_

Imports useHistory and main.css.
Assigns const history to `useHistory()`.
`Function onHandleSubmit()` assigns a variable to an object created by the users input in the `<form>`. A user validation checks if the user enetered the minimum requirements to submit the form. If the requirements are met then a `POST` fetch request is sent to server in order to add data to the server.

    fetch(`http://localhost:3000/subscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitForm),
      }).then((res) => res.json());

An alert pops up informing the user that the form and the onject has been added to the list of there subscription, this also adds it directly to the backend project. If the requirements are not met then the user gets an alert statinmg that the information is invalid and will not added to any list or server. We then `history.push("/subscription")` to send the application to the desired path of the web page.
This component returns HTML code with the `<form classname=addSubscriptionForm>`.

    <div className="type"> prompts the user to input the name of the subscription.

    <div className="price"> prompts the user to input the price of the subscription

    <div className="logo"> prompts the user to enter an image address for the subscription

    <div className="user-eneter-type"> uses a dropdown select to allow the user to choose the subscription type.

    <div className="submit"> displays a button that allows the user to submit the form and the project will sent the event to the function onHandleSubmit().


## Contributions

Pull request are appreciated. Any feed back on improving the project(do's and dont's).

## CITATIONS
### Netflix
logo image: 
- About netflix company assets. (n.d.). https://about.netflix.com/en/company-assets 

### Hulu
hulu image:
- Stream TV and movies live and online. Hulu. (n.d.). https://www.hulu.com/welcome?orig_referrer=https%3A%2F%2Fwww.google.com%2F 

### Amazon
amazon image
- Wikimedia Foundation. (n.d.). File:Amazon Logo.svg. Wikipedia. https://en.wikipedia.org/wiki/File:Amazon_logo.svg 


### Fetch
fetch pet insurance
- Google. (n.d.). Fetch pet insurance - apps on Google Play. Google. https://play.google.com/store/apps/details?id=com.gopetplan.petplanclaims&amp;hl=en_US&amp;pli=1 


# Licence
MIT License

Copyright (c) 2023-present Kevin Bravo

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
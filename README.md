# `SureSell`

## `Description:`

"SureSell" is a useful tool designed to empower salespeople. With SureSell, users can create reference cards to quickly access their inventory and key selling points so their presentation of product can help build consumer confidence.

### `Technologies Used:`

HTML/CSS/JS/React/Node/PostgresQL/Bootstrap/Python/Django REST

### `Installation Instructions:`

1. Fork and clone this repository.
1. Change into the new directory and create a development branch to work on.

### `Component Hierarchy:`
![](https://user-images.githubusercontent.com/65630204/93153894-3faaa580-f6d0-11ea-85c9-a463fe312a43.png)


### `Favorite Function:`
```javascript
componentDidMount() {
       let url = `https://suresell.herokuapp.com/cars/`;
       if (this.state.token) {
           fetch(url, {
               method: 'GET',
               headers: {
                   'Content-Type': 'application/json',
               },
           })
               .then((res) => res.json())
               .then((res) => {
                   this.setState({ features: [...res] });
               });
       }
   }

```
In this code, when the ViewAll component is rendered, token is being checked to see if it is present with an authenticated login. If so run the fetch GET method, then take the response and turn it into a readable json file, then take that response and set the carspecs with that response to be used to make reference cards.


### `Roadmap:`
- User creation
- users accessing their store or teams’ inventory to manipulate
- ding features to their inventory
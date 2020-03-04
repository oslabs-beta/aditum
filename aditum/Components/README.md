# aditum

A custom React component library to support the developers in writing accessible and WAI-ARIA compliant single page applications (SPAs).

Currently consists of the following components:

## AccessBar

The AccessBar is an accessibility bar that becomes visible with the command alt + / (on US keyboard) and allows users to jump between active components on the page via a dynamically populated dropdown menu.

How to use (both with and without React Router versions): 

1. Import the components you need with curly brackets as such:

```javascript
import { AccessBarWithRouter, AccessBarNoRouter, FocusWrapper, OriginalAccessBar } from 'aditum';
```

2. Add an "aria-labelledby" property to all HTML/JSX elements you want to show up in the first dropdown menu and set the value to the name you would like the user to see/hear/have read aloud. For example:

```javascript
<section id='photo-sb' aria-labelledby="Photos Sidebar">
</section>
```

### Using AccessBar with React Router

1. Add the `<AccessBarWithRouter />`component above the top most component in your main container, for example above your navbar or header.
2. To populate the second dropdown menu with other pages on your site, add a `className` property with the value `accessNavLink` to each React Router `<Link>`. For example:

  ```javascript
  <Link className='accessNavLink' to="/">
    <li>Home</li>
  </Link>
  ```

### Using AccessBar without React Router

1. Add the `<AccessBarNoRouter />`component above the top most component in your main container, for example above your navbar or header.

### OriginalAccessBar version without React Hooks

Version of AccessBarWithRouter without React Hooks. Just because.

## FocusWrapper

FocusWrapper is a higher order component that adds focus management capabilities in conjunction with React Router. It moves focus to your page content on route transition.

FocusWrapper works by wrapping a div around your specified component and imperatively shifting focus to that div.

How to use: 

1. Pass any child component into the FocusWrapper, for example:

```javascript
const focusedComponent = focusWrapper(ChildComponent)

<Route component = { focusedComponent }/>
```

**Note:** FocusWrapper only works with React-Router.

Co-authored by:
- [Nicole Abramowski](https://github.com/nabramow)
- [William Chen](https://github.com/sirchensalot)
- [Kelvin Cuesta](https://github.com/kelvinscuesta)
- [Benjamin Johnson](https://github.com/johnsben002)
# aditum

A custom React component library to support the developers in writing accessible and WAI-ARIA compliant single page applications (SPAs).

Currently consists of the following components:

## AccessBar

The AccessBar is an accessibility bar that becomes visible with the command alt + / (on US keyboard) and allows users to jump between active components on the page via a dynamically populated dropdown menu.

How to use: 

1. Add an "aria-labelledby" property to all HTML/JSX elements you want to show up in the dropdown menu and set the value to the name you would like the user to see/hear/have read aloud. For example:

`aria-labelledby="Photos Sidebar"``

2. Add the `<AccessBar />`component above the top most component in your main container, for example above your navbar or header.

## FocusWrapper

FocusWrapper is a higher order component that...

How to use:

1.

Co-authored by:
- [Nicole Abramowski](https://github.com/nabramow)
- [William Chen](https://github.com/sirchensalot)
- [Kelvin Cuesta](https://github.com/kelvinscuesta)
- [Benjamin Johnson](https://github.com/johnsben002)
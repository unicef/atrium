# Design rules and styles guides

## Theme

Use the `theme.js` file to style the Material UI components system wide. Doing this allows you to write DRY code, and to only style MUI components once. The file is divided into two `const`.

**MuiTheme**

Creates the most basic style rules: colours and typography, spacing, etc. Setting them in a separate `const` allows you to use them in the second `const` to style the actual components ([see documentation](https://material-ui.com/customization/default-theme/)).

**theme**

Contains the overriding styles of the components. You can access the `MuiTheme` objects, allowing you to reuse the style values stated in the first `const`.

```jsx
MuiSelect: {
  root: {
    fontSize: MuiTheme.typography.body1.fontSize,
    paddingRight: MuiTheme.spacing(4)
  }
}
```

This set up also allows you to use the `theme` object in your custom components (when using the `makeStyles` import from MUI).

```jsx
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  customStyle: {
    margin: theme.spacing(2, 3) // margin: 16px 24px
  }
}))
```

> Every space, width, height, size, etc. on the app should be a multiple of the base unit (8px). We strongly recommend using `theme.spacing()` in order to create a harmonious and consistent look and feel.

## Typography

### Guide

Here are the font styles used on Atrium. They follow the Material UI typographic structure to ensure full consistency accross the project with the use of the `<Typography />` component.

> If the size of a text on the design doesn't exactly match with one of the styles below, please use the closest number.

| style | font-size | font-weight | line-height | text-transform | use example |
| - | - | - | - | - | - |
| h1 | 44px | 700 | 1.25 | | Large page titles |
| h2 | 32px | 700 | 1.25 | | Smaller page titles and section titles |
| h3 | 28px | 700 | 1.25 | | Section titles |
| h4 | 24px | 600 | 1.25 | | Smaller section titles, dialog titles, etc. |
| h5 | 22px | 600 | 1.25 | | Form titles, etc. |
| h6 | 16px | 600 | 1.5 | uppercase | Sections labels (see blue texts on homepage) |
| subtitle1 | 18px | 400 | 1.5 | | Large body text (card titles, accordion titles, etc.) |
| subtitle2 | 18px | 600 | 1.5 | | Bold variant of subtitle1 |
| body1 | 16px | 400 | 1.75 |  | Default text style, for body text |
| body2 | 16px | 600 | 1.75 |  | Bold variant of body1 |
| caption | 13px | 400 | 1.75 |  | Small body text (e.g. body text on cards on the project page) |
| overline | 13px | 500 | 1.5 |  | Meta data (e.g. likes & comments on cards on the project page) |
| button | 14px | 600 | 1.25 | | Buttons and links |

### Tips and best practices

The `variant` prop on `<Typography />` doesn't mean that you necessarily have to use the same semantic element. If you want to render a different element, use the `component` prop ([see documentation](https://material-ui.com/components/typography/#changing-the-semantic-element)).

If you want to use the theme font in a custom component, use the MUI typography object with `theme.typography.fontFamily`

All the font size are based on the MUI base unit, 8px. Please follow this base unit as much as possible for every measure on the app.
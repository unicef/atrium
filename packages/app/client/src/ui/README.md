# Font styles

## Guide

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

## Tips and best practices

The `variant` prop on `<Typography />` doesn't mean that you necessarily have to use the same semantic element. If you want to render a different element, use the `component` prop ([see documentation](https://material-ui.com/components/typography/#changing-the-semantic-element)).

If you want to use the theme font in a custom component, use the MUI typography object with `theme.typography.fontFamily`

All the font size are based on the MUI base unit, 8px. Please follow this base unit as much as possible for every measure on the app.
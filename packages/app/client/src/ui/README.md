# Font styles

## Guide

Here are the font styles used on Atrium. They follow the Material UI typographic structure to ensure full consistency accross the project with the use of the `<Typography />` component.

> If the size of a text on the design doesn't exactly match with one of the styles below, please use the closest number.

| style | font-size | font-weight | line-height | text-transform |
| - | - | - | - | - |
| h1 | 44px | 700 | 1.25 | 
| h2 | 32px | 700 | 1.25 |
| h3 | 28px | 700 | 1.25 |
| h4 | 24px | 600 | 1.25 |
| h5 | 22px | 600 | 1.25 |
| h6 | 16px | 600 | 1.5 | uppercase
| subtitle1 | 18px | 400 | 1.5 |
| subtitle2 | 18px | 600 | 1.5 |
| body1 | 16px | 400 | 1.75 |
| body2 | 16px | 600 | 1.75 |
| caption | 13px | 400 | 1.75 |
| overline | 13px | 500 | 1.5 |
| button | 14px | 600 | 1.25 |

## Examples

Here are the different styles, along with examples of their different uses.

> The `variant` prop on `<Typography />` doesn't mean that you necessarily have to use the same semantic element. If you want to render a different element, use the `component` prop ([see documentation](https://material-ui.com/components/typography/#changing-the-semantic-element)).

```
<Typography variant="h1" />
```

<p style="font-family: Montserrat, Arial, sans-serif; font-size: 44px; font-weight: 700; line-height: 1.25;">Large page titles</p>

```
<Typography variant="h2" />
```

<p style="font-family: Montserrat, Arial, sans-serif; font-size: 32px; font-weight: 700; line-height: 1.25;">Smaller page titles and section titles</p>

```
<Typography variant="h3" />
```

<p style="font-family: Montserrat, Arial, sans-serif; font-size: 28px; font-weight: 700; line-height: 1.25;">Section titles</p>

```
<Typography variant="h4" />
```

<p style="font-family: Montserrat, Arial, sans-serif; font-size: 24px; font-weight: 600; line-height: 1.25;">Smaller section titles, dialog titles, etc.</p>

```
<Typography variant="h5" />
```

<p style="font-family: Montserrat, Arial, sans-serif; font-size: 22px; font-weight: 600; line-height: 1.25;">Form titles, etc.</p>

```
<Typography variant="h6" />
```

<p style="font-family: Montserrat, Arial, sans-serif; font-size: 16px; font-weight: 600; line-height: 1.5; text-transform: uppercase;">Sections labels (see blue texts on homepage)</p>

```
<Typography variant="subtitle1" />
```

<p style="font-family: Montserrat, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 1.5;">Large body text (card titles, accordion titles, etc.)</p>

```
<Typography variant="subtitle2" />
```

<p style="font-family: Montserrat, Arial, sans-serif; font-size: 18px; font-weight: 600; line-height: 1.5;">Bold variant of subtitle1</p>

```
<Typography variant="body1" />
```

<p style="font-family: Montserrat, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 1.75;">Default text style, for body text</p>

```
<Typography variant="body2" />
```

<p style="font-family: Montserrat, Arial, sans-serif; font-size: 16px; font-weight: 600; line-height: 1.75;">Bold variant of body1</p>

```
<Typography variant="caption" />
```

<p style="font-family: Montserrat, Arial, sans-serif; font-size: 13px; font-weight: 400; line-height: 1.75;">Small body text (e.g. body text on cards on the project page)</p>

```
<Typography variant="overline" />
```

<p style="font-family: Montserrat, Arial, sans-serif; font-size: 13px; font-weight: 500; line-height: 1.5;">Meta data (e.g. likes & comments on cards on the project page</p>

```
<Typography variant="button" />
```

<p style="font-family: Montserrat, Arial, sans-serif; font-size: 14px; font-weight: 600; line-height: 1.25;">Buttons and links</p>
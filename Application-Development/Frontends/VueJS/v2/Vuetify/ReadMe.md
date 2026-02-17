---
ebook:
  title: Vuetify
  pdf:
    paper-size: A4
    default-font-size: 14   
---


# Vuetify {ignore: true}

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

* [Vuetify](#vuetify)
	* [Introduction](#introduction)
	* [Design Principles](#design-principles)
		* [Layouts](#layouts)
			* [Basis Example](#basis-example)
	* [CSS Classes](#css-classes)
		* [Text-Alignment](#text-alignment)
		* [Elevation (Hervorhebung mit Schatten)](#elevation-hervorhebung-mit-schatten)
	* [Sandbox](#sandbox)
	* [Colors](#colors)
	* [Scrolling](#scrolling)
	* [Transitions](#transitions)
	* [Theme](#theme)
		* [Options / Minification / Caching / Stylus Variables](#options-minification-caching-stylus-variables)
	* [Typography](#typography)
	* [Content](#content)
	* [UI Components](#ui-components)
		* [v-alert](#v-alert)
		* [v-avatar](#v-avatar)
		* [v-badge](#v-badge)
		* [v-bottom-nav*](#v-bottom-nav)
		* [v-bottom-sheet*](#v-bottom-sheet)
		* [v-breadcrumb](#v-breadcrumb)
		* [v-btn](#v-btn)
		* [Floating Action Button*](#floating-action-button)
		* [Cards](#cards)
		* [v-carousel](#v-carousel)
		* [v-chip](#v-chip)
		* [v-data-iterator](#v-data-iterator)
		* [v-data-table*](#v-data-table)
		* [v-dialog*](#v-dialog)
		* [v-divider](#v-divider)
		* [v-expansion-panel](#v-expansion-panel)
		* [v-footer](#v-footer)
		* [v-form](#v-form)
		* [Selects* v-select & Selection controls*](#selects-v-select-selection-controls)
		* [v-text-field*](#v-text-field)
		* [v-icon](#v-icon)
		* [v-list*](#v-list)
		* [Jumbotron](#jumbotron)
		* [v-menu](#v-menu)
		* [v-navigation-drawer*](#v-navigation-drawer)
		* [v-pagination](#v-pagination)
		* [v-parallax](#v-parallax)
		* [v-date-picker, v-time-picker](#v-date-picker-v-time-picker)
		* [v-progress-circular, v-progress-linear](#v-progress-circular-v-progress-linear)
		* [v-slider](#v-slider)
		* [v-snackbar](#v-snackbar)
		* [v-stepper](#v-stepper)
		* [v-subheader*](#v-subheader)
		* [v-tabs*](#v-tabs)
		* [v-toolbar*](#v-toolbar)
		* [v-tooltip](#v-tooltip)
		* [v-resize*](#v-resize)
		* [v-ripple](#v-ripple)
		* [v-scroll](#v-scroll)
	* [Snippets](#snippets)
		* [Light or dark theme for the application](#light-or-dark-theme-for-the-application)
		* [Centering vertically](#centering-vertically)
		* [Turn off default scroll bar](#turn-off-default-scroll-bar)
		* [`activator` pitfalls](#activator-pitfalls)
	* [Appendix](#appendix)
		* [Tags](#tags)
		* [Props / Attributes](#props-attributes)
		* [Grids](#grids)
			* [Material Design Viewport Breakpoints](#material-design-viewport-breakpoints)
			* [fullscreen](#fullscreen)
			* [Visibility](#visibility)
			* [Display](#display)
		* [Spacing / Centering](#spacing-centering)

<!-- /code_chunk_output -->


## Introduction

Vuetify supports:

* SSR/SPA/PWA/..
* Standard Browser
  * Chrome, Safari 10+
  * Firefox
  * Edge
  * Pollyfill: IE11, Safari 9

==**Not supported:** IE10/9/..==

## Design Principles

Vuetify is developed exactly according to Material Design spec.

### Layouts

#### Basis Example

You can place your layout elements anywhere, as long as you apply the app property. The key component in all of this is the `v-content` element. This will be dynamically sized depending upon the structure of your designated app components. This allows you to create extremely customized solutions.

```jsx
<v-app>
  <v-navigation-drawer app></v-navigation-drawer>
  <v-toolbar app></v-toolbar>
  <v-content>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-content>
  <v-footer app></v-footer>
</v-app>
```

## CSS Classes

### Text-Alignment

```jsx
<p class="text-lg-right">Right align on large viewport</p>
<p class="text-md-center">Center align on medium viewport</p>
<p class="text-sm-left">Left align on small viewport</p>
<p class="text-xs-center">Center align on all viewport</p>
<p class="text-xs-right">Right align on all viewport</p>
```

### Elevation (Hervorhebung mit Schatten)

```jsx
elevation - {0 to 24}
```

## Sandbox

[Sandbox Layout](https://vuetifyjs.com/en/examples/layouts/sandbox)

## Colors

Background `class="red"`
Text `class="red--text"` also `text--{lighten|darken}-{n}`

* base
* lighten-1 to 5
* darken-1 to 4
* accent-1 to 4

* red
* pink
* purple
* deep
* purple
* indigo
* blue
* light-blue
* cyan
* teal
* green
* light-green
* lime
* yellow
* amber
* orange
* deep-orange
* brown
* blue-grey
* grey
* shades
  * black
  * white
  * transparent

[Color](https://github.com/vuetifyjs/vuetify/blob/master/src/stylus/settings/_colors.styl)

## Scrolling

[Scrolling: see online](https://vuetifyjs.com/en/motion/scrolling)

## Transitions

[Transitions: see online](https://vuetifyjs.com/en/motion/transitions)

## Theme

```jsx
// import colors from 'vuetify/es5/util/colors'
Vue.use(Vuetify, {
  theme: {
    primary: '#3f51b5', // or primary: colors.purple.base,
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})
```
### Options / Minification / Caching / Stylus Variables
> https://vuetifyjs.com/en/style/theme

## Typography

```jsx
display-{1 to 4}
.headline
.title
.subheading
.body-2|1
.caption
```
## Content

```jsx
blockquote 
p // paragraph 
code // source code 
var // variables 
kbd // user-input, 
```

## UI Components

### v-alert
```jsx
v-alert 
  type={success/info/warning/error} 
  v-model="alert" // v-model or value
  :value={true/false}
  dismissible
  @click="alert = true"
  icon="new_releases"
  transition="scale-transition"
  outline color="success"
```

### v-avatar
> https://vuetifyjs.com/en/components/avatars

### v-badge
> https://vuetifyjs.com/en/components/badges

### v-bottom-nav*
> https://vuetifyjs.com/en/components/bottom-navigation

### v-bottom-sheet*
> https://vuetifyjs.com/en/components/bottom-sheets

### v-breadcrumb
> https://vuetifyjs.com/en/components/breadcrumbs

### v-btn
> https://vuetifyjs.com/en/components/buttons

### Floating Action Button*
> https://vuetifyjs.com/en/components/floating-action-buttons
> ==see also FAB with speed-dial*== 

### Cards
```jsx
v-card-media 
v-card-title 
v-card-text 
v-card-actions
```
> https://vuetifyjs.com/en/components/cards

### v-carousel
> https://vuetifyjs.com/en/components/carousels

### v-chip
Chips come in 4 primary variations. Regular, with icon, with portrait and closeable.
> https://vuetifyjs.com/en/components/chips
> Closable: see also `close` option

### v-data-iterator
The v-data-iterator allows you to customize exactly how to display your data. In this example we are using a grid list with cards. We can use the content-tag prop (along with content-class and content-props) to specify what the wrapper element around the items should look like.
> https://vuetifyjs.com/en/components/data-iterator

### v-data-table*
> https://vuetifyjs.com/en/components/data-tables

### v-dialog*
> https://vuetifyjs.com/en/components/dialogs

### v-divider
> https://vuetifyjs.com/en/components/dividers

### v-expansion-panel
> https://vuetifyjs.com/en/components/expansion-panels

### v-footer
> https://vuetifyjs.com/en/components/footer

### v-form
> https://vuetifyjs.com/en/components/forms

### Selects* v-select & Selection controls*
> https://vuetifyjs.com/en/components/selects
> https://vuetifyjs.com/en/components/selection-controls

### v-text-field*
> https://vuetifyjs.com/en/components/text-fields
> see also masks

### v-icon
> https://vuetifyjs.com/en/components/icons

### v-list*
> https://vuetifyjs.com/en/components/lists
> See also: Card image with toolbar and list

### Jumbotron
> https://vuetifyjs.com/en/components/jumbotrons

### v-menu 
https://vuetifyjs.com/en/components/menus

### v-navigation-drawer*
> https://vuetifyjs.com/en/components/navigation-drawers

### v-pagination
> https://vuetifyjs.com/en/components/paginations

### v-parallax
> https://vuetifyjs.com/en/components/parallax

### v-date-picker, v-time-picker
> https://vuetifyjs.com/en/components/date-pickers
> https://vuetifyjs.com/en/components/time-pickers

### v-progress-circular, v-progress-linear
> https://vuetifyjs.com/en/components/progress

### v-slider
> https://vuetifyjs.com/en/components/sliders

### v-snackbar
> https://vuetifyjs.com/en/components/snackbars

### v-stepper
> https://vuetifyjs.com/en/components/steppers

### v-subheader*
> https://vuetifyjs.com/en/components/subheaders

### v-tabs*
> https://vuetifyjs.com/en/components/tabs 

### v-toolbar*
`v-toolbar-side-icon`, `v-toolbar-title` and `v-toolbar-items`
> https://vuetifyjs.com/en/components/toolbars
> See also: Flexible toolbar and card toolbar
> Floating with search
> Dense toolbars

### v-tooltip
> https://vuetifyjs.com/en/components/tooltips

### v-resize*
> https://vuetifyjs.com/en/directives/resizing

### v-ripple
> https://vuetifyjs.com/en/directives/ripples

### v-scroll
> https://vuetifyjs.com/en/directives/scrolling


## Snippets

### Light or dark theme for the application

```jsx
<v-app class="application application-light">.. // or dark
```

### Centering vertically

```jsx
<v-container fill-height>.. // also child components v-layout
```

### Turn off default scroll bar

```jsx
html { overflow-y: auto }
```

### `activator` pitfalls

When not using the activator slot for `v-menu` and v-dialog for example, you must manually stop the propagation of the click event. To do this, simply add the .stop modifier to the click event, `@click.stop="myMethod"`.

## Appendix
### Tags

```jsx
v - app;
v - btn;
v - card;
v - card - text;
v - container;
v - content;
v - footer;
v - form;
v - layout;
v - navigation - drawer;
v - spacer;
v - tooltip;
v - text - field;
v - toolbar;
v - toolbar - side - icon;
v - toolbar - title;
...
```

### Props / Attributes

```jsx
app; // position: fixed
absolute; // position: absolute
align - center;
justify - center;
clipped;
clipped - left;
dark;
fill - height;
fixed;
flat;
fluid;
...
```

### Grids

```jsx
v-container                 // center or with fluid full width
  v-layout                  // separating sections
    v-flex xs1 (..to xs12)  // v-flex (flex: 1 1 auto)
```

#### Material Design Viewport Breakpoints

```jsx
xs    Extra small       0 - 599px
sm    Small to Medium   600 - 959px
md    Medium            960 - 1263px
lg    Desktop           1264 - 1903px
xl    4K & Ultra-wides  > 1904px
```

#### fullscreen

```jsx
<v-dialog :fullscreen="$vuetify.breakpoint.xsOnly">
    ...
</v-dialog>
```

#### Visibility

```jsx
hidden-{xs/sm/md/lg/xl}-{only/and-down/and-up}
```

#### Display

```jsx
d-{inline-flex/flex/inline-block/block/inline}
```

### Spacing / Centering

Padding or margin:

```jsx
$spacer := 16px
 {p|m} {t|b|l|r|x|y|a} - {0|1|2|3|4|5} 
 // 1 = 0.25 * $spacer, 2 (0.5), 3(1), 4 (1.5), 5(3)
 mt-3 // margin-top: 48px
 .mx-auto // Centering Block-Elements with a certain width
```


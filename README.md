# Pokemon Dashboard

## Overview

### What is this app for?

This is a dashboard app that collates the data from a Pokemon spreadsheet.
Users can manipulate the graphs to learn about the pokemon throughout different 
generations.

### Included Features

- Crossfilter
- DC
- D3
- Bootstrap
- Keen-dashboard
- JQuery
- Queue
- Flask

## Tech Used

### Some of the tech used includes:

- Bootstrap
- Flask
- Keen-dashboard
- Crossfilter
- DC
- d3

## Testing

Testing was done using [BrowserStack](https://browserstack.com/)

Screenshots can be found in the folder marked testing. Using BrowserStack, it was
possible to test the dashboard on multiple devices and screenshots very quickly. 

It can be noted that in the Galaxy Tablet 4 test, the medium screen size cut off the edge of
pie chart. This has since been changed but I ran out of time on the free trial to test again.

### Scope

Through the development of this dashboard, the initial plan was to create a two page dashboard
which would house between 4 and 6 different graphs. This over ambitiousness pushed the limits
of my knowledge with the software, to the point that different threads found online suggested 
that what I was trying to achieve was beyond the capabilities of the technologies.

Due to the extra time that was being used to research and debug, it was becoming too much with
development being halted. By reducing the scope, a finished project has now been accomplished.

### Maintained Issues

In the current condition of this dashboard, only one main issue persists.

In the bottom section of the dashboard, in the data table, under the headings for the data it 
displays "undefined" or "NaN" depending on how I set d.value in the .group() parameter. This
was the best I could narrow down the issue, although it does not affect the running of the code.

## Contributing
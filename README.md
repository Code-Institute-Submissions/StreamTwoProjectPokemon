# Pokemon Dashboard

## Overview

### What is this app for?

This is a dashboard app that collates the data from a Pokemon spreadsheet.
Users can manipulate the graphs to learn about the pokemon throughout different 
generations.

### Included Features

- Crossfilter, D3, DC
    - These three were used to build the dynamic graphs in this app. At their core they take in the data supplied
    and are manipulated to build complex graphs and tables
- Bootstrap
    - Bootstrap wraps around the project allowing for easy positioning and layouts for the page
- Keen-dashboard
    - Keen is well used for applying css to the graphs to make them look nice without having to do it manually
- Flask
    - This is what the entire project is based around. With python code in a Flask project it's simple to be able to
    convert the csv data into readable JSON style. This data is then split and given values based on the id's and
    columns. This is done at the start of the app and the page can then be built and used in conjuntion with
    crossfilter, D3 and DC to visualise the data.

## Tech Used

### Some of the tech used includes:

- Bootstrap
- Flask
- Keen-dashboard
- Crossfilter
- DC
- D3
- Heroku for hosting

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

To combat the undefined value, I have hidden the label I found it attached to and with css set its value
to hidden and the font size to 0.

## Contributing

### Getting the project up and running

1. To make contributions to the project, first you will need to clone the repository by running
```git clone https://github.com/Zaniron/StreamTwoProjectPokemon.git```
2. Open a commandline and run ```mongod --config d:\StreamTwoProjectPokemon\data\config\mongoconfig.conf
<or where you saved the project>``` and leave that running
3. The data from the csv will need to be imported to mongoDB so you can run the server locally
    1. Import the data by running ```mongoimport -d pokemon -c pokemon_data --type csv --file pokemon_data.csv
    --headerline``` in a second commandline.
4. From here open the project in PyCharm and open the StreamTwoProjectPokemon.py
5. Change the code here, there is commented code for whether it is the hosted server or running it locally
    1. Uncomment the local code and comment out the hosted code so the project can be run and tested locally

### Hosting updated project onto Heroku

Currently this project is already hosted on Heroku at:

[Pokemon App](https://still-fjord-55118.herokuapp.com/)

To make contributions to the project live, the user must have the login details for this heroku account first.

Much like uploading to github, the process is still the same, assuming no changes were made to the data csv used
for the project.

In the commandline for the project running

```
git add .
git commit -m "commit message"
git push heroku master
```
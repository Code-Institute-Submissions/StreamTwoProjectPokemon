queue()
    .defer(d3.json, "/pokemonData/pokemon")
    .await(makeGraphs);

function makeGraphs(error, pokemonDataProjects){
    if (error){
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    //clean data
    pokemonDataProjects.forEach(function(d){
        d["Total"] = +d["Total"];
        d["HP"] = +d["HP"];
        d["Attack"] = +d["Attack"];
        d["Defense"] = +d["Defense"];
        d["Sp Attack"] = +d["Sp Attack"];
        d["Sp Defense"] = +d["Sp Defense"];
        d["Speed"] = +d["Speed"];
        d["Generation"] = +d["Generation"];
        d["id"] = +d["id"];
    })

    //create the crossfilter instance
    var ndx = crossfilter(pokemonDataProjects);

    //define dimensions
    var nameDim = ndx.dimension(function (d){
        return d["Name"];
    });
    var type1Dim = ndx.dimension(function (d){
        return d["Type 1"];
    });
    var type2Dim = ndx.dimension(function (d){
        return d["Type 2"];
    });
    var totalDim = ndx.dimension(function (d){
        return d["Total"];
    });
    var hpDim = ndx.dimension(function (d){
        return d["HP"];
    });
    var attackDim = ndx.dimension(function (d){
        return d["Attack"];
    });
    var defenseDim = ndx.dimension(function (d){
        return d["Defense"];
    });
    var spAttackDim = ndx.dimension(function (d){
        return d["Sp Attack"];
    });
    var spDefenseDim = ndx.dimension(function (d){
        return d["Sp Defense"];
    });
    var speedDim = ndx.dimension(function (d){
        return d["Speed"];
    });
    var generationDim = ndx.dimension(function (d){
        return d["Generation"];
    });
    var legendaryDim = ndx.dimension(function (d){
        return d["Legendary"];
    });
    var idDim = ndx.dimension(function (d){
        return d["id"];
    });
    var splitDim = ndx.dimension(function(d){
        return d.Attack;
    });

    //calculate the metrics
    var numProjectsByName = nameDim.group();
    var numProjectsByType1 = type1Dim.group();
    var numProjectsByType2 = type2Dim.group();
    var numProjectsByTotal = totalDim.group();
    var numProjectsByHP = hpDim.group();
    var numProjectsByAttack = attackDim.group();
    var numProjectsByDefense = defenseDim.group();
    var numProjectsBySpAttack = spAttackDim.group();
    var numProjectsBySpDefense = spDefenseDim.group();
    var numProjectsBySpeed = speedDim.group();
    var numProjectsByGeneration = generationDim.group();
    var numProjectsByLegendary = legendaryDim.group();
    var numProjectsById = idDim.group();

    var all = ndx.groupAll();

    //Charts
    var generationChart = dc.barChart("#pokemon-generation-chart");
    var pokemonPieChart = dc.pieChart("#pokemon-pie");
    var mainMenu = dc.selectMenu("#pokemenu-main");
    var selectMenu = dc.selectMenu("#pokemenu-select");
    var projectsND = dc.numberDisplay("#pokemon-data-nd");
    var comparisonChart = dc.lineChart("#team-comparison-chart");
    var splitPie = dc.pieChart("#type-split-pie");
    var teamMenu = dc.selectMenu("#teambuilder-menu");
    var teamSelectMenu = dc.selectMenu("#team-select");

    projectsND
        .formatNumber(d3.format("d"))
        .valueAccessor(function(d){
            return d;
        })
        .group(all);

    selectMenu
        .dimension(nameDim)
        .group(numProjectsByName);


    generationChart
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .width(500)
        .height(250)
        .margins({top: 60, right: 30, bottom: 30, left: 30})
        .dimension(generationDim)
        .group(numProjectsByGeneration)
        .xAxisLabel("Generation")
        .yAxisLabel("No. Of Pokemon")
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal);

    pokemonPieChart
        .width(300)
        .height(300)
        .dimension(type1Dim)
        .group(numProjectsByType1);

    splitPie
        .width(300)
        .height(300)
        .dimension(type1Dim)
        .group(numProjectsByType1);

    dc.renderAll();
}
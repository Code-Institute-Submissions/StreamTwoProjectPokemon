queue()
    .defer(d3.json, "/pokemonData/pokemon")
    .await(makeGraphs);

function makeGraphs(error, pokemonDataProjects){
    if (error){
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

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

    var minGen = generationDim.bottom(1)[0]["Generation"];
    var maxGen = generationDim.top(1)[0]["Generation"];

    //Charts
    var generationChart = dc.lineChart("#pokemon-generation-chart");
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

    generationChart
        .ordinalColors(["#C96A23"])
        .width(1200)
        .height(300)
        .margins({top: 30, right: 50, bottom: 30, left: 50})
        .dimension(generationDim)
        .group(numProjectsByGeneration)
        .renderArea(true)
        .transitionDuration(500)
        .xAxis().ticks(1)
        .elasticY(true)
        .xAxisLabel("Generation")
        .yAxis().ticks(6);

    dc.renderAll();
}
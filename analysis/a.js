//Programacao = new Mongo.Collection("bandas2");

if (Meteor.isClient) {

  Meteor.subscribe('bandas2');
    Datas = new Mongo.Collection('bandas2');
    Medias = new Mongo.Collection('media_dias');

    // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Datas.find({});
    }
  });

  Template.task.events({

    "click .toggle-checked": function () {
        var csv = []
        var ola = Medias.find({},{sort: {data: 1}}).fetch();

        var array_medias = _.pluck(ola,'media_tags');
        var keys = _.map(array_medias,function(objeto){
            return _.keys(objeto);
        })
        var tags = _.uniq(_.flatten(keys));

        _.each(ola, function(dia) {
            var zeros =_.map(this.tags,function(tag){
                return 0;
            });

            var object = _.object(tags,zeros)
            object['date'] = dia.data;

            var pares = _.pairs(dia.media_tags);
            var data = dia.data;
            _.each(pares,function(tag){
              this[tag[0]] = tag[1]*100;
            },object);


            this.csv.push(object);
        }, {'tags':tags,'csv':csv});



        var data = csv;




        var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var parseDate = d3.time.format("%d/%m/%y").parse,
            formatPercent = d3.format(".0%");

        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var color = d3.scale.category20();

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(formatPercent);

        var area = d3.svg.area()
            .x(function(d) { return x(d.date); })
            .y0(function(d) { return y(d.y0); })
            .y1(function(d) { return y(d.y0 + d.y); });

        var stack = d3.layout.stack()
            .values(function(d) { return d.values; });

        var svg = d3.select("#loucura").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

            data.forEach(function(d) {
                d.date = parseDate(d.date);
            });

            var browsers = stack(color.domain().map(function(name) {
                return {
                    name: name,
                    values: data.map(function(d) {
                        return {date: d.date, y: d[name] / 100};
                    })
                };
            }));

            x.domain(d3.extent(data, function(d) { return d.date; }));

            var browser = svg.selectAll(".browser")
                .data(browsers)
                .enter().append("g")
                .attr("class", "browser");

            browser.append("path")
                .attr("class", "area")
                .attr("d", function(d) { return area(d.values); })
                .style("fill", function(d) { return color(d.name); });

            browser.append("text")
                .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
                .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y0 + d.value.y / 2) + ")"; })
                .attr("x", -6)
                .attr("dy", ".35em")
                .text(function(d) { return d.name; });

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);









    }





  });

}


if (Meteor.isServer) {

  Meteor.startup(function () {
    var d = new MongoInternals.RemoteCollectionDriver("mongodb://andryw:4n4lytics@ds033607.mongolab.com:33607/raiox-sj");
    Datas = new Mongo.Collection('bandas2', { _driver: d });
      Medias = new Mongo.Collection('media_dias', { _driver: d });

      Meteor.publish('bandas2', function(){
      return Datas.find();
    });

  });

}

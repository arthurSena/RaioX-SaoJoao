//Programacao = new Mongo.Collection("bandas2");

if (Meteor.isClient) {

  Meteor.subscribe('bandas2');
    Datas = new Mongo.Collection('bandas2');
    Medias = new Mongo.Collection('media_dias');

    // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      //return Datas.find_one({},{sort: {data: 1}}).fetch();
        return Datas.find({data:'06/06/15'}).fetch();
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
            var csvInicial =_.map(this.tags,function(tag){
                return {"date":this.data,"count":0,"model":tag};
            },dia);


            var pares = _.pairs(dia.media_tags);
            var data = dia.data;
            _.each(pares,function(tag){
               var objetoCerto = _.findWhere(this, {model: tag[0]});
                var index = _.indexOf(this,objetoCerto);
                this[index].count = tag[1];
                var a = 1;
              //  return {"date":this.data,"price":tag[1],"symbol":tag[0]};
            },csvInicial);


            this.csv.push(csvInicial);
        }, {'tags':tags,'csv':csv});

        var data = _.flatten(csv,true);





        data.forEach(function(d){
            d.count = (+d.count) * 100;
            var spllited = d.date.split("/")
            spllited[2] = "20".concat(spllited[2])
            var newDate = new Date(spllited[2], spllited[1] - 1, spllited[0]);

            d.date = Date.parse(newDate);
        });

        var nest = d3.nest()
            .key(function(d) {return d.model;})
            .rollup(function(v) {return v.map(function(d) {return [d.date ,d.count];})})
            .entries(data)




        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = d3.scale.linear()
            .range([0, width]);

        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0],.1);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(10, "%");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")


        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.tsv("data.tsv", type, function(error, data) {

            x.domain([0, d3.max(data, function(d) { return d.frequency; })]);
            y.domain(data.map(function(d) { return d.letter; }));

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return 0; })
                .attr("width",function(d){ return x(d.frequency);})
                .attr("y", function(d) { return y(d.letter); })
                .attr("height", function(d) { return y.rangeBand(); });

        });

        function type(d) {
            d.frequency = +d.frequency;
            return d;
        }





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

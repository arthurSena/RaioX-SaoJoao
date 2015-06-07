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

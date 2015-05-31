//Programacao = new Mongo.Collection("bandas2");

if (Meteor.isClient) {

    Meteor.subscribe('bandas2');
    Programacao = new Mongo.Collection('media_dias');
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Programacao.find({});
    }
  });

    Template.task.events({

        "click .toggle-checked": function () {
            // Set the checked property to the opposite of its current value
            var datas = this.datas;
            var csv = []
            for(var i = 0; i < datas.length; i++){
                var data = datas[0];
                var tags = data.media_tags;
                for(var j = 0; j < tags.length; j++){
                    var tagName = tags[j].tag
                    var tagValue = tags[j].value
                    csv.push({"date":data,"price":tagValue,"symbol":tagName})
                }
            }

           console.log("oi");
        }


    });

}


if (Meteor.isServer) {
    Meteor.startup(function () {
        var d = new MongoInternals.RemoteCollectionDriver("mongodb://andryw:4n4lytics@ds033607.mongolab.com:33607/raiox-sj");
        Tags = new Mongo.Collection('media_dias', { _driver: d });

        Meteor.publish('bandas2', function(){
            return Tags.find();
        });

    });

}

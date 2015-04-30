var $igStore = require('../stores/MediaStore');
var Parse = require('../services/parseAdapter');

var ParseMoment = Parse.Object.extend("Moment");

// class Moment {
//   participants: [ 'mboprtr' ];
//   stores: [ $igStore ];
//   constructor(options) {
//     this.name = options.name;
//     this.startDate = options.startDate;
//     this.endDate = options.endDate;
//     this.participants = options.participants;
//     this.handle = options.handle;
//   }

//   serialize() {
//     return {
//       name: this.name,
//       startDate: this.startDate,
//       endDate: this.endDate,
//       participants: this.participants
//     };
//   }

//   retrieveMedia() {
//     this.stores.forEach((store) =>{
//       store.retrieveWithOptions(this.serialize());
//     });
//   }
// }

module.exports = ParseMoment;

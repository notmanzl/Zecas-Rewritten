const Event = require('../../structures/event');

module.exports = class extends Event {

  async run(oldMember, newMember) {
    var rolesArray = Array.from(oldMember.guild.roles.cache.map(r => r));


    function removeColor(rolesArray) {
      for (var i = 0; i < rolesArray.length; i++) {
        if (
          rolesArray[i].name.startsWith("#") &&
          rolesArray[i].members.size == 0
        ) {
          if (!rolesArray[i].name.includes("$")) {
            rolesArray[i].delete();
          }
        }
      }
    }
    setTimeout(removeColor, 2000, rolesArray);
  }

}
const Event = require('../../structures/event');

module.exports = class extends Event {

    async run(oldMember, newMember) {
        var rolesArray = oldMember.guild.roles.cache.array();

        function removeColor(rolesArray) {
          for (var i = 0; i < rolesArray.length; i++) {
            if (
              rolesArray[i].name.startsWith("#") &&
              rolesArray[i].members.array().length == 0
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
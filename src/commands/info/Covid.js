const Command = require('../../structures/command');
const { MessageEmbed } = require('discord.js');
var jsdom = require("jsdom");
var countryFlagColors = require("country-flag-colors");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
var $ = (jQuery = require("jquery")(window));

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['corona', 'coronavirus', 'covid-19'],
      category: 'Informação',
      description: 'Mostra dados e estatísticas sobre o Coronavírus',
      usage: '[país]',
      cmdoptions: [{
				name: "país",
				type: "STRING",
				description: "País sobre o qual queres obter informação",
				required: true,
			}],
    });
  }

  async run(message, args, notspam) {
    let argument = args.join(' ');
    if (args.length) {
      $.getJSON("https://disease.sh/v3/covid-19/countries/" + argument + "?yesterday=true", function (
        json
      ) {
        window.yesterdaycritical = json.critical;
      });
      $.getJSON("https://disease.sh/v3/covid-19/countries/" + argument, function (
        json
      ) {
        var flagcolorsarr = [];
        if (countryFlagColors.find(f => f.name === json.country)) {
          flagcolorsarr = (countryFlagColors.find(f => f.name === json.country).colors);
          if (flagcolorsarr[0].length === 4) {
            flagcolorsarr[0] = flagcolorsarr[0].split("").map((item) => {
              if (item == "#") { return item }
              return item + item;
            }).join("")
          }
        } else flagcolorsarr[0] = "#ffffff";
        var newcritical = json.critical - window.yesterdaycritical;
        if (Math.sign(newcritical) == 1) {
          var newcriticalsign = "+";
        }
        else if (Math.sign(newcritical) == -1) {
          var newcriticalsign = "";
        }
        else {
          var newcriticalsign = "";
        }
        var newactive = json.todayCases - (json.todayDeaths + json.todayRecovered);
        if (Math.sign(newactive) == 1) {
          var newactivesign = "+";
        }
        else if (Math.sign(newactive) == -1) {
          var newactivesign = "";
        }
        else {
          var newactivesign = "";
        }
        var countrynospaces = json.country.replace(/\s/g, '');
        const embed = new MessageEmbed()
          .setURL("https://www.worldometers.info/coronavirus/country/" + countrynospaces)
          .setColor(flagcolorsarr[0])
          .setTitle(json.country + ": COVID-19")
          .setFooter("Atualizado", json.countryInfo.flag)
          .setTimestamp(new Date(json.updated))
          .setThumbnail(json.countryInfo.flag)
          .addField("Casos Confirmados", json.cases.toString(), true)
          .addField(
            "Mortes",
            json.deaths.toString() +
            " (" +
            ((parseInt(json.deaths) / parseInt(json.cases)) * 100).toFixed(2).toString() +
            "%)",
            true
          )
          .addField(
            "Recuperados",
            json.recovered.toString() +
            " (" +
            ((parseInt(json.recovered) / parseInt(json.cases)) * 100).toFixed(
              2
            ).toString() +
            "%)",
            true
          )
          .addField(
            "Casos Hoje",
            json.todayCases.toString() +
            " (+" +
            (
              (parseInt(json.todayCases) /
                (parseInt(json.cases) - parseInt(json.todayCases))) *
              100
            ).toFixed(2).toString() +
            "%)",
            true
          )
          .addField(
            "Mortes Hoje",
            json.todayDeaths.toString() +
            " (+" +
            (
              (parseInt(json.todayDeaths) /
                (parseInt(json.deaths) - parseInt(json.todayDeaths))) *
              100
            ).toFixed(2).toString() +
            "%)",
            true
          )
          .addField(
            "Recuperados Hoje",
            json.todayRecovered.toString() +
            " (+" +
            (
              (parseInt(json.todayRecovered) /
                (parseInt(json.recovered) - parseInt(json.todayRecovered))) *
              100
            ).toFixed(2).toString() +
            "%)",
            true
          )
          .addField("Casos Ativos", json.active.toString() + " (" + newactivesign.toString() + newactive.toString() + ")", true)
          .addField("Cuidados Intensivos", json.critical.toString() + " (" + newcriticalsign.toString() + newcritical.toString() + ")", true)
          .addField("Testes (Aprox.)", json.tests.toString(), true)
          .addField(
            "Ativos p/ M de habitantes",
            json.activePerOneMillion.toString(),
            true
          )
          .addField(
            "Testes p/ M de habitantes",
            json.testsPerOneMillion.toString(),
            true
          );
          message.reply({ embeds: [embed], ephemeral: notspam });
        return;
      });
    } else {
      $.getJSON("https://disease.sh//v3/covid-19/all", function (json) {
        const embed = new MessageEmbed()
          .setAuthor("COVID-19")
          .setColor(0x03fc84)
          .setFooter("Atualizado")
          .setTimestamp(new Date(json.updated))
          .setThumbnail(
            "https://abrilsaude.files.wordpress.com/2020/02/virus.png"
          )
          .addField("Casos Confirmados", json.cases, true)
          .addField(
            "Mortes",
            json.deaths +
            " (" +
            ((parseInt(json.deaths) / parseInt(json.cases)) * 100).toFixed(2) +
            "%)",
            true
          )
          .addField(
            "Recuperados",
            json.recovered +
            " (" +
            ((parseInt(json.recovered) / parseInt(json.cases)) * 100).toFixed(
              2
            ) +
            "%)",
            true
          )
          .addField("Casos Ativos", json.active, true)
          .addField("Testes (Aprox.)", json.tests, true)
          .addField("Países Afetados", json.affectedCountries, true);

        message.reply({ embeds: [embed], ephemeral: notspam });
      });
    }
  }

}
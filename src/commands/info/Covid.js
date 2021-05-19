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
    });
  }

  async run(message, args) {
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
          .addField(
            "Casos Hoje",
            json.todayCases +
            " (+" +
            (
              (parseInt(json.todayCases) /
                (parseInt(json.cases) - parseInt(json.todayCases))) *
              100
            ).toFixed(2) +
            "%)",
            true
          )
          .addField(
            "Mortes Hoje",
            json.todayDeaths +
            " (+" +
            (
              (parseInt(json.todayDeaths) /
                (parseInt(json.deaths) - parseInt(json.todayDeaths))) *
              100
            ).toFixed(2) +
            "%)",
            true
          )
          .addField(
            "Recuperados Hoje",
            json.todayRecovered +
            " (+" +
            (
              (parseInt(json.todayRecovered) /
                (parseInt(json.recovered) - parseInt(json.todayRecovered))) *
              100
            ).toFixed(2) +
            "%)",
            true
          )
          .addField("Casos Ativos", json.active + " (" + newactivesign + newactive + ")", true)
          .addField("Cuidados Intensivos", json.critical + " (" + newcriticalsign + newcritical + ")", true)
          .addField("Testes (Aprox.)", json.tests, true)
          .addField(
            "Ativos p/ M de habitantes",
            json.activePerOneMillion,
            true
          )
          .addField(
            "Testes p/ M de habitantes",
            json.testsPerOneMillion,
            true
          );
        message.channel.send(embed).then(msg => {
          if (json.todayCases == 0) {
            msg.edit(msg.content + "\n**É provável que os dados de hoje para este país ainda não tenham sido lançados.**");
          }
          if (!message.channel.name.includes('spam')) {
            msg.edit(msg.content + "\n*(Este comando será apagado após 10segs)*").then(msg => {
              setTimeout(() => msg.delete(), 10000);
            })
            setTimeout(() => message.delete(), 10000);
          }
        });
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

        message.channel.send(embed).then(msg => {
          if (!message.channel.name.includes('spam')) {
            msg.edit(msg.content + "\n*(Este comando será apagado após 10segs)*").then(msg => {
              setTimeout(() => msg.delete(), 10000);
            })
            setTimeout(() => message.delete(), 10000);
          }
        });
      });
    }
  }

}
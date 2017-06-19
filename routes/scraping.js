/**
 * Created by Conexus Business on 15/06/2017.
 */
var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');


exports.getquery2 = function (req, res) {
    var url = 'https://news.ycombinator.com';
    var text=req.query.text;
    console.log("*************************parametro a buscar:" + text);
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var resultados = [];
            $('span.comhead').each(function (i, element) {
                var a = $(this).prev();
                var rank = a.parent().parent().text();
                var title = a.text();
                var url = a.attr('href');
                var subtext = a.parent().parent().next().children('.subtext').children();
                var points = $(subtext).eq(0).text();
                var username = $(subtext).eq(1).text();
                var comments = $(subtext).eq(5).text();
                // Our parsed meta data object
                var metadata = {
                    rank: parseInt(rank),
                    title: title,
                    url: url,
                    points: parseInt(points),
                    username: username,
                    comments: parseInt(comments)
                };
                console.log(metadata);

                if (metadata.title.indexOf(text)>0 ){
                    resultados.push(metadata);
                }
            });

            res.send(resultados);

        } else {
            res.send('Error: ' + error);
        }


    });

};


import sharp from "sharp"


import fs from 'fs'
import path from 'path'

var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

walk('./cardLibrary', (err, list) => {
    for (let file of list.filter(file => file.endsWith('.png'))) {
        let [drive, UsersDir, user, src, lib, dir, theme, cardType, rarity, cardId] = file.split('\\')
        let cardPathExceptFile = file.split('\\').slice(0, -1).join('\\')
        //if the small art doesn't already exist
        if(!fs.existsSync(`${cardPathExceptFile}\\art_small.webp`)){
            const resizedImage = sharp(file)
                .resize(256, 256)
                .toFile(`${cardPathExceptFile}\\art_small.webp`)
        }
    }
})

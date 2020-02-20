const fs = require('fs');


const write = fs.createWriteStream('./node.js');

for (let i = 1; i < 100000; i++) {
    write.write('xxxxxxxxxxxx');
}

write.close();
const fs = require('fs');
const path = require('path');

const INPUT_FOLDER = path.join(__dirname, '../src/data');
const OUTPUT_FOLDER = path.join(__dirname, './jsonl_docs');

if (!fs.existsSync(OUTPUT_FOLDER)) {
    fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });
}

fs.readdirSync(INPUT_FOLDER).forEach((filename) => {
    if (filename.endsWith('.json')) {
        const filepath = path.join(INPUT_FOLDER, filename);
        const rawData = fs.readFileSync(filepath, 'utf-8');

        let data;
        try {
            data = JSON.parse(rawData);
        } catch (err) {
            console.error(`⚠️ Skipping file ${filename}: Invalid JSON.`);
            return;
        }

        let jsonlLines = [];

        // CASE 1: Array at root
        if (Array.isArray(data)) {
            console.log(`📄 ${filename}: Array with ${data.length} items.`);
            jsonlLines = data.map(item => JSON.stringify(item));

        // CASE 2: Object with query.row (unesco_sites.json)
        } else if (data.query?.row && Array.isArray(data.query.row)) {
            console.log(`📄 ${filename}: query.row with ${data.query.row.length} items.`);
            jsonlLines = data.query.row.map(item => JSON.stringify(item));

        // CASE 3: Single object
        } else if (typeof data === 'object' && data !== null) {
            console.log(`📄 ${filename}: Single object.`);
            jsonlLines.push(JSON.stringify(data));
        } else {
            console.warn(`⚠️ Skipping ${filename}: Unknown format.`);
            return;
        }

        const outputFilename = filename.replace('.json', '.jsonl');
        const outputPath = path.join(OUTPUT_FOLDER, outputFilename);
        fs.writeFileSync(outputPath, jsonlLines.join('\n'), 'utf-8');

        console.log(`✅ Converted: ${filename} → ${outputFilename}`);
    }
});

console.log('🎉 JSONL conversion complete!');

const fs = require('fs');
const path = require('path');

const INPUT_FOLDER = path.join(__dirname, '../src/data');
const OUTPUT_FOLDER = path.join(__dirname, './txt_docs');

if (!fs.existsSync(OUTPUT_FOLDER)) {
    fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });
}

function flattenObject(obj, indent = '') {
    let result = '';
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            result += `${indent}${key}:\n`;
            result += flattenObject(obj[key], indent + '  ');
        } else if (Array.isArray(obj[key])) {
            result += `${indent}${key}:\n`;
            obj[key].forEach((item, idx) => {
                result += `${indent}  [${idx + 1}]:\n`;
                result += flattenObject(item, indent + '    ');
            });
        } else {
            result += `${indent}${key}: ${obj[key]}\n`;
        }
    }
    return result;
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

        let content = '';

        // CASE 1: Array at root
        if (Array.isArray(data)) {
            console.log(`📄 ${filename}: Array with ${data.length} items.`);
            data.forEach((item, index) => {
                content += `=== Entry ${index + 1} ===\n`;
                content += flattenObject(item);
                content += '\n\n';
            });

        // CASE 2: Object with query.row (unesco_sites.json)
        } else if (data.query?.row && Array.isArray(data.query.row)) {
            console.log(`📄 ${filename}: query.row with ${data.query.row.length} items.`);
            data.query.row.forEach((item, index) => {
                content += `=== Entry ${index + 1} ===\n`;
                content += flattenObject(item);
                content += '\n\n';
            });

        // CASE 3: Single object
        } else if (typeof data === 'object' && data !== null) {
            console.log(`📄 ${filename}: Single object.`);
            content += flattenObject(data);
        } else {
            console.warn(`⚠️ Skipping ${filename}: Unknown format.`);
            return;
        }

        const outputFilename = filename.replace('.json', '.txt');
        const outputPath = path.join(OUTPUT_FOLDER, outputFilename);
        fs.writeFileSync(outputPath, content, 'utf-8');

        console.log(`✅ Converted: ${filename} → ${outputFilename}`);
    }
});

console.log('🎉 Conversion complete!');

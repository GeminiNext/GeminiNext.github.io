import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src/data/question_bank_clean.json');

try {
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);

    json.sections.forEach(s => {
        console.log(`${s.type}: ${s.questions.length}`);
    });
} catch (e) {
    console.error(e);
}

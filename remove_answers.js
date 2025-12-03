import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src/data/question_bank_clean.json');

try {
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);

    let count = 0;

    json.sections.forEach(section => {
        section.questions.forEach(q => {
            // Regex to match ( A ), ( B ), ( AB ), ( A,B ) etc.
            const newQuestion = q.question.replace(/\(\s*[A-Z,]+\s*\)/g, '( )');
            if (newQuestion !== q.question) {
                q.question = newQuestion;
                count++;
            }
        });
    });

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
    console.log(`Successfully processed ${count} questions.`);

} catch (err) {
    console.error('Error processing file:', err);
}

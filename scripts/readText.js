import { loadDict } from '@node-rs/jieba';
import { cutForSearch } from '@node-rs/jieba';
import { appendFileSync, readFileSync, readdirSync, writeFileSync } from 'fs';

const stopwords = new Set(readFileSync('./stopwords.txt', 'utf-8').split('\n'))
stopwords.add('\n')
// loadDict(readFileSync('./stopwords.txt'))

const parseSRT = (data) => {
    const subtitlesArray = [];
    const subtitleLines = data.trim().split(new RegExp('\r?\n\r?\n'));
    subtitleLines.forEach((line) => {
        const parts = line.trim().split(new RegExp('\r?\n'));
        const lineId = parts[0];
        const time = parts[1].split(' --> ');
        const text = parts.slice(2).join(' ');
        let words = new Set(cutForSearch(text))
        const filteredWords = [...words].filter(word => !stopwords.has(word)).join('/');

        subtitlesArray.push({ lineId, startTime: time[0].replace(',', '.'), text, words: filteredWords });
    });
    return subtitlesArray;
};

function buildSql(filePath, index = 100) {
    let baseSql = `INSERT INTO fayuContent (VideoId, LineId, StartTime, Text, Words) VALUES\n`;
    let sql = baseSql;
    const subtitles = parseSRT(readFileSync(filePath, 'utf-8'))

    subtitles.forEach((item, lineIndex) => {
        const { lineId, startTime, text, words } = item;
        sql += `(${index}, ${lineId}, '${startTime}', '${text}', '${words}'),\n`;
        // 每900行或在最后一行时分割和保存SQL
        if ((lineIndex + 1) % 900 === 0 || lineIndex === subtitles.length - 1) {
            sql = sql.slice(0, -2) + ';'; // 移除最后的逗号并结束SQL语句
            // 写入分割的SQL文件
            writeSQLFile(filePath, sql, Math.ceil(lineIndex / 900));
            sql = baseSql; // 重置SQL以开始新的语句
        }
    });

    try {
        appendFileSync(`./${filePath.split('/')[1]}/titles.sql`, `INSERT INTO fayuTitle VALUES (${index}, '${filePath.split('/').pop().slice(0, -4)}', 'unknown', '第一册');\n`);
        console.log('title文件写入成功');
    } catch (err) {
        console.error('写入title文件时出错:', err);
    }
}

function writeSQLFile(filePath, sqlContent, part) {
    const fileName = `${filePath.replace('.srt', '')}_${part}.sql`;
    try {
        writeFileSync(fileName, sqlContent);
        console.log(`${fileName} 写入成功`);
    } catch (err) {
        console.error('写入文件时出错:', err);
    }
}

export function batchBuildSql(dirPath, titleIndex) {
    const res = readdirSync(dirPath)
    res.filter(x => x.endsWith('.srt')).forEach((item, index) => {
        buildSql(`${dirPath}/${item}`, index + titleIndex)
    })
}
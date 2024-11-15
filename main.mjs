import { readFile } from "fs/promises";
import { startTest } from "./endeca.mjs";
import xlsx from 'xlsx';

export async function main() {
  console.log("****** Beginning Esquire Test ******");
  
  const testQuery = await loadTestQuery();  
  if (!testQuery) {
    console.error("No test queries found.");
    return;
  }
  
  const output = [];
  let count = 0;
  for (const element of testQuery) {
    count++;
    console.log(`Running Test ${count}`)
    try {
      const d = await startTest(element);
      output.push(d);
    } catch (error) {
      console.error(`Error processing query ${element}:`, error);
    }
  }
  
  await writeTestResult(output);
}

async function loadTestQuery() {
  try {
    const data = await readFile(new URL("./endeca-query.json", import.meta.url));
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading test data:", error);
    return null;
  }
}

async function writeTestResult(result) {
  const wb = xlsx.utils.book_new();
  const headers = ['Query', 'Endeca Count', 'Elastic Count'];
  const data = [
    headers,
    ...result.map(item => [item.query, item.endecaCount, item.elasicCount])
  ];
  const ws = xlsx.utils.aoa_to_sheet(data);
  xlsx.utils.book_append_sheet(wb, ws, 'Query Data');
  xlsx.writeFile(wb, 'test-result.xlsx');
}

// main();

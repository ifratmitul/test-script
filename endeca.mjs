import fetch from 'node-fetch';
import { translateToElastic } from './translate-to-elastic.mjs';
import {elastipod} from './elastic.mjs'


export async function startTest(testQuery) {
  const url = `https://dev-research.ibfd.org/endecapod/my?${testQuery}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json(); 
    const translatedElastiCQuery = await translateToElastic(testQuery);
    const elastiDocCount = await elastipod(translatedElastiCQuery)
    const res = { query: testQuery, endecaCount: data['results']['numAggrBins'], elasicCount: elastiDocCount }
    console.log(`Query : ${res.query} **Endeca Count: ${res.elasicCount} **Elasti Count : ${res.elasicCount}`)
    return res;
  } catch (error) {
    console.error('Error:', error);
  }
}
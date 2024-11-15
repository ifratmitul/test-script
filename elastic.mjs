import fetch from 'node-fetch';
import { readFile } from 'fs/promises';

async function loadConfig() {
    try {
      const data = await readFile(new URL('./elastic-config.json', import.meta.url));
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading config:', error);
      return null;
    }
  }

export async function elastipod(query) {
  const esquireUrl = `https://dev-research.ibfd.org/elastipod/my/ibfd_data-live/_search`;
  let config = await loadConfig();
  
  if (!config) {
    console.error('Config could not be loaded. Exiting function.');
    return null;
  }

  for (const key in query) {
    config[key] = query[key];
  }


  try {
    const response = await fetch(esquireUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Received response from Elastic");
      return getDocumentCount(result)
    } else {
      console.error("Failed to fetch from Elastic:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error in Elastic:", error);
    return null;
  }

}


function getDocumentCount (data) {
  const t = data['aggregations']['Category']['buckets']
  return t.reduce((sum, item) => {
    return sum + item['uniq_results'].value
  }, 0);
  ;
}
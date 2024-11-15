import fetch from 'node-fetch';

export async function translateToElastic(query) {
  const esquireUrl = `https://dev-research.ibfd.org/esquire/translate?${query}`; 

  try {
    const response = await fetch(esquireUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Received response from Esquire:");
      return result;
    } else {
      console.error("Failed to fetch from Esquire:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error in Esquire request:", error);
    return null;
  }
}

export const getTodaysMatches = async () => {
    const url = 'https://football_api12.p.rapidapi.com/players/fixtures';
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '82387cf1damsh116d052c22df5efp141526jsn6bf172d5abe0',
          'x-rapidapi-host': 'football_api12.p.rapidapi.com'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const json = await response.json();
      // console.log(JSON.stringify(json));
      return json;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
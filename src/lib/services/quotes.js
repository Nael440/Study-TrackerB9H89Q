export async function fetchRandomQuote() {
    try {
      const url = 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
          'x-rapidapi-host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com'
        }
      };
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`Failed to fetch quote: ${res.status}`);
      const data = await res.json();
      if (!data.text) throw new Error('No quote returned');
      return `"${data.text}" — ${data.author || 'Unknown'}`;
    } catch (error) {
      console.error('Error fetching quote:', error);
      return "Unable to fetch quote. Please try again later.";
    }
  }
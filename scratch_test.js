const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc1OTM1NzIwLCJpYXQiOjE3NzU5MzIxMjAsImp0aSI6IjE5Yzc2MzdjZDRhZTRjOGQ5MmFhMWI0ZDk3YmJlZDdmIiwidXNlcl9pZCI6IjMifQ.8sPus08flEpeuUBULSVtS3K4kLrMK6X8IrNQIPbp3hE';

async function testApi() {
  const res = await fetch('https://musicapp-production-bcd8.up.railway.app/api/liked/', {
    method: 'OPTIONS',
    headers: { Authorization: `Bearer ${TOKEN}` }
  });
  console.log('OPTIONS status:', res.status);
  console.log('Allow header:', res.headers.get('allow'));

  // Get liked songs
  const resGet = await fetch('https://musicapp-production-bcd8.up.railway.app/api/liked/', {
    headers: { Authorization: `Bearer ${TOKEN}` }
  });
  const data = await resGet.json();
  const trackIdMap = Array.isArray(data) ? data : data.results || [];
  if (trackIdMap.length > 0) {
    console.log('Found a liked song:', trackIdMap[0]);
    // Try unlike
    const trackId = trackIdMap[0].track || trackIdMap[0].id;
    console.log('Trying DELETE with ID', trackId);
    
    // Attempt 1: DELETE /liked/{id}/
    let d = await fetch(`https://musicapp-production-bcd8.up.railway.app/api/liked/${trackId}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${TOKEN}` }
    });
    console.log('DELETE /liked/id/ ->', d.status);
    
    // Attempt 2: DELETE /liked/ body: { track_id }
    let d2 = await fetch(`https://musicapp-production-bcd8.up.railway.app/api/liked/`, {
      method: 'DELETE',
      headers: { 
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ track_id: trackId })
    });
    console.log('DELETE /liked/ body ->', d2.status);
  } else {
    // Add a song
    console.log('No liked songs. Adding song ID 1');
    let add = await fetch(`https://musicapp-production-bcd8.up.railway.app/api/liked/`, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ track_id: 1 })
    });
    console.log('POST add ->', add.status);
  }
}

testApi();

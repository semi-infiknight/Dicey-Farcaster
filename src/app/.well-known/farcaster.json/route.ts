export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL || "https://dicecast.sendarcade.fun";

  const config = {
    "accountAssociation": {
    "header": "eyJmaWQiOjEwODI0NjksInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhjRTgxMTM3MTg0NTFBZkM0YUVDQThjNTZmNjM0QzI1OThDODY1MzREIn0",
    "payload": "eyJkb21haW4iOiJkaWNlY2FzdC5zZW5kYXJjYWRlLmZ1biJ9",
    "signature": "MHhiMTIwMjI2NjhjMzYzOGZiZWE0M2UyNmFmOTEyMTNhOTQ3OGJkMGUxNDcwNjMzZTdkNDFjMjM1NDkzNjQ0YmJjMWYyNGI5YTFjNGIwYzk3Njk4ZGVmNDRkYTE5MTI2ZWNlMjg1YzUwNmE5MGJkMGZmZGVlYWU5ZDQzNjY2ZjU4OTFi"
  },
    frame: {
      version: "1",
      name: "Snakes and Ladders",
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/og.jpg`,
      buttonTitle: "Start Battle",
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}

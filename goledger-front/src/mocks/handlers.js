import { http, HttpResponse } from "msw";

// Mock data para os artistas
const mockArtists = [
  { id: "1", name: "Artist 1", country: "Country 1" },
  { id: "2", name: "Artist 2", country: "Country 2" },
];

// Handlers para as rotas
export const handlers = [
  // Handler para obter os artistas
  http.post("http://localhost:3030/query/search", async (req) => {
    const body = await req.json();
    if (body.query.selector['@assetType'] === 'artist') {
      return HttpResponse.json(mockArtists, { status: 200 });
    }
    return HttpResponse.json({ error: "No artists found" }, { status: 404 });
  }),

  // Handler para criar um artista
  http.post("http://localhost:3030/invoke/createAsset", async (req) => {
    const body = await req.json();
    const newArtist = body.asset[0];
    mockArtists.push({
      id: String(mockArtists.length + 1),
      ...newArtist,
    });
    return HttpResponse.json(newArtist, { status: 201 });
  }),

  // Handler para atualizar um artista
  http.put("http://localhost:3030/invoke/updateAsset", async (req) => {
    const body = await req.json();
    const { '@key': key, ...updateData } = body.update;

    const artistIndex = mockArtists.findIndex((artist) => artist.id === key);
    if (artistIndex > -1) {
      mockArtists[artistIndex] = { ...mockArtists[artistIndex], ...updateData };
      return HttpResponse.json(mockArtists[artistIndex], { status: 200 });
    }

    return HttpResponse.json({ error: "Artist not found" }, { status: 404 });
  }),

  // Handler para excluir um artista
  http.delete("http://localhost:3030/invoke/deleteAsset", async (req) => {
    const body = await req.json();
    const { '@key': key } = body.key;

    const artistIndex = mockArtists.findIndex((artist) => artist.id === key);
    if (artistIndex > -1) {
      mockArtists.splice(artistIndex, 1);
      return HttpResponse.json({ message: "Artist deleted successfully" }, { status: 200 });
    }

    return HttpResponse.json({ error: "Artist not found" }, { status: 404 });
  }),
];

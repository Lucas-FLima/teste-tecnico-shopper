import axios, { AxiosResponse } from "axios";

class GoogleRoutesService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_API_KEY || "";
  }

  async getRoute(origin: string, destination: string) {
    const url = `https://routes.googleapis.com/directions/v2:computeRoutes`;
    try {
      const response: AxiosResponse = await axios.post(
        url,
        {
          origin: {
            address: origin,
          },
          destination: {
            address: destination,
          },
          routing_preference: "TRAFFIC_AWARE",
          travelMode: "DRIVE",
          languageCode: "en-US",
          computeAlternativeRoutes: false,
          units: "IMPERIAL",
        },
        {
          headers: {
            "X-Goog-Api-Key": this.apiKey,
            "Content-Type": "application/json",
            "X-Goog-FieldMask":
              "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.legs.startLocation,routes.legs.endLocation,routes.legs.distanceMeters,routes.legs.duration",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(`Erro ao buscar rota no Google Maps. \nErro: ${error}`);
    }
  }
}

export default GoogleRoutesService;

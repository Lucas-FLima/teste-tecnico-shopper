export interface TravelFormInputs {
  idUser: string;
  origin: string;
  destination: string;
}

export type DriverOptions = {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
      rating: string;
      comment: string;
    };
    value: number;
  };

export type TravelResponse = {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: string;
  options: Array<DriverOptions> | null;
  routeResponse: {
    routes: {
      legs: {
        distanceMeters: number;
        duration: string;
        startLocation: {
          latLng: {
            latitude: number;
            longitude: number;
          };
        };
        endLocation: {
          latLng: {
            latitude: number;
            longitude: number;
          };
        };
      }[];
      polyline: {
        encodedPolyline: string;
      };
    }[];
  };
};

export type FormattedData = {
  formattedData: TravelResponse;
};

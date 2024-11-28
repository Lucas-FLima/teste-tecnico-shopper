export interface TravelFormInputs {
  idUser: string;
  origin: string;
  destination: string;
}

export interface DriverOptions {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: string;
    comment: string;
  };
  value: number;
}

export interface TravelResponse {
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
}

export interface Ride {
  id: number;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

export interface RideResponse {
  customer_id: string;
  rides: Ride[];
}

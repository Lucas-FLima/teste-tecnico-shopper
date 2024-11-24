export interface IDriverResponse {
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

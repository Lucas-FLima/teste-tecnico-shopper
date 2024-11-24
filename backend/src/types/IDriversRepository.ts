export interface IDriversRepository {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rating: string;
  comment: string;
  rating_km: number;
  min_km: number;
}

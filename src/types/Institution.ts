import { Cabinet } from "./Cabinet";

export type Institution = {
  id: string;
  name: string;
  cabinets: Cabinet[];
};

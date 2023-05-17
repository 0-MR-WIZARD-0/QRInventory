import { Cabinet } from "./Cabinet";

export type Institution = {
  id: string;
  name: string;
  cabinets: Cabinet[];
};

export type InstitutionShort = {
  id: string;
  name: string;
};

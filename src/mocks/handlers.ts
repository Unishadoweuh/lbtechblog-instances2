import { http, HttpResponse } from "msw";
import virtualMachines from "../fixtures/virtual-machines.json";

export const handlers = [
  http.get("/api/virtual-machines", () => {
    return HttpResponse.json(virtualMachines);
  }),
];

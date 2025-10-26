import api from "./axios";

export function createShort(url: string) {
  return api.post("/short", { url }).then((res) => res.data);
}

export interface Config {
  Livemap: {
    Port: number,
    MongoDB: string,
    PageURL: string,
    Map: {
      Silage: string,
      Grain: string
    }
  }
}
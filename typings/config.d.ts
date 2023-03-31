export interface Config {
  Livemap: {
    Port: number,
    Map: {
      Silage: string,
      Grain: string
    }
  },
  FSServer: {
    Silage: {
      PanelURL: string,
      APICode: string
    },
    Grain: {
      PanelURL: string,
      APICode: string
    },
  }
}

/*export interface Config {
  Livemap: {
    Port: number,
    Map: string
  },
  FSServer: {
    PanelURL: string,
    APICode: string
  }
}*/
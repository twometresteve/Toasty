export interface Server {
  name:string
  version:string
}
export interface Slots {
  numUsed:number
  capacity:number
}
export interface Player {
  isUsed:boolean
  isAdmin:boolean
  uptime:number
  x:number
  y:number
}
export interface Vehicle {
  name:string
  x:number
  y:number
  type:string
  category:string
  controller:string
}
export interface Game {
  settings: {
    savegameName:XMLTypings
    creationDate:XMLTypings
    mapId:XMLTypings
    mapName:XMLTypings
    saveDate:XMLTypings
    resetVehicles:XMLTypings
    trafficEnabled:XMLTypings
    stopAndGoBraking:XMLTypings
    trailerFillLimit:XMLTypings
    automaticMotorStartEnabled:XMLTypings
    growthMode:XMLTypings
    fixedSeasonalVisuals:XMLTypings
    plannedDaysPerPeriod:XMLTypings
    fruitDestruction:XMLTypings
    plowingRequiredEnabled:XMLTypings
    stonesEnabled:XMLTypings
    weedsEnabled:XMLTypings
    limeRequired:XMLTypings
    isSnowEnabled:XMLTypings
    fuelUsage:XMLTypings
    helperBuyFuel:XMLTypings
    helperBuySeeds:XMLTypings
    helperBuyFertilizer:XMLTypings
    helperSlurrySource:XMLTypings
    helperManureSource:XMLTypings
    difficulty:XMLTypings
    economicDifficulty:XMLTypings
    dirtInterval:XMLTypings
    timeScale:XMLTypings
    autoSaveInterval:XMLTypings
  }
  statistics: {
    money:XMLTypings
    playTime:XMLTypings
  }
  slotSystem: {
    _attributes:{
      slotUsage:string
    }
  }
}

interface XMLTypings {
  _text:number|string|boolean
  _attributes:{
    [key:string]:number|string|boolean
  }
}
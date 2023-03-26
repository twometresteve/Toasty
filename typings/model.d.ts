export interface ServerTyping {
  name:string
  version:string
}
export interface SlotsTyping {
  numUsed:number
  capacity:number
}
export interface PlayerProperty {
  [x: string]: any
  _text:string
  _attributes: {
    isUsed:boolean
    isAdmin:boolean
    uptime:number
    x:number
    z:number
  }
}
export interface VehicleProperty {
  _attributes: {
    name:string
    x:number
    z:number
    type:string
    category:string
    controller:string
  }
}
export interface GameTyping {
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
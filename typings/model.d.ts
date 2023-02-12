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
    savegameName:string
    creationDate:string
    mapId:string
    mapName:string
    saveDate:string
    resetVehicles:boolean
    trafficEnabled:boolean
    stopAndGoBraking:boolean
    trailerFillLimit:boolean
    automaticMotorStartEnabled:boolean
    growthMode:number
    fixedSeasonalVisuals:number
    plannedDaysPerPeriod:number
    fruitDestruction:boolean
    plowingRequiredEnabled:boolean
    stonesEnabled:boolean
    weedsEnabled:boolean
    limeRequired:boolean
    isSnowEnabled:boolean
    fuelUsage:number
    helperBuyFuel:boolean
    helperBuySeeds:boolean
    helperBuyFertilizer:boolean
    helperSlurrySource:number
    helperManureSource:number
    difficulty:number
    economicDifficulty:number
    dirtInterval:number
    timeScale:number
    autoSaveInterval:number
  }
  statistics: {
    money:number
    playTime:number
  }
  slotSystem: {
    slotUsage:string
  }
}
export interface ServerTyping {
  name:string
  version:string
}
export interface SlotsTyping {
  used:number
  capacity:number
}
export interface GameTyping {
  careerSavegame: {
    settings: {
      savegameName:XMLTypings
      creationDate:XMLTypings
      mapId:XMLTypings
      mapTitle:XMLTypings
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
}

interface XMLTypings {
  _text:number|string|boolean
  _attributes:{
    [key:string]:number|string|boolean
  }
}
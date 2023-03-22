import utility from '../libraries/utility';
import {Game} from '../../typings/model';

export default function Game(game){
  var timeScale = game?.settings.timeScale._text == undefined ? 0 : Number(game.settings.timeScale._text)

  this.money = game?.statistics.money._text == undefined ? '0 $' : utility.formatNumber(game?.statistics.money._text as number, 0, ' $')
  this.mapname = game?.settings.mapName._text == undefined ? 'No map selected' : game.settings.mapName._text
  this.timeScale = utility.formatNumber(timeScale, 0, 'x')
  this.saveInterval = game?.settings.autoSaveInterval._text == undefined ? '? mins' : utility.formatNumber(game.settings.autoSaveInterval._text as number, 0, ' mins')
  this.economicDifficulty = game?.settings.economicDifficulty._text == undefined ? 1 : game.settings.economicDifficulty._text
  this.growthMode = game?.settings.growthMode._text == undefined ? 3 : game.settings.growthMode._text
  this.fuelUsage = game?.settings.fuelUsage._text == undefined ? 3 : game.settings.fuelUsage._text
  this.dirtInterval = game?.settings.dirtInterval._text == undefined ? 3 : game.settings.dirtInterval._text
  this.savegameName = game?.settings.savegameName._text == undefined ? 'No save' : game.settings.savegameName._text
  this.helperBuyFuel = (game?.settings.helperBuyFuel._text as boolean) == undefined ? true : (game.settings.helperBuyFuel._text as boolean)
  this.helperBuySeeds = (game?.settings.helperBuySeeds._text as boolean) == undefined ? true : (game.settings.helperBuySeeds._text as boolean)
  this.helperBuyFertilizer = (game?.settings.helperBuyFertilizer._text as boolean) == undefined ? true : (game.settings.helperBuyFertilizer._text as boolean)
  this.helperSlurrySource = game?.settings.helperSlurrySource._text == undefined ? 2 : utility.formatNumber(game.settings.helperSlurrySource._text as number, 0, '')
  this.helperManureSource = game?.settings.helperManureSource._text == undefined ? 2 : utility.formatNumber(game.settings.helperManureSource._text as number, 0, '')
  this.slotUsage = game?.slotSystem._attributes.slotUsage == undefined ? 0 : Number(game?.slotSystem._attributes.slotUsage).toLocaleString('en-US')
  this.creationDate = game?.settings.creationDate._text == undefined ? '31/12/1969' : (game.settings.creationDate._text as string).split('-').reverse().join('/')
  this.fruitDestruction = game?.settings.fruitDestruction._text == undefined ? true : game.settings.fruitDestruction._text
  this.plowingRequiredEnabled = game?.settings.plowingRequiredEnabled._text == undefined ? true : game.settings.plowingRequiredEnabled._text
  this.automaticMotorStartEnabled = game?.settings.automaticMotorStartEnabled._text == undefined ? true : game.settings.automaticMotorStartEnabled._text
}
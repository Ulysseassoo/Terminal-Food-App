import { Ingredient } from "../Models/Ingredient"
import { IProcessor } from "typeorm-fixtures-cli"

export default class IngredientProcessor implements IProcessor<Ingredient> {
	postProcess(name: string, object: { [key: string]: any }): void {}
}

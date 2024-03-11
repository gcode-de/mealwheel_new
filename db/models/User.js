const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeInteractionSchema = new Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  },
  isFavorite: Boolean,
  hasCooked: Boolean,
  rating: Number,
  notes: String,
});

const calendarEntrySchema = new Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  },
  date: String,
  numberOfPeople: Number,
  isDisabled: Boolean,
});
const shoppingItem = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String },
});

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  settings: {
    weekdaysEnabled: {},
    mealsPerDay: Number,
    defaultNumberOfPeople: Number,
    defaultDiet: [String],
    numberOfRandomMeals: Number,
  },
  recipeInteractions: [recipeInteractionSchema],
  calendar: [calendarEntrySchema],
  shoppingList: [shoppingItem],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;

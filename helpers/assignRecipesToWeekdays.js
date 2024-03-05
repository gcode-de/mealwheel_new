export default function assignRecipesToWeekdays(
  setWeekdays,
  userRecipes,
  randomRecipes,
  numberOfRandomRecipes,
  weekdays,
  user
) {
  // Mischen der userRecipes und randomRecipes, um eine zufällige Verteilung zu gewährleisten
  const mixedRandomRecipes = [...randomRecipes].sort(() => 0.5 - Math.random());
  const mixedUserRecipes = [...userRecipes].sort(() => 0.5 - Math.random());

  // Berechnen, wie viele Rezepte von jedem Typ verwendet werden sollen
  const totalRecipesNeeded = 7; // Da wir 7 Tage in der Woche haben
  let randomRecipesToUse = numberOfRandomRecipes;
  let userRecipesToUse = totalRecipesNeeded - randomRecipesToUse;

  // Anpassen, falls nicht genug userRecipes vorhanden sind
  if (userRecipesToUse > userRecipes.length) {
    userRecipesToUse = userRecipes.length;
    randomRecipesToUse = totalRecipesNeeded - userRecipesToUse;
  }

  // Rezepte auswählen
  const selectedRandomRecipes = mixedRandomRecipes.slice(0, randomRecipesToUse);
  const selectedUserRecipes = mixedUserRecipes.slice(0, userRecipesToUse);

  // Kombinieren der ausgewählten Rezepte
  const combinedRecipes = [...selectedUserRecipes, ...selectedRandomRecipes];

  // Mischen der kombinierten Rezepte, um eine zufällige Verteilung auf die Wochentage zu gewährleisten
  const shuffledRecipes = combinedRecipes.sort(() => 0.5 - Math.random());

  // Zuweisen der Rezepte zu den Wochentagen
  // setWeekdays((currentWeekdays) =>
  //   currentWeekdays.map((day, index) => ({
  //     ...day,
  //     recipe: shuffledRecipes[index] || null, // Null, falls nicht genügend Rezepte vorhanden sind
  //   }))
  // );

  weekdays.map((weekday, index) => {
    if (!user.calendar) {
      user.calendar = [];
    }
    if (
      user.calendar.find((calendarDay) => calendarDay.date === weekday.date)
    ) {
      if (
        user.calendar.find((calendarDay) => calendarDay.date === weekday.date)
          .recipe
      ) {
        return;
      }
      user.calendar.map((calendarDay) =>
        calendarDay.date === weekday.date
          ? { ...calendarDay, recipe: shuffledRecipes[index] }
          : calendarDay
      );
    } else {
      user.calendar.push({
        date: new Date(weekday.date),
        recipe: shuffledRecipes[index],
        isDisabled: false,
        servings: user.settings.defaultNumberOfPeople,
      });
    }
  });

  setWeekdays((currentWeekdays) =>
    currentWeekdays.map((day, index) => ({
      ...day,
      recipe: user.calendar.find((calendarDay) => calendarDay.date === day.date)
        .recipe,
    }))
  );
}

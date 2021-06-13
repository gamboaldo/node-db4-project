const db = require("../../data/db-config");

// SQL Query
// select *
// from recipes as r
// join steps as s
//     on s.recipe_id = r.recipe_id
// left join steps_ingredients as si
//     on s.step_id = si.step_id
// left join ingredients as i
//     on si.ingredient_id = i.ingredient_id
// where r.recipe_id = 1;

// Shape of database return
// [
//   {
//       "created_at": "2021-01-01 08:23:19.120",
//       "ingredient_id": null,
//       "ingredient_name": null,
//       "quantity": null,
//       "recipe_id": 1,
//       "recipe_name": "Spaghetti",
//       "step_id": 1,
//       "step_instruction": "Boil up water",
//       "step_number": 1
//   },
//   {
//       "created_at": "2021-01-01 08:23:19.120",
//       "ingredient_id": 1,
//       "ingredient_name": "Pasta",
//       "quantity": 1,
//       "recipe_id": 1,
//       "recipe_name": "Spaghetti",
//       "step_id": 2,
//       "step_instruction": "Insert pasta into water",
//       "step_number": 2
//   },
//   {
//       "created_at": "2021-01-01 08:23:19.120",
//       "ingredient_id": 3,
//       "ingredient_name": "Sauce",
//       "quantity": 2.5,
//       "recipe_id": 1,
//       "recipe_name": "Spaghetti",
//       "step_id": 3,
//       "step_instruction": "Mix pasta with sauce",
//       "step_number": 3
//   }
// ]

const getIngredients = (data) => {
  return data.reduce((acc, val) => {
    if (val.ingredient_id) {
      return acc.concat(
        (({ step_number, ingredient_id, ingredient_name, quantity }) => {
          return { step_number, ingredient_id, ingredient_name, quantity };
        })(val)
      );
    }
    return acc;
  }, []);
};

const removeDuplicates = (data) => {
  return data.reduce((acc, val) => {
    const found = acc.find((elem) => elem.step_number === val.step_number);
    if (!found) {
      return acc.concat([val]);
    } else {
      return acc;
    }
  }, []);
};

// Filtered Steps
// [
//   {
//       "step_id": 4,
//       "step_instruction": "Marinate beef overnight",
//       "step_number": 1
//   },
//   {
//       "step_id": 5,
//       "step_instruction": "Smoke beef at 200F",
//       "step_number": 2
//   }
// ]

// Ingredients
// [
//   {
//       "ingredient_id": 3,
//       "ingredient_name": "Sauce",
//       "quantity": 0.5,
//       "step_number": 1
//   },
//   {
//       "ingredient_id": 4,
//       "ingredient_name": "Seasoning",
//       "quantity": 3,
//       "step_number": 1
//   },
//   {
//       "ingredient_id": 2,
//       "ingredient_name": "Beef",
//       "quantity": 10,
//       "step_number": 1
//   },
//   {
//       "ingredient_id": 2,
//       "ingredient_name": "Beef",
//       "quantity": 10,
//       "step_number": 2
//   }
// ]

const addIngredients = (filteredSteps, data) => {
  const ingredients = getIngredients(data);
  for (let i = 0; i < filteredSteps.length; i++) {
    filteredSteps[i].ingredients = ingredients.reduce((acc, ing) => {
      if (ing.step_number === filteredSteps[i].step_number) {
        return acc.concat(
          (({ ingredient_id, ingredient_name, quantity }) => {
            return { ingredient_id, ingredient_name, quantity };
          })(ing)
        );
      } else {
        return acc;
      }
    }, []);
  }
  return filteredSteps;
};

const getSteps = (data) => {
  const steps = data.reduce((acc, val) => {
    if (val.step_id) {
      return acc.concat(
        (({ step_id, step_number, step_instruction }) => {
          return { step_id, step_number, step_instruction };
        })(val)
      );
    }
    return acc;
  }, []);
  const filteredSteps = removeDuplicates(steps);

  return filteredSteps;
};

const getById = async (recipe_id) => {
  const recipeData = await db("recipes as r")
    .column(
      "r.recipe_id",
      "r.recipe_name",
      "r.created_at",
      "s.step_id",
      "s.step_instruction",
      "s.step_number",
      "si.quantity",
      "i.ingredient_id",
      "i.ingredient_name",
      "si.quantity"
    )
    .join("steps as s", "r.recipe_id", "s.recipe_id")
    .leftJoin("steps_ingredients as si", "s.step_id", "si.step_id")
    .leftJoin("ingredients as i", "si.ingredient_id", "i.ingredient_id")
    .where("r.recipe_id", recipe_id);

  const steps = getSteps(recipeData);

  const stepsWithIngredients = addIngredients(steps, recipeData);

  const returnRecipe = {
    recipe_id: recipeData[0].recipe_id,
    recipe_name: recipeData[0].recipe_name,
    created_at: recipeData[0].created_at,
    steps: stepsWithIngredients,
  };

  return returnRecipe;
};

module.exports = { getById };

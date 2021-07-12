exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("steps")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("steps").insert([
        { step_instruction: "Boil up water", step_number: 1, recipe_id: 1 },
        {
          step_instruction: "Insert pasta into water",
          step_number: 2,
          recipe_id: 1,
        },
        {
          step_instruction: "Mix pasta with sauce",
          step_number: 3,
          recipe_id: 1,
        },
        {
          step_instruction: "Marinate beef overnight",
          step_number: 1,
          recipe_id: 2,
        },
        {
          step_instruction: "Smoke beef at 200F",
          step_number: 2,
          recipe_id: 2,
        },
      ]);
    });
};

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("steps_ingredients")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("steps_ingredients").insert([
        { quantity: 1.0, step_id: 2, ingredient_id: 1 },
        { quantity: 10.0, step_id: 4, ingredient_id: 2 },
        { quantity: 2.5, step_id: 3, ingredient_id: 3 },
        { quantity: 0.5, step_id: 4, ingredient_id: 3 },
        { quantity: 3.0, step_id: 4, ingredient_id: 4 },
        { quantity: 10.0, step_id: 5, ingredient_id: 2 },
      ]);
    });
};

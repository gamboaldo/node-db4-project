exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("ingredients")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("ingredients").insert([
        { ingredient_name: "Pasta" },
        { ingredient_name: "Beef" },
        { ingredient_name: "Sauce" },
        { ingredient_name: "Seasoning" },
      ]);
    });
};

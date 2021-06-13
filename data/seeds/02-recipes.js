exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("recipes")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("recipes").insert([
        { recipe_name: "Spaghetti", created_at: "2021-01-01 08:23:19.120" },
        { recipe_name: "Beef", created_at: "2021-01-31 08:23:19.120" },
      ]);
    });
};

exports.up = function (knex) {
  return knex.schema
    .createTable("recipes", (tbl) => {
      tbl.increments("recipe_id");
      tbl.string("recipe_name", 128).notNullable().unique();
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("ingredients", (tbl) => {
      tbl.increments("ingredient_id");
      tbl.string("ingredient_name").notNullable().unique();
    })
    .createTable("steps", (tbl) => {
      tbl.increments("step_id");
      tbl.integer("step_number").notNullable;
      tbl.string("step_instructions").notNullable();
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipe_id")
        .inTable("recipes")
        .onDelete("CASCADE");
    })
    .createTable("step_ingredients", (tbl) => {
      tbl.increments("step_ingredient_id");
      tbl.string("quantity");
      tbl
        .integer("step_id")
        .unsigned()
        .notNullable()
        .references("step_id")
        .inTable("steps")
        .onDelete("CASCADE");
      tbl
        .integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("ingredient_id")
        .inTable("ingredients")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("step_ingredients")
    .dropTableIfExists("steps")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("recipes");
};

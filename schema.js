const fetch = require("node-fetch");
const {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require("graphql");

fetch("http://www.recipepuppy.com/api/")
  .then(response => response.json())
  .then(body => {
    body;
    console.log(body.title);
  });

const RecipeType = new GraphQLObjectType({
  name: "Recipe",
  description: "...",

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: body => body.title
    }
  })
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "...",

    fields: () => ({
      recipe: {
        type: RecipeType,
        args: {
          title: { type: GraphQLString }
        },
        resolve: (root, args) =>
          fetch(
            `http://www.recipepuppy.com/api/?i=${args.title}`
          ).then(response => response.json())
      }
    })
  })
});

// http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3

import {
 GraphQLSchema,
 GraphQLObjectType,
 GraphQLList,
 GraphQLString
} from 'graphql'






const PersonType = new GraphQLObjectType({
    name : 'person',
    description: " this is person type ",
    fields : ()=>({
        id: {
            type : GraphQLString
        },
        firstName: {
            type : GraphQLString
        },
        lastName: {
            type : GraphQLString
        },
        friends : {
            type: new GraphQLList(PersonType),
            resolve : (root,args,{loaders}) => loaders.person.loadMany(root.friends)
        }
    })
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description:'this is the main query',
    fields : () => ({
      person : {
       type: PersonType,
       args : {
           id:{type :GraphQLString}
       },
       resolve : (root,args,{loaders}) => loaders.person.load(`/users/${args.id}`)
      }
    })
})


export default new GraphQLSchema({
    query : QueryType,
})
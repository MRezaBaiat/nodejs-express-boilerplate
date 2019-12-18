const{buildSchema} = require('graphql');

export const schema = buildSchema(`
    
    
    type User{
        userId: ID!
        name: String
        family: String
        phone: String
        email: String
    }
    
    input UserInputData{
        name: String
        family: String
        phone: String
        email: String
        password: String!
    }
    
    type RootQuery {
        userId: ID
        name: String
        family: String
        phone: String
        email: String
    }
    
    type RootMutation{
        signup(userInput: UserInputData): User!
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);


export const resolver = {
    userId(){
        return Math.random().toString()
    },
    name(){
        return 'Reza';
    },
    family(){
        return 'Baiat'
    },
    phone(){
        return '09305211601';
    },
    email(){
        return 'Untouchable.rb@gmail.com'
    },
    signup({userInput},req){
        return{
            userId:Math.random().toString(),
            name:userInput.name,
            family:userInput.family,
            phone:userInput.phone,
            email:userInput.email,
        }
    }
}

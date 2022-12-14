import axios from "axios"

const apiURL = 'https://financial-planner-backend.onrender.com/'
// const apiURL = 'http://127.0.0.1:5000/'

class DataService{

    async postUser(user){
        console.log("Attempting to post user")

        await axios.post(apiURL + "register", user).then(res =>{
            console.log(res.data)
        })
    }

    async login(cradentials){
        console.log("Attempting to get user")
        let newdata = {}

        await axios.post(apiURL + "user/" + cradentials['user_name'], cradentials).then(res =>{
            console.log(res.data)
            newdata = res.data
        })
        // let data = response.data[0]
        return newdata
    }

    async recoverUsername(email){
        console.log("Attempting to send recovery email..")
        let data
        await axios.post(apiURL + "api/recover-username", email).then(res =>{
            console.log(res.data)
            data = res.data
        })
        return data
    }

    async recoverPassword(user){
        console.log("Attempting to recover password..")
        let data
        await axios.post(apiURL + 'api/recover-password', user).then(res =>{
            console.log(res.data)
            data = res.data
        })
        return data
    }

    async resetPassword(passwordData){
        console.log("Attempting to reset password...")
        let data
        await axios.post(apiURL + 'api/reset-password', passwordData).then(res =>{
            console.log(res.data)
            data = res.data
        })

        return data
    }

    // will need to change this in the backend to get only budgtes belonging to the logged in user
    async getBudgets(user_name){
        let data
        await axios.get(apiURL + 'api/budgets/' + user_name).then(res =>{
            console.log(res.data)
            data = res.data
        })

        return data
    }

    async deleteActiveBudget(user_name, budget){
        let data
        console.log(budget)
        await axios.post(apiURL + 'api/budget/delete/' + user_name, budget).then(res =>{
            console.log(res.data)
            data = res.data
        })

        return data
    }

    async postBudget(budget){
        console.log("Attempting to post budget...")
        let data
        await axios.post(apiURL + "api/budgets", budget).then(res =>{
            console.log(res.data)
            data = res.data
        })

        return data
    }

    async snowball(debtsArray){
        console.log("Attempting to calculate endpoints for debt snowball...")
        let data
        await axios.post(apiURL + "api/debt-snowball", debtsArray).then(res =>{
            console.log(res.data)
            data = res.data
        })

        return data
    }

    async calculateExpenseData(payload){
        console.log("Attempting to calculate expense data...")
        let data
        await axios.post(apiURL + "api/calculate-expense", payload).then(res =>{
            console.log(res.data)
            data = res.data
        })

        return data
    }

    async updateExpenseData(payload){
        console.log("Attempting to calculate expense data...")
        let data
        await axios.post(apiURL + "api/update-expense", payload).then(res =>{
            console.log(res.data)
            data = res.data
        })

        return data
    }

    async optimize(payload){
        console.log("Attempting to optimize budget...")
        let data
        await axios.post(apiURL + "api/optimize-budget", payload).then(res =>{
            console.log(res.data)
            data = res.data
        })

        return data
    }
}

export default DataService
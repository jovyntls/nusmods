
const axios = require("axios");

async function modList() {
    const res = await axios.get("https://api.nusmods.com/v2/2020-2021/modulesList.json");
    const end_pt = res.data[Math.floor(Math.random() * arr.length)];
    
    if (end_pt.semesters.length = 0) {
        return modList();
    } else {
        return end_pt.moduleCode
    }
}

let len = 2;

let arr = [];

async function path_finder(mod, counter) {

    async function check_pre(ls, counter) {
        if (ls.length < counter) {
            arr.pop();

        } else {
            const modu = ls[counter];
            const res = await axios.get(`https://api.nusmods.com/v2/2020-2021/modules/${modu}.json`);
            if (res.status_code >= 400) { 
                return check_pre(ls, counter + 1);
            } else if (res.data.semesterData.length = 0) {
                return path_finder(ls, counter + 1);
            } else if (res.data.preclusions == undefined && res.data.prerequisites == undefined) {
                return path_finder(ls, counter + 1);
            } else {
                return path_finder(res.data);
            }
        }
    }


    
    if (res.status_code >= 400) { 
        path_finder(arr[arr.length - 1], counter + 1);
    } else if (res.data.semesterData.length = 0) {
        path_finder(mod, counter + 1);
    } else if (res.data.preclusions == undefined && res.data.prerequisites == undefined) {
        path_finder(mod, counter + 1);
    } else {
        arr.push(mod);
        if (arr.length == len) {
            return mod;
        } else {
            const total = res.data.preclusion.concat(res.data.prerequisite);
            if (total[total.length - 1] == undefined) {
                total.pop();
                const new_mod = total[counter];
                return path_finder(new_mod, 0);
            } else {
                const new_mod = total[counter];
                return path_finder(new_mod, 0);
            }
        }
    }
}


const end = modList();
const start = path_finder(end, 0);

console.log(start);



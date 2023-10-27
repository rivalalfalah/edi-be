const postgreDb = require("../config/postgre")

const bcrypt = require("bcrypt");


// get
const getDataUser = (userid) => {
  return new Promise((resolve, reject) => {
    if(userid === "all") {
      const queryall = "select * from tbl_user"
      postgreDb.query(queryall, (err, res) => {
        if(err) {
          console.log(err)
          return reject({status:500, msg:"internal server error"})
        }
        return resolve({status:200, msg:"data found", data:res.rows})
      })
    }else {
      const queryid = "select * from tbl_user where id = $1"
      postgreDb.query(queryid, [userid], (err, res) => {
        if(err) {
          console.log(err)
          return reject({status:500, msg:"internal server error"})
        }
        if(!res.rows[0]){
          return reject({status:404, msg:"data not found"})
        }
        return resolve({status:200, msg:"data found", data:res.rows})
      })
    }
  })
}


// create
const setDataUser = (body) => {
  return new Promise((resolve, reject) => {
    const {namalengkap, username, password, status} = body
    const query = "insert into tbl_user (namalengkap, username, password, status) values($1,$2,$3,$4) returning namalengkap, username, status"
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if(err) {
        console.log(err)
        return reject({status:500, msg:"internal server error"})
      }
      postgreDb.query(query, [namalengkap, username, hashedPassword, status], (err, result) => {
        if(err){
          console.log(err)
          return reject({status:500, msg:"internal server error"})
        }
          return resolve({status:201, msg:"Create profile success", data:result.rows[0]})
      })
    })
    
  })
}


// delete
const delDataUser = (userid) => {
  return new Promise((resolve, reject) => {
    const query = "delete from tbl_user where id = $1"
    postgreDb.query(query, [userid], (err, res) => {
      if(err){
        console.log(err)
        return reject({status:500, msg:"internal server error"})
      }
      return resolve({status:200, msg:"delete success", data:res.rows})
    })
  })
}






const userRepo = {
  getDataUser,
  setDataUser,
  delDataUser
}

module.exports = userRepo
let ClassapiModel = require('../Module/ClassSchema')
const jwt = require('jsonwebtoken')
const StudentsapiModel = require('../Module/StudentSchema')

let creatclass = async (req, res) => {
  // console.log(req.body)
  try {
    await ClassapiModel.create(req.body)
    res.status(200).send("class created successfuly")

  } catch (error) {
    res.send({message : error})
  }
}

const getclass = async (req, res) => {

  let token = await req.headers.authorization.split(' ')

  if (token[1]) {
    let listofclass = await ClassapiModel.find()

    res.send(listofclass)
  }


}

const getoneclass = async (req, res) => {
  let token = await req.headers.authorization.split(' ')

  if (token[1]) {
    let { id } = req.body

    let oneclass = await ClassapiModel.findOne({ _id: id.id })

    res.send(oneclass)
  }

}
const leaveapply = async (req, res) => {

  try {
    let { id } = req.body
    let token = await req.headers.authorization.split(' ')

    if (token[1]) {
      const detoken = await jwt.verify(token[1], "APPLE")
      let studentName = await StudentsapiModel.findOne({ userid: detoken.userid })

      for (let i = 0; i < studentName.class.length; i++) {

        if (id == studentName.class[i].classid) {

          studentName.class[i].Leaveapplication = true
          studentName.save()

        }
        else { console.log("no") }

      }
    }

  } catch (error) {

  }

}

const tasksubmission = async (req, res) => {
  let token = await req.headers.authorization.split(' ')

  if (token[1]) {
    let { id } = req.body

    const detoken = await jwt.verify(token[1], "APPLE")
    let studentName = await StudentsapiModel.findOne({ userid: detoken.userid })
    console.log(studentName)
    for (let i = 0; i < studentName.class.length; i++) {

      if (id.id == studentName.class[i].classid) {
        console.log('yes')

        studentName.class[i].Taskcompletion = true
        studentName.save()

      }
      else { console.log("no") }
    }
  }

}

module.exports = { creatclass, getclass, getoneclass, leaveapply, tasksubmission }
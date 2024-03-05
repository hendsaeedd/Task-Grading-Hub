const Task = require('../models/task')
const Submission = require('../models/submission')
const User = require('../models/user')
const multer = require('multer')

//add multer middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/assets/uploads')
  },
  filename: (req, file, cb) => {
    // cb(null, file.originalname)
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})
//give multer the storage configuration
const upload = multer({ storage })
//upload pdf file
const uploadPdf = upload.single('file')

//view tasks
const viewTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json({ tasks })
  } catch (error) {
    console.error('Error viewing tasks:', error)
    res.status(400).json({ error: 'Failed to view tasks' })
  }
}

//get a specific task
const specificTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    res.status(200).json({ task })
  } catch (error) {
    console.error('Error viewing specific task:', error)
    res.status(400).json({ error: 'Failed to view specific task' })
  }
}

//submit a task file pdf
const submitTask = async (req, res) => {
  try {
    const { username, notes } = await req.body
    const file = req.file?.filename
    const path = `/${file}`
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const newTaskSubmission = new Submission({
      taskId: req.params.id,
      notes,
      file,
      path,
      submittedBy: user._id,
    })

    const savedSubmission = await newTaskSubmission.save()
    //only show submitted file, notes, taskid and submission id
    res.status(200).json({
      message: 'Task submitted successfully',
      submission: {
        id: savedSubmission._id,
        taskId: savedSubmission.taskId,
        notes: savedSubmission.notes,
        file: savedSubmission.file,
      },
    })
  } catch (error) {
    console.error('Error submitting task:', error)
    res.status(400).json({ error: 'Failed to submit task' })
  }
}

//check the grades after a task is graded
const checkGrades = async (req, res) => {
  try {
    const { id, userId } = req.params
    const submission = await Submission.findOne(
      { taskId: id, submittedBy: userId },
      { grade: 1, feedback: 1, gradedBy: 1, _id: 0 }
    )

    if (userId !== req.user.userId) {
      return res
        .status(403)
        .json({
          error: 'You can only access your own grades😒',
        })
    }

    res.status(200).json({ submission })
  } catch (error) {
    console.error('Error checking grades:', error)
    res.status(400).json({ error: 'Failed to check grades' })
  }
}

module.exports = {
  viewTasks,
  specificTask,
  submitTask,
  uploadPdf,
  checkGrades,
}

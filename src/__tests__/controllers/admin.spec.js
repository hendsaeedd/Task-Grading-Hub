const {
  createTask,
  updateTask,
  deleteTask,
  submittedTasks,
  userIdSubmittedTask,
  gradeSubmittedTask,
} = require('../../controllers/admin')
const Task = require('../../models/task')
const Submission = require('../../models/submission')

describe('createTask', () => {
  it('should create a new task', async () => {
    const req = {
      body: {
        title: 'task one',
        description: 'This is a task one',
        deadline: '12-4-2024',
      },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const newTask = {
      title: 'task one',
      description: 'This is a task one',
      deadline: '12-4-2024',
    }

    Task.create = jest.fn().mockResolvedValue(newTask)
    await createTask(req, res)

    expect(Task.create).toHaveBeenCalledWith({
      title: 'task one',
      description: 'This is a task one',
      deadline: '12-4-2024',
    })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Task created successfully',
      task: newTask,
    })
  })
})

describe('updateTask', () => {
  it('should update a task', async () => {
    const req = {
      params: {
        id: '1',
      },
      body: {
        title: 'task one',
        description: 'This is a task one',
        deadline: '12-4-2024',
      },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const updatedTask = {
      title: 'task one',
      description: 'This is a task one',
      deadline: '12-4-2024',
    }

    Task.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedTask)
    await updateTask(req, res)

    expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      {
        title: 'task one',
        description: 'This is a task one',
        deadline: '12-4-2024',
      },
      { new: true }
    )
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Task updated successfully',
      task: updatedTask,
    })
  })
})

describe('deleteTask', () => {
  it('should delete a task', async () => {
    const req = {
      params: {
        id: '1',
      },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    Task.findByIdAndDelete = jest.fn().mockResolvedValue()
    await deleteTask(req, res)
    expect(Task.findByIdAndDelete).toHaveBeenCalledWith('1')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Task deleted successfully',
    })
  })
})

describe('viewSubmittedTasks', () => {
  it('should view submitted tasks', async () => {
    const req = {
      params: {
        id: '1',
      },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const submissions = [
      {
        taskId: '1',
        submittedBy: '2',
        file: 'file',
        notes: 'notes',
        grade: 'grade',
      },
    ]

    Submission.find = jest.fn().mockResolvedValue(submissions)
    await submittedTasks(req, res)

    expect(Submission.find).toHaveBeenCalledWith({ taskId: '1' })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ submissions })
  })
})

describe('viewUserIdSubmittedTask', () => {
  it('should view submitted tasks with user id', async () => {
    const req = {
      params: {
        id: '1',
        userId: '2',
      },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const submissionWithId = [
      {
        taskId: '1',
        submittedBy: '2',
        file: 'file',
        notes: 'notes',
        grade: 'null',
      },
    ]

    Submission.find = jest.fn().mockResolvedValue(submissionWithId)
    await userIdSubmittedTask(req, res)

    expect(Submission.find).toHaveBeenCalledWith(
      { taskId: '1', submittedBy: '2' },
      { file: 1, taskId: 1, submittedBy: 1, notes: 1, grade: 1, _id: 0 }
    )
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ submissionWithId })
  })
})

describe('gradeSubmittedTask', () => {
  it('should grade a submitted task with user id', async () => {
    const req = {
      params: {
        id: '1',
        userId: '2',
      },
      body: {
        grade: '37',
        feedback: 'Good work',
        gradedBy: 'hanoda',
      },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const submission = {
      taskId: '1',
      submittedBy: '2',
      file: 'file',
      notes: 'notes',
      grade: 'null',
    }

    Submission.findOneAndUpdate = jest.fn().mockResolvedValue(submission)
    await gradeSubmittedTask(req, res)

    expect(Submission.findOneAndUpdate).toHaveBeenCalledWith(
      { taskId: '1', submittedBy: '2' },
      { grade: '37', feedback: 'Good work', gradedBy: 'hanoda' },
      { new: true }
    )
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Task graded successfully',
      submission,
    })
  })
})

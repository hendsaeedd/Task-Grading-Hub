const {
  viewTasks,
  specificTask,
  submitTask,
  checkGrades,
} = require('../../controllers/student')

const Task = require('../../models/task')
const Submission = require('../../models/submission')
const User = require('../../models/user')

jest.mock('../../models/user')
jest.mock('../../models/task')
jest.mock('../../models/submission')

describe('viewTasks', () => {
  it('should view all tasks', async () => {
    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    const tasks = [
      {
        title: 'task one',
        description: 'This is a task one',
        deadline: '12-4-2024',
      },
      {
        title: 'task two',
        description: 'This is a task two',
        deadline: '12-4-2024',
      },
    ]
    Task.find = jest.fn().mockResolvedValue(tasks)
    await viewTasks(req, res)
    expect(Task.find).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ tasks })
  })
})

describe('viewSpecificTask', () => {
  it('should view a specific task', async () => {
    const req = {
      params: {
        id: '1',
      },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    const task = {
      title: 'task one',
      description: 'This is a task one',
      deadline: '12-4-2024',
    }
    Task.findById = jest.fn().mockResolvedValue(task)
    await specificTask(req, res)
    expect(Task.findById).toHaveBeenCalledWith('1')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ task })
  })
})

describe('submitTask', () => {
  it('should submit a task successfully', async () => {
    const req = {
      params: { id: '123' },
      body: { username: 'testuser', notes: 'thanks miss' },
      file: { filename: 'file.pdf' },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const user = {
      _id: '1',
    }

    const newSubmission = {
      _id: '1123',
      taskId: '123',
      notes: 'thanks miss',
      file: 'file.pdf',
      path: '/file.pdf',
      submittedBy: '1',
    }

    User.findOne.mockResolvedValue(user)
    Submission.prototype.save.mockResolvedValue(newSubmission)

    await submitTask(req, res)

    expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' })
    expect(Submission.prototype.save).toHaveBeenCalledWith()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Task submitted successfully',
      submission: {
        id: '1123',
        taskId: '123',
        notes: 'thanks miss',
        file: 'file.pdf',
      },
    })
  })
})

describe('checkGrades', () => {
  it('should check grades for the specified user', async () => {
    const req = {
      params: {
        id: '1123',
        userId: '1',
      },
      user: {
        userId: '1',
      },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const submission = {
      grade: 85,
      feedback: 'Good work',
      gradedBy: 'henddd',
    }

    Submission.findOne.mockResolvedValue(submission)

    await checkGrades(req, res)

    expect(Submission.findOne).toHaveBeenCalledWith(
      { taskId: '1123', submittedBy: '1' },
      { grade: 1, feedback: 1, gradedBy: 1, _id: 0 }
    )
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ submission })
  })
})

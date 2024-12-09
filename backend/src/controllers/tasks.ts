import { RequestHandler } from "express";
import TaskModel from "../models/task";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getTasks: RequestHandler = async (req, res, next) => {
    try {
        const tasks = await TaskModel.find().exec();
        console.log(tasks)
        res.status(200).json(tasks)
    } catch (error) {
        next(error)
    }
}

export const getTask: RequestHandler = async (req, res, next) => {
    const taskId = req.params.taskId
    try {
        if (!mongoose.isValidObjectId(taskId)) {
            throw createHttpError(400, "invalid task id")
        }

        const task = await TaskModel.findById(taskId).exec();
        if (!task) {
            throw createHttpError(404, "task not found")
        }
        res.status(200).json(task)
    } catch (error) {
        next(error)
    }
}


interface createTaskBody {
    title?: string,
    text?: string
}
export const createTask: RequestHandler<unknown, unknown, createTaskBody, unknown> = async (req, res, next) => {
    const title = req.body.title
    const text = req.body.text
    try {
        if (!title) {
            throw createHttpError(400, "task must have a title")
        }

        const newTask = await TaskModel.create({
            title: title,
            text: text
        })

        res.status(201).json(newTask)
    } catch (error) {
        next(error)
    }
}

interface udpateNoteBody {
    title?: string,
    text?: string,
}
export const updateTask: RequestHandler<{ taskId: string }, unknown, udpateNoteBody, unknown> = async (req, res, next) => {
    const taskId = req.params.taskId;
    const newTitle = req.body.title
    const newText = req.body.text;

    try {
        if (!mongoose.isValidObjectId(taskId)) {
            throw createHttpError(400, "invalid task id")
        }

        if (!newTitle) {
            throw createHttpError(400, "task must have a title")
        }

        const task = await TaskModel.findById(taskId).exec()

        if (!task) {
            throw createHttpError(404, "task not found")
        }

        task.title = newTitle
        task.text = newText

        const updatedTask = await task.save()

        res.status(200).json(updatedTask)
    } catch (error) {
        next(error)
    }

}

export const deleteTask: RequestHandler = async (req, res, next) => {
    const taskId = req.params.taskId;

    try {
        if (!mongoose.isValidObjectId(taskId)) {
            throw createHttpError(400, "invalid task id")
        }

        const task = await TaskModel.findById(taskId).exec()

        if (!task) {
            throw createHttpError(404, "task not found")
        }

        await task.deleteOne()
        res.sendStatus(204)

    } catch (error) {
        next(error)
    }

}
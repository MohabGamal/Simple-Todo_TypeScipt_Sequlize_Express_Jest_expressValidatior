import { Request as Req, Response as Res } from 'express';
import { TodoInstance } from '../model/index';
import { v4 as uuidv4 } from 'uuid';

class TodoController {
  async create(req: Req, res: Res) {
    const id = uuidv4();
    try {
      const record = await TodoInstance.create({ id, ...req.body });
      res.status(201).json({ record, msg: 'Record created successfully' });
    } catch (error) {
      res.status(500).json({ error, msg: 'Error creating record' });
    }
  }

  async read(req: Req, res: Res) {
    try {
      const limit = req.query?.limit as number | undefined;
      const offset = req.query?.offset as number | undefined;
      const records = await TodoInstance.findAll({ where: {}, limit, offset });
      res.status(200).json({ records, msg: 'Records fetched successfully' });
    } catch (error) {
      res.status(500).json({ error, msg: 'Error fetching records' });
    }
  }

  async readById(req: Req, res: Res) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });
      res.status(200).json({ record, msg: 'Record fetched successfully' });
    } catch (error) {
      res.status(500).json({ error, msg: 'Error fetching record' });
    }
  }

  async update(req: Req, res: Res) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });

      if (!record) {
        return res.status(404).json({ msg: 'Record not found' });
      }

      const updatedRecord = await record.update({
        completed: !record.getDataValue('completed'),
      });
      res.status(200).json({
        record: updatedRecord,
        msg: 'Record updated successfully',
      });
    } catch (error) {
      res.status(500).json({ error, msg: 'Error updating record' });
    }
  }

  async delete(req: Req, res: Res) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });
      if (!record) {
        return res.status(404).json({ msg: 'Record not found' });
      }
      await record.destroy();
      res.status(200).json({ msg: 'Record deleted successfully' });
    } catch (error) {
      res.status(500).json({ error, msg: 'Error deleting record' });
    }
  }
}


export default new TodoController();
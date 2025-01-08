import { body, query, param } from 'express-validator';

class TodoValidator {
  checkCreateTodo() {
    return [
      body('id').optional().isUUID(4).withMessage('Id must be a uuid v4'),
      body('title').notEmpty().withMessage('Title is required'),
      body('completed')
        .optional()
        .isIn([0, false])
        .withMessage('completed must inistatiated with false'),
    ];
  }

  checkReadTodo() {
    return [
      query('limit')
        .notEmpty()
        .withMessage('Limit is required')
        .isInt({ min: 1, max: 10 })
        .withMessage('Limit must be an Int and between 1 to 10'),
      query('offset')
        .optional()
        .isInt()
        .withMessage('Offset must be an Int'),
    ];
  }

  checkIdParam() {
    return [
      param('id')
        .notEmpty()
        .withMessage('Id is required')
        .isUUID(4)
        .withMessage('Id must be a uuid v4'),
    ];
  }
}

export default new TodoValidator();

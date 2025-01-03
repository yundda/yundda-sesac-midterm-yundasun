const { Todo } = require("../models/index");

/* Todos 전체 목록 불러오기 */
exports.readAll = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.send(todos);
  } catch (err) {
    res.status(500).send("server err!");
  }
};

/* Todo 한 개 불러오기 */
exports.readOne = async (req, res) => {
  try {
    console.log(req.params);
    const id = req.params.id;
    const todo = await Todo.findOne({
      where: { id },
    });
    if (todo) {
      res.send(todo);
    } else {
      res.send({ message: "Todo not found" });
    }
  } catch (err) {
    res.status(500).send("server err!");
  }
};

/* 새로운 Todo 생성 */
exports.create = async (req, res) => {
  try {
    const { title, done } = req.body;
    console.log(Boolean(title));

    if (title) {
      const createTodo = await Todo.create({
        title: title,
        done: done,
      });
      console.log("추가 완료");
      res.send(createTodo);
    } else {
      res.send({ message: "Internal Server Error" });
    }
  } catch (err) {
    res.status(500).send("server err!");
  }
};

/* 기존 Todo 수정 */
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, done } = req.body;
    console.log(id, done);
    const updateTodo = await Todo.update(
      {
        title: title,
        done: done,
      },
      {
        where: { id },
      }
    );
    console.log("updateTodo", updateTodo);
    if ([updateTodo] > 0) {
      res.send("수정 성공");
    } else {
      res.send({ message: "Todo not found" });
    }
  } catch (err) {
    res.status(500).send("server err!");
  }
};

/* 기존 Todo 삭제 */
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTodo = await Todo.destroy({
      where: { id },
    });
    if (deleteTodo > 0) {
      res.send({ message: "Todo deleted successfully", deletedId: deleteTodo });
    } else {
      res.send({ message: "Todo not found" });
    }
  } catch (err) {
    res.status(500).send("server err!");
  }
};

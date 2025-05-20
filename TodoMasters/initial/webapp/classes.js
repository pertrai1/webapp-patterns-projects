import { observerMixin } from "./mixins.js";

export class TodoItem {
  constructor(text) {
    this.text = text;
  }
  equals(other) {
    return this.text === other.text;
  }
}

export class TodoList {
  #data = new Set();
  get items() {
    return this.#data;
  }

  static instance = null;
  static {
    this.instance = Object.freeze(new TodoList());
  }
  static getInstance() {
    return this.instance;
  }

  add(item) {
    const todoExists =
      Array.from(this.#data).filter((todo) => todo.equals(item)).length > 0;
    if (!todoExists) {
      this.#data.add(item);
    }
  }
  delete(text) {
    const todoDelete = Array.from(this.#data).filter(
      (todo) => todo.text === text
    )[0];
    this.#data.delete(todoDelete);
  }
  find(text) {
    return Array.from(this.#data).find((todo) => todo.text === text);
  }
  replaceList(list) {
    this.#data = list;
    this.notify();
  }

  constructor() {
    if (TodoList.instance) {
      throw new Error("Use TodoList.getInstance() to access the list");
    }
  }
}

Object.assign(TodoList.prototype, observerMixin);

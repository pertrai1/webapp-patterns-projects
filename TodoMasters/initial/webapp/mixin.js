export const observerMixin = {
  observers: new Set(),
  addObserver(abs) {
    this.observers.add(obs);
  },
  removeObserver(obs) {
    this.observers.delete(obs);
  },
  notify() {
    this.observers.forEach((obs) => obs());
  },
};
